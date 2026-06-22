import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

/* classic Ashima 3D simplex noise */
const NOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const VERT = `
uniform float uTime; uniform float uDistort;
varying vec3 vView; varying vec3 vNormal; varying float vN;
${NOISE}
void main(){
  float n = snoise(position*1.15 + uTime*0.28);
  float n2 = snoise(position*2.6 - uTime*0.20);
  float disp = (n*0.65 + n2*0.35) * uDistort;
  vec3 pos = position + normal * disp;
  vN = disp;
  vec4 mv = modelViewMatrix * vec4(pos,1.0);
  vView = mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`

const FRAG = `
precision highp float;
uniform vec3 uA,uB,uC,uD; uniform float uTime;
varying vec3 vView; varying vec3 vNormal; varying float vN;
void main(){
  float t = clamp(vN*1.6 + 0.5 + sin(uTime*0.4)*0.05, 0.0, 1.0);
  vec3 col = mix(uA, uB, smoothstep(0.0,0.40,t));
  col = mix(col, uC, smoothstep(0.35,0.72,t));
  col = mix(col, uD, smoothstep(0.66,1.0,t));
  vec3 viewDir = normalize(-vView);
  float fres = pow(1.0 - max(dot(viewDir, normalize(vNormal)),0.0), 2.2);
  col += fres * 0.9;                 // glowing rim
  col *= 0.85 + 0.4*max(dot(normalize(vNormal), vec3(0.4,0.6,0.7)),0.0);
  gl_FragColor = vec4(col, 1.0);
}`

function Blob() {
  const mesh = useRef()
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uDistort: { value: 0.55 },
    uA: { value: new THREE.Color('#3ddc97') },
    uB: { value: new THREE.Color('#ffb02e') },
    uC: { value: new THREE.Color('#ff3d6e') },
    uD: { value: new THREE.Color('#8b5cff') },
  }), [])
  useFrame((state, delta) => {
    uniforms.uTime.value += delta
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.1
      mesh.current.rotation.x += delta * 0.04
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, state.pointer.x * 0.3, 0.04)
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, state.pointer.y * 0.3, 0.04)
    }
  })
  return (
    <mesh ref={mesh} scale={1.0}>
      <icosahedronGeometry args={[1.5, 80]} />
      <shaderMaterial vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms} />
    </mesh>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Blob />
      <Sparkles count={70} scale={[11, 7, 6]} size={2} speed={0.3} opacity={0.55} color="#ffffff" />
      <Sparkles count={45} scale={[9, 6, 5]} size={3.2} speed={0.22} opacity={0.4} color="#ff7ab0" />
      <Sparkles count={35} scale={[10, 6.5, 5]} size={2.6} speed={0.26} opacity={0.4} color="#7fe9c0" />
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.6} radius={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
