precision mediump float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;


#define cellSize 50.

float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 perm(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}
float noise(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

vec2 pointCase(vec2 uv) {
    vec2 p;
    p.x = uv.x + ((cos(time + (noise(vec3(uv.x * 100., uv.y * 100., 0.))) * 100.) + 1.) / 2.) / (resolution.x / cellSize);
    p.y = uv.y + ((cos(time + (noise(vec3(uv.x * 100., uv.y * 100., 1.))) * 100.) + 1.) / 2.) / (resolution.y / cellSize);
    return p;
}

vec3 rgb(int x,int y,int z){
    return vec3(float(x)/255.,float(y)/255.,float(z)/255.);
}


void main() {
    vec2 uv = vTexCoord; //uv entre 0 et 1 pour x et y
    float ratio = resolution.x/resolution.y;
    uv.y /= ratio;
    float X = floor(uv.x * (resolution.x / cellSize)) / (resolution.x / cellSize);
    float Y = floor(uv.y * (resolution.y / cellSize)) / (resolution.y / cellSize);

    float neighborX = 1. / (resolution.x / cellSize);
    float neighborY = 1. / (resolution.y / cellSize);
    float near = length(pointCase(vec2(X, Y)) - uv);
    near = length(pointCase(vec2(X - neighborX, Y)) - uv) < near ? length(pointCase(vec2(X - neighborX, Y)) - uv) : near;
    near = length(pointCase(vec2(X + neighborX, Y)) - uv) < near ? length(pointCase(vec2(X + neighborX, Y)) - uv) : near;
    near = length(pointCase(vec2(X, Y - neighborY)) - uv) < near ? length(pointCase(vec2(X, Y - neighborY)) - uv) : near;
    near = length(pointCase(vec2(X, Y + neighborY)) - uv) < near ? length(pointCase(vec2(X, Y + neighborY)) - uv) : near;
    near = length(pointCase(vec2(X - neighborX, Y - neighborY)) - uv) < near ? length(pointCase(vec2(X - neighborX, Y - neighborY)) - uv) : near;
    near = length(pointCase(vec2(X + neighborX, Y + neighborY)) - uv) < near ? length(pointCase(vec2(X + neighborX, Y + neighborY)) - uv) : near;
    near = length(pointCase(vec2(X - neighborX, Y + neighborY)) - uv) < near ? length(pointCase(vec2(X - neighborX, Y + neighborY)) - uv) : near;
    near = length(pointCase(vec2(X + neighborX, Y - neighborY)) - uv) < near ? length(pointCase(vec2(X + neighborX, Y - neighborY)) - uv) : near;


    float color = near * 10.;

    gl_FragColor = vec4(mix(rgb(117,221,221), rgb(80,137,145), near*25.), 1.0);
}