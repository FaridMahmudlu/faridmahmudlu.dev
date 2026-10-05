export const VERT = /* glsl */ `#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;

uniform sampler2D uData;
uniform int uWidth;
uniform int uRows;
uniform int uFrom;
uniform int uTo;
uniform float uMix;
uniform float uTime;
uniform float uFlow;
uniform float uDrift;
uniform mat4 uProj;
uniform mat4 uView;
uniform mat4 uModelA;
uniform mat4 uModelB;
uniform float uBrightA;
uniform float uBrightB;
uniform vec3 uPointer;
uniform float uAspect;
uniform float uSize;
uniform float uFocus;

in vec4 aRand;

out vec3 vColor;
out float vAlpha;
out float vBlur;

const vec3 INK = vec3(0.925, 0.914, 0.886);
const vec3 SIGNAL = vec3(1.0, 0.353, 0.122);

vec4 fetchFormation(int f) {
  int id = gl_VertexID;
  return texelFetch(uData, ivec2(id % uWidth, id / uWidth + f * uRows), 0);
}

vec3 flow(vec3 p, float t) {
  return vec3(
    sin(p.y * 1.7 + t * 0.61 + p.z * 1.3),
    sin(p.z * 1.9 - t * 0.53 + p.x * 1.1),
    sin(p.x * 1.5 + t * 0.71 - p.y * 1.2)
  );
}

void main() {
  vec4 a = fetchFormation(uFrom);
  vec4 b = fetchFormation(uTo);

  // Staggered, per-particle progress: particles leave and arrive at different times.
  float delay = aRand.x * 0.45;
  float m = smoothstep(delay, delay + 0.55, uMix);

  vec3 pa = (uModelA * vec4(a.xyz, 1.0)).xyz;
  vec3 pb = (uModelB * vec4(b.xyz, 1.0)).xyz;
  vec3 p = mix(pa, pb, m);

  // Mid-flight turbulence, then a gentle idle breathing.
  float transit = sin(m * 3.14159265);
  p += flow(p * 0.65 + aRand.yzw * 2.0, uTime * 0.6) * transit * 0.55 * uFlow;
  p += uDrift * 0.022 * vec3(
    sin(uTime * 0.7 + aRand.y * 6.2831),
    cos(uTime * 0.6 + aRand.z * 6.2831),
    sin(uTime * 0.5 + aRand.w * 6.2831)
  );

  vec4 mv = uView * vec4(p, 1.0);
  vec4 clip = uProj * mv;

  // Pointer: particles near the cursor are pushed away in screen space.
  vec2 ndc = clip.xy / clip.w;
  vec2 d = ndc - uPointer.xy;
  d.x *= uAspect;
  float dist = length(d);
  float push = uPointer.z * smoothstep(0.2, 0.0, dist);
  vec2 dir = dist > 1e-4 ? d / dist : vec2(0.0);
  mv.xy += vec2(dir.x / uAspect, dir.y) * push * push * 0.06 * -mv.z;
  clip = uProj * mv;
  gl_Position = clip;

  float depth = -mv.z;
  float emphasis = clamp(mix(a.w, b.w, m) + step(0.968, aRand.z), 0.0, 1.0);
  vBlur = clamp(abs(depth - uFocus) * 0.24, 0.0, 1.0);

  float size = uSize * (0.5 + aRand.y * 0.85) * (1.0 + emphasis * 0.45);
  gl_PointSize = max(1.0, size * (uFocus / depth) * (1.0 + vBlur * 1.2));

  float bright = mix(uBrightA, uBrightB, m);
  vColor = mix(INK, SIGNAL, emphasis);
  vAlpha = (0.26 + 0.44 * aRand.w) * (1.0 - vBlur * 0.6) * bright * (1.0 + push * 1.4);
}
`;

export const FRAG = /* glsl */ `#version 300 es
precision mediump float;

in vec3 vColor;
in float vAlpha;
in float vBlur;

out vec4 outColor;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  float edge = mix(0.16, 0.48, vBlur);
  float a = smoothstep(0.5, 0.5 - edge, r) * vAlpha;
  if (a < 0.004) discard;
  outColor = vec4(vColor * a, a);
}
`;
