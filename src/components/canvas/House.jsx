'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function setGroupOpacity(group, opacity) {
  if (!group) return
  group.traverse((child) => {
    if (child.material) {
      child.material.opacity = opacity
      child.material.transparent = true
      child.visible = opacity > 0.001
    }
  })
}

const WIRE_COLOR = '#6ea3d4'

function makeWireFromGeometry(geometry, position, rotation = [0, 0, 0]) {
  const edges = new THREE.EdgesGeometry(geometry)
  const mat = new THREE.LineBasicMaterial({ color: WIRE_COLOR, transparent: true, opacity: 1.0 })
  return (
    <lineSegments geometry={edges} material={mat} position={position} rotation={rotation} />
  )
}

function WireframeVilla() {
  const groundGeo = useMemo(() => new THREE.BoxGeometry(8, 0.04, 8), [])
  const mainGeo = useMemo(() => new THREE.BoxGeometry(2.6, 1.0, 1.8), [])
  const upperGeo = useMemo(() => new THREE.BoxGeometry(1.8, 0.9, 1.4), [])
  const terraceGeo = useMemo(() => new THREE.BoxGeometry(0.8, 0.04, 1.4), [])
  const poolGeo = useMemo(() => new THREE.BoxGeometry(2.2, 0.06, 1.0), [])
  const treeBaseGeo = useMemo(() => new THREE.CylinderGeometry(0.06, 0.08, 0.5, 6), [])
  const treeTopGeo = useMemo(() => new THREE.SphereGeometry(0.32, 8, 8), [])

  return (
    <group>
      {makeWireFromGeometry(groundGeo, [0, -0.52, 0])}
      {makeWireFromGeometry(mainGeo, [0, 0, 0])}
      {makeWireFromGeometry(upperGeo, [-0.35, 0.95, -0.1])}
      {makeWireFromGeometry(terraceGeo, [0.95, 0.52, -0.1])}
      {makeWireFromGeometry(poolGeo, [0, -0.49, 1.6])}
      {/* trees */}
      {makeWireFromGeometry(treeBaseGeo, [-3.0, -0.25, 1.5])}
      {makeWireFromGeometry(treeTopGeo, [-3.0, 0.18, 1.5])}
      {makeWireFromGeometry(treeBaseGeo, [2.8, -0.25, -1.8])}
      {makeWireFromGeometry(treeTopGeo, [2.8, 0.18, -1.8])}
      {makeWireFromGeometry(treeBaseGeo, [-2.6, -0.25, -2.0])}
      {makeWireFromGeometry(treeTopGeo, [-2.6, 0.18, -2.0])}
    </group>
  )
}

function SolidVilla() {
  const wallMat = (
    <meshStandardMaterial color='#dbd6cf' roughness={0.75} metalness={0.05} transparent opacity={1.0} />
  )
  const groundMat = (
    <meshStandardMaterial color='#3d3a36' roughness={0.95} metalness={0} transparent opacity={1.0} />
  )
  const accentMat = (
    <meshStandardMaterial color='#7c7066' roughness={0.7} metalness={0.1} transparent opacity={1.0} />
  )
  const woodMat = (
    <meshStandardMaterial color='#7a5a3a' roughness={0.9} metalness={0} transparent opacity={1.0} />
  )

  return (
    <group>
      {/* ground */}
      <mesh position={[0, -0.52, 0]} receiveShadow>
        <boxGeometry args={[8, 0.04, 8]} />
        {groundMat}
      </mesh>
      {/* main block */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.6, 1.0, 1.8]} />
        {wallMat}
      </mesh>
      {/* upper story (cantilever) */}
      <mesh position={[-0.35, 0.95, -0.1]} castShadow>
        <boxGeometry args={[1.8, 0.9, 1.4]} />
        {accentMat}
      </mesh>
      {/* roof terrace deck */}
      <mesh position={[0.95, 0.52, -0.1]}>
        <boxGeometry args={[0.8, 0.04, 1.4]} />
        {woodMat}
      </mesh>
      {/* pool (empty box) */}
      <mesh position={[0, -0.49, 1.6]}>
        <boxGeometry args={[2.2, 0.06, 1.0]} />
        <meshStandardMaterial color='#2a2a2a' roughness={0.6} transparent opacity={1.0} />
      </mesh>
      {/* trees */}
      <Tree position={[-3.0, -0.25, 1.5]} barkOnly />
      <Tree position={[2.8, -0.25, -1.8]} barkOnly />
      <Tree position={[-2.6, -0.25, -2.0]} barkOnly />
    </group>
  )
}

