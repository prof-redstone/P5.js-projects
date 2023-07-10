precision mediump float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D texture;

void main() {
    vec2 uv = vTexCoord;//uv entre 0 et 1 pour x et y
    //vec4 color = vec4(uv.x, mouse.x * mouse.y, sin(time), 1.0);
    vec4 color = texture2D(texture, vec2(uv.x, 1.-uv.y));
    gl_FragColor = vec4(color);
}