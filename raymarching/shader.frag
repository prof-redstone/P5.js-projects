precision highp float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

#define MINDIST 0.001
#define STEPS 300
#define PI 3.14159265


bool fcomp(float a, float b) {
    const float marge = 0.01;
    return (b - marge < a && a < b + marge) ? true : false;
}

vec3 indToCol(float i) {
    if (fcomp(i, 0.0)) return vec3(0.0, 0.0, 0.0);
    if (fcomp(i, 1.0)) return vec3(1.0, 0.0, 0.0);
    if (fcomp(i, 2.0)) return vec3(0.0, 1.0, 0.0);
    if (fcomp(i, 3.0)) return vec3(0.0, 0.0, 1.0);
    if (fcomp(i, 4.0)) return vec3(cos(time)*cos(time), cos(time + PI/3.)*cos(time + PI/3.), cos(time + PI*2./3.)*cos(time + PI*2./3.));
}
vec4 dPlaneI(vec3 p, vec3 pos, vec3 nor, float h, float i) {
    float d = dot(p-pos,nor) - h;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dPlane(vec3 p, float h, float i) {
    float d = p.y - h;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dTorus(vec3 p, vec3 pos, float r, float t, float i) {
    float d = length(vec2(length(p.xz - pos.xz) - r, p.y - pos.y)) - t;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dSphere(vec3 p, vec3 pos, float r, float i) {
    float d = length(p - pos) - r;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dCylinder(vec3 p, vec3 pos, float r, float h, float i){
    float dX = length(p.xz - pos.xz) - r;
    float dY = abs(p.y - pos.y) - h;
    float dE = length(vec2(max(dX,0.0), max(dY,0.0)));
    float dI = min(max(dX, dY), 0.0);
    float d = dE + dI;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dBox(vec3 p, vec3 pos, vec3 s, float i){
    vec3 diff = abs(p - pos) - s;
    float dE = length(max(diff, 0.0));
    float dI = min(max(diff.x, max(diff.y, diff.z)), 0.0);
    float d = dE + dI;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 min4(vec4 a, vec4 b) {
    return (a.x < b.x) ? a : b;
}

vec4 scene(vec3 p) {
    vec4 dp = dPlane(p, -0.5, 2.0);
    vec4 ds1 = dSphere(p, vec3(0.0, -0.9, 0.0), 1.0, 1.0);
    vec4 ds2 = dBox(p, vec3(1.0, 1.5, 0.0), vec3(0.1,0.1,0.1),  4.0);
    return min4(dp, min4(ds1, ds2));
}

vec3 normal(vec3 p) {
    float dp = scene(p).x;
    float eps = 0.01;

    float dX = scene(p + vec3(eps, 0.0, 0.0)).x - dp;
    float dY = scene(p + vec3(0.0, eps, 0.0)).x - dp;
    float dZ = scene(p + vec3(0.0, 0.0, eps)).x - dp;
    return normalize(vec3(dX, dY, dZ));
}

vec3 colorBG(vec3 rD) {
    return vec3(0.0, 0.0157, 0.1294) + vec3(1.0) * (1.-rD.y) * 0.01; //couleur du fond si ne touche rien
}

vec4 march(vec3 rO, vec3 rD, float maxDist) {
    //distance du BG
    //distance min pour toucher
    //rO origine du rayon, rD direction du rayon
    vec3 cp = rO; //current position
    float d = 0.0; //dist total parcouru
    vec4 s; //distance et couleur de la scene
    vec3 col; //couleur du rayon (couleur de la scene la plus proche au dernier pas)

    for (int i = 0; i < STEPS; i++) {
        cp = rO + rD * d; //met a jour cp
        s = scene(cp);
        d += s.x;
        col = s.yzw;
        if (d < MINDIST) break; //touche
        if (d > maxDist) return vec4(d, colorBG(rD)); //trop loin
    }
    return vec4(d, col);
}

float lighting(vec3 p, vec3 n) {
    //p le point, n la normal de la surface en ce point
    float gamma = 0.8;

    vec4 l1 = vec4(1.0, 1.0 +cos(time), 2.0, 5.0); //pos + puissance
    vec4 l2 = vec4(0.0, 100.0, 0.0, 1.0);

    float res1 = max(0.0, dot(n, normalize(l1.xyz - p))) * l1.w; //impacte de la lumiere * sa puissance
    res1 *= march(p + n*MINDIST*5., normalize(l1.xyz - p), length(l1.xyz - p)).x < length(l1.xyz - p) ? 0. : 1.; //calcule de l'ombre, true si dans l'ombre
    
    float res2 = max(0.0, dot(n, normalize(l2.xyz - p))) * l2.w;
    res2 *= march(p + n*MINDIST*5., normalize(l2.xyz - p), length(l2.xyz - p)).x < length(l2.xyz - p) ? 0. : 1.; 

    return (res1 + res2) / (l1.w + l2.w)*gamma; //normaliser le niveau de lumiere
}

vec3 color(vec3 rO, vec3 rD) {
    const float BGdist = 50.;
    const float minDist = 0.001;
    vec4 m = march(rO, rD, BGdist);
    vec3 col = m.yzw;
    vec3 cp = rO + rD * m.x;
    vec3 nor = normal(cp);
    if (m.x < BGdist) {
        col *= lighting(cp, nor) + vec3(1.0, 0.9412, 0.4078)*0.1;
    }
    col = pow(col, vec3(0.4545)); //correction pour la vision de l'oeil
    return col;
}

void main() {
    vec2 uv = vTexCoord * 2. - 1.;

    //vec3 rO = vec3(0.0, mouse.y, 0.0);
    //vec3 rD = normalize((vec3(uv.x, uv.y, 0.5) - rO));

    vec3 eye = vec3(cos(mouse.x*2.*PI)*4.,0.5 + mouse.y*2., sin(mouse.x*2.*PI)*4.);
    vec3 target = vec3(0.0,0.0,0.0);
    vec3 fwd = normalize(target - eye) ;//forward
    vec3 side = normalize(cross(vec3(0.0,1.0,0.0), fwd));
    vec3 up = cross(fwd, side);//deja normalise
    float zoom = 1.;

    vec3 rD = normalize(fwd*zoom + side*uv.x + up*uv.y);

    vec3 col = color(eye, rD);

    gl_FragColor = vec4(col, 1.0);
}