function Tree({ position, barkOnly = false }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 8]} />
        <meshStandardMaterial color='#3a2818' roughness={0.95} transparent opacity={1.0} />
      </mesh>
      <mesh position={[0, 0.43, 0]} castShadow>
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshStandardMaterial color={barkOnly ? '#2a4a2a' : '#3d7d3d'} roughness={0.85} transparent opacity={1.0} />
      </mesh>
    </group>
  )
}

function TexturedVilla() {
  return (
    <group>
      {/* ground — concrete with subtle warmth */}
      <mesh position={[0, -0.52, 0]} receiveShadow>
        <boxGeometry args={[8, 0.04, 8]} />
        <meshStandardMaterial color='#4a4540' roughness={0.95} metalness={0.0} transparent opacity={1.0} />
      </mesh>

      {/* main white block */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.6, 1.0, 1.8]} />
        <meshStandardMaterial color='#efe9e2' roughness={0.6} metalness={0.05} transparent opacity={1.0} />
      </mesh>

      {/* upper story, dark accent */}
      <mesh position={[-0.35, 0.95, -0.1]} castShadow>
        <boxGeometry args={[1.8, 0.9, 1.4]} />
        <meshStandardMaterial color='#2d2924' roughness={0.5} metalness={0.15} transparent opacity={1.0} />
      </mesh>

      {/* wood deck terrace */}
      <mesh position={[0.95, 0.52, -0.1]}>
        <boxGeometry args={[0.8, 0.04, 1.4]} />
        <meshStandardMaterial color='#a87a4a' roughness={0.85} metalness={0.0} transparent opacity={1.0} />
      </mesh>

      {/* pool water */}
      <mesh position={[0, -0.485, 1.6]}>
        <boxGeometry args={[2.15, 0.04, 0.95]} />
        <meshStandardMaterial color='#3da3c8' roughness={0.15} metalness={0.4} transparent opacity={0.92} />
      </mesh>

      {/* big front-facing glass wall (ground floor) — emissive warm light */}
      <mesh position={[0, 0.05, 0.91]}>
        <planeGeometry args={[2.0, 0.7]} />
        <meshStandardMaterial
          color='#1a1208'
          emissive='#ffae5c'
          emissiveIntensity={1.8}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* upper-story window band */}
      <mesh position={[-0.35, 0.95, 0.61]}>
        <planeGeometry args={[1.6, 0.55]} />
        <meshStandardMaterial
          color='#0e0a05'
          emissive='#ff8a3a'
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* side-facing window (entry side) */}
      <mesh position={[1.301, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial
          color='#1a1208'
          emissive='#ffae5c'
          emissiveIntensity={1.6}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* door */}
      <mesh position={[1.0, -0.27, 0.901]}>
        <planeGeometry args={[0.42, 0.74]} />
        <meshStandardMaterial color='#1a1410' roughness={0.4} metalness={0.4} transparent opacity={1.0} />
      </mesh>

      {/* trees with foliage */}
      <Tree position={[-3.0, -0.25, 1.5]} />
      <Tree position={[2.8, -0.25, -1.8]} />
      <Tree position={[-2.6, -0.25, -2.0]} />

      {/* small lamp posts near entry */}
      <mesh position={[1.6, -0.2, 1.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
        <meshStandardMaterial color='#2a2a2a' roughness={0.4} metalness={0.7} transparent opacity={1.0} />
      </mesh>
      <mesh position={[1.6, 0.04, 1.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color='#1a1208'
          emissive='#ffae5c'
          emissiveIntensity={2.5}
          transparent
          opacity={1.0}
        />
      </mesh>
    </group>
  )
}

export function House({ simplified = false }) {
  const rootRef = useRef()
  const wireRef = useRef()
  const solidRef = useRef()
  const texturedRef = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    if (!rootRef.current) return

    rootRef.current.rotation.y += delta * 0.12

    const s = simplified ? 1.0 : (scroll?.offset ?? 1.0)

    const wireOp = simplified ? 0.0 : 1.0 - smoothstep(0.28, 0.40, s)
    const solidOp = simplified ? 0.0 : smoothstep(0.30, 0.42, s) * (1.0 - smoothstep(0.60, 0.72, s))
    const texturedOp = simplified ? 1.0 : smoothstep(0.62, 0.74, s)

    setGroupOpacity(wireRef.current, wireOp)
    setGroupOpacity(solidRef.current, solidOp)
    setGroupOpacity(texturedRef.current, texturedOp)
  })

  return (
    <group ref={rootRef} position={[0, -0.3, 0]}>
      <group ref={wireRef}>
        <WireframeVilla />
      </group>
      <group ref={solidRef}>
        <SolidVilla />
      </group>
      <group ref={texturedRef}>
        <TexturedVilla />
      </group>
    </group>
  )
}
