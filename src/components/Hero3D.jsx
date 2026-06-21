import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

function Blob() {
  const mesh = useRef()
  const mat = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.12
      mesh.current.rotation.z = t * 0.05
      // gentle drift toward pointer
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, state.pointer.x * 0.35, 0.04)
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, state.pointer.y * 0.35, 0.04)
    }
    if (mat.current) {
      // breathe the distortion
      mat.current.distort = 0.38 + Math.sin(t * 0.7) * 0.08
    }
  })
  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.9}>
      <Sphere ref={mesh} args={[1.55, 192, 192]}>
        <MeshDistortMaterial
          ref={mat}
          color="#101015"
          distort={0.4}
          speed={1.6}
          roughness={0.04}
          metalness={0.7}
          envMapIntensity={2.2}
        />
      </Sphere>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      {/* electric Mercury-Flow lights paint the organic gradient */}
      <pointLight position={[3, 2, 2.5]} intensity={120} color="#3ddc97" />
      <pointLight position={[-3, -1.5, 2.5]} intensity={120} color="#ffb02e" />
      <pointLight position={[0, 3, 1]} intensity={110} color="#ff3d6e" />
      <pointLight position={[-2.5, 2, 3]} intensity={90} color="#8b5cff" />
      <pointLight position={[2.5, -3, 1.5]} intensity={80} color="#ff3d6e" />
      <pointLight position={[0, -2, 3]} intensity={60} color="#3ddc97" />
      <Blob />
      <Environment preset="night" />
      <EffectComposer>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.25} luminanceSmoothing={0.5} radius={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
