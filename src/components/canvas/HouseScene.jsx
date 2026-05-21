'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ScrollControls,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { House } from './House'

// Pulsing point light during Phase 3 (textured)
function PulsingLight({ scrollOffset }) {
  const lightRef = useRef()
  useFrame(({ clock }) => {
    if (!lightRef.current) return
    const t = clock.getElapsedTime()
    // intensity varies 0.5–2.0 when phase 3 is active
    const phase3 = Math.max(0, Math.min(1, (scrollOffset.current - 0.62) / 0.12))
    lightRef.current.intensity = 0.5 + phase3 * (1.5 + Math.sin(t * 1.5) * 0.3)
  })
  return <pointLight ref={lightRef} position={[-3, 3, 2]} color='#ff8844' intensity={0} />
}

function SceneInner({ simplified }) {
  const scrollOffsetRef = useRef(0)

  // keep a ref to scroll offset so PulsingLight can read it
  // We capture scroll inside House already; here we just use a fixed ref
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 2.6, 7]} fov={38} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.4}
        color='#fff3e0'
        castShadow={false}
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.35} color='#7aa4d8' />
      <PulsingLight scrollOffset={scrollOffsetRef} />
      <Suspense fallback={null}>
        <Environment preset='sunset' background={false} />
        <House simplified={simplified} />
      </Suspense>
      {!simplified && (
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          enablePan={false}
          enableRotate={false}
        />
      )}
    </>
  )
}

export function HouseScene({ simplified = false, pages = 3, style }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      style={style}
      dpr={[1, simplified ? 1.5 : 2]}
    >
      <ScrollControls pages={simplified ? 1 : pages} damping={0.25}>
        <SceneInner simplified={simplified} />
      </ScrollControls>
    </Canvas>
  )
}
