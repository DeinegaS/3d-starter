'use client'

import { useRef } from 'react'
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

// Wireframe geometry from edges — one LineSegments for the whole house
function WireframeHouse() {
  const wallGeo = new THREE.BoxGeometry(2, 1.6, 1.6)
  const roofGeo = new THREE.ConeGeometry(1.42, 0.9, 4)

  const wallEdges = new THREE.EdgesGeometry(wallGeo)
  const roofEdges = new THREE.EdgesGeometry(roofGeo)

  const mat = new THREE.LineBasicMaterial({ color: '#6ea3d4', transparent: true, opacity: 1.0 })

  return (
    <group>
      <lineSegments geometry={wallEdges} material={mat} position={[0, 0, 0]} />
      <lineSegments
        geometry={roofEdges}
        material={mat.clone()}
        position={[0, 1.25, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
      {/* window outlines on front face */}
      {[-0.55, 0, 0.55].map((x, i) => {
        const wGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.3, 0.3))
        return (
          <lineSegments
            key={i}
            geometry={wGeo}
            material={mat.clone()}
            position={[x, 0.1, 0.801]}
          />
        )
      })}
      {/* side window */}
      {[-0.35, 0.35].map((z, i) => {
        const wGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.3, 0.3))
        return (
          <lineSegments
            key={i}
            geometry={wGeo}
            material={mat.clone()}
            position={[1.001, 0.1, z]}
            rotation={[0, Math.PI / 2, 0]}
          />
        )
      })}
    </group>
  )
}

function SolidHouse() {
  const mat = new THREE.MeshStandardMaterial({
    color: '#555555',
    roughness: 0.8,
    metalness: 0.1,
    transparent: true,
    opacity: 1.0,
  })
  const roofMat = new THREE.MeshStandardMaterial({
    color: '#444444',
    roughness: 0.9,
    transparent: true,
    opacity: 1.0,
  })

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.6, 1.6]} />
        <meshStandardMaterial color='#555555' roughness={0.8} metalness={0.1} transparent opacity={1.0} />
      </mesh>
      <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.42, 0.9, 4]} />
        <meshStandardMaterial color='#444444' roughness={0.9} transparent opacity={1.0} />
      </mesh>
    </group>
  )
}

function TexturedHouse() {
  const winMat = new THREE.MeshStandardMaterial({
    color: '#1a1008',
    emissive: '#ff6a26',
    emissiveIntensity: 1.5,
    transparent: true,
    opacity: 1.0,
  })

  return (
    <group>
      {/* walls */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.6, 1.6]} />
        <meshStandardMaterial color='#8a6a4a' roughness={0.75} metalness={0.05} transparent opacity={1.0} />
      </mesh>
      {/* roof */}
      <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.42, 0.9, 4]} />
        <meshStandardMaterial color='#4a3828' roughness={0.9} transparent opacity={1.0} />
      </mesh>
      {/* front windows */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.801]}>
          <planeGeometry args={[0.3, 0.3]} />
          <primitive object={winMat.clone()} attach='material' />
        </mesh>
      ))}
      {/* door */}
      <mesh position={[0, -0.45, 0.801]}>
        <planeGeometry args={[0.35, 0.65]} />
        <meshStandardMaterial color='#3a2818' roughness={0.9} transparent opacity={1.0} />
      </mesh>
      {/* side windows */}
      {[-0.35, 0.35].map((z, i) => (
        <mesh key={i} position={[1.001, 0.1, z]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <primitive object={winMat.clone()} attach='material' />
        </mesh>
      ))}
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

    // slow base rotation
    rootRef.current.rotation.y += delta * 0.15

    const s = simplified ? 1.0 : scroll.offset

    // compute opacities
    const wireOp = simplified ? 0.0 : 1.0 - smoothstep(0.28, 0.40, s)
    const solidOp = simplified ? 0.0 : smoothstep(0.30, 0.42, s) * (1.0 - smoothstep(0.60, 0.72, s))
    const texturedOp = simplified ? 1.0 : smoothstep(0.62, 0.74, s)

    setGroupOpacity(wireRef.current, wireOp)
    setGroupOpacity(solidRef.current, solidOp)
    setGroupOpacity(texturedRef.current, texturedOp)
  })

  return (
    <group ref={rootRef} position={[0, -0.5, 0]}>
      <group ref={wireRef}>
        <WireframeHouse />
      </group>
      <group ref={solidRef}>
        <SolidHouse />
      </group>
      <group ref={texturedRef}>
        <TexturedHouse />
      </group>
    </group>
  )
}
