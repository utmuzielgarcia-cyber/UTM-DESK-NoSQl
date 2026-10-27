import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  RoundedBox,
} from '@react-three/drei'
import * as THREE from 'three'

const GLASS_BACKGROUND = new THREE.Color('#ffffff')
const PALETTE = ['#2747d8', '#e7b447', '#d49a26', '#f6dfa6', '#1c2d6e']

// Curva en forma de "U" (logotipo de UTM Desk) parametrizada por longitud.
class UCurve extends THREE.Curve {
  constructor(width = 1.1, height = 1.5) {
    super()
    this.r = width
    this.h = height
    this.total = height * 2 + Math.PI * width
  }

  getPoint(t, target = new THREE.Vector3()) {
    const { r, h, total } = this
    const d = t * total
    if (d < h) return target.set(-r, h - d, 0)
    if (d < h + Math.PI * r) {
      const angle = Math.PI + (d - h) / r
      return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0)
    }
    return target.set(r, d - h - Math.PI * r, 0)
  }
}

function GlassLogo({ reducedMotion }) {
  const group = useRef()
  const curve = useMemo(() => new UCurve(), [])

  useFrame((state, delta) => {
    if (!group.current) return
    const scroll = window.scrollY / window.innerHeight
    const spin = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.45) * 0.55
    const targetY = spin + scroll * 1.2 + state.pointer.x * 0.4
    const targetX = -0.15 + state.pointer.y * -0.25 + scroll * 0.25
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta)
  })

  return (
    <group ref={group} position={[0, 0.25, 0]}>
      {/* Tubo de vidrio */}
      <mesh castShadow>
        <tubeGeometry args={[curve, 220, 0.42, 64, false]} />
        <MeshTransmissionMaterial
          backside
          background={GLASS_BACKGROUND}
          backsideThickness={0.4}
          thickness={0.6}
          samples={8}
          resolution={512}
          transmission={1}
          roughness={0.04}
          ior={1.45}
          chromaticAberration={0.35}
          anisotropicBlur={0.2}
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={2.2}
          attenuationColor="#ffffff"
          color="#e6ecff"
        />
      </mesh>
      {/* Núcleo de neón dentro del vidrio */}
      <mesh>
        <tubeGeometry args={[curve, 220, 0.08, 24, false]} />
        <meshStandardMaterial color="#3a5ae6" emissive="#3a5ae6" emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      {/* Tapas redondeadas */}
      {[[-1.1, 1.5], [1.1, 1.5]].map(([x, y]) => (
        <mesh key={x} position={[x, y, 0]}>
          <sphereGeometry args={[0.42, 48, 48]} />
          <MeshTransmissionMaterial background={GLASS_BACKGROUND} thickness={0.5} roughness={0.04} chromaticAberration={0.3} samples={6} resolution={256} color="#f4f6ff" />
        </mesh>
      ))}
    </group>
  )
}

// Partículas de colores que orbitan y suben como vapor.
function Particles({ count = 140, reducedMotion }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        radius: 1.8 + Math.random() * 2.2,
        angle: Math.random() * Math.PI * 2,
        y: -1.5 + Math.random() * 4,
        speed: 0.08 + Math.random() * 0.25,
        rise: 0.05 + Math.random() * 0.2,
        scale: 0.025 + Math.random() * 0.06,
        spin: Math.random() * Math.PI,
      })),
    [count],
  )
  const colors = useMemo(() => {
    const array = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      color.set(PALETTE[i % PALETTE.length]).toArray(array, i * 3)
    }
    return array
  }, [count])

  useFrame((_, delta) => {
    if (!mesh.current) return
    particles.forEach((p, i) => {
      if (!reducedMotion) {
        p.angle += p.speed * delta
        p.y += p.rise * delta
        p.spin += delta
        if (p.y > 2.8) p.y = -1.5
      }
      dummy.position.set(Math.cos(p.angle) * p.radius, p.y, Math.sin(p.angle) * p.radius * 0.6)
      dummy.rotation.set(p.spin, p.spin * 0.7, 0)
      const fade = 1 - Math.max(0, (p.y - 1.8) / 1)
      dummy.scale.setScalar(p.scale * Math.max(fade, 0.05))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshStandardMaterial vertexColors roughness={0.3} metalness={0.1} />
    </instancedMesh>
  )
}

// Luces de colores que giran alrededor del objeto.
function DynamicLights({ reducedMotion }) {
  const pink = useRef()
  const blue = useRef()

  useFrame((state) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime
    pink.current?.position.set(Math.sin(t * 0.7) * 4, 2 + Math.cos(t * 0.5), Math.cos(t * 0.7) * 4)
    blue.current?.position.set(Math.cos(t * 0.6) * -4, -1 + Math.sin(t * 0.4), Math.sin(t * 0.6) * 4)
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} castShadow />
      <pointLight ref={pink} color="#e7b447" intensity={22} distance={12} />
      <pointLight ref={blue} color="#2747d8" intensity={55} distance={12} />
    </>
  )
}

// Tarjetas flotantes de colores detrás del vidrio para que la refracción luzca.
function ColorChips() {
  const chips = [
    { position: [-1.9, 1.4, -1.6], color: '#2747d8', rotation: 0.3 },
    { position: [2.1, 0.2, -1.8], color: '#d49a26', rotation: -0.4 },
    { position: [0.2, -1.5, -2], color: '#f6dfa6', rotation: 0.15 },
    { position: [1.5, 2.2, -2.4], color: '#1c2d6e', rotation: -0.2 },
  ]

  return chips.map(({ position, color, rotation }) => (
    <Float key={color} speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
      <RoundedBox args={[1, 0.62, 0.08]} radius={0.06} position={position} rotation={[0.2, rotation, rotation]}>
        <meshStandardMaterial color={color} roughness={0.35} />
      </RoundedBox>
    </Float>
  ))
}

export default function GlassScene() {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 7.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0)
        scene.background = null
      }}
    >
      <DynamicLights reducedMotion={reducedMotion} />
      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <GlassLogo reducedMotion={reducedMotion} />
      </Float>
      <ColorChips />
      <Particles reducedMotion={reducedMotion} />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={10} blur={2.8} far={4} color="#2747d8" />

      {/* Entorno de estudio hecho con luces, sin descargar mapas HDR */}
      <Environment resolution={256}>
        <color attach="background" args={['#ffffff']} />
        <Lightformer form="rect" intensity={4} position={[0, 5, -6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#2747d8" position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={3} color="#f6dfa6" position={[0, -4, 3]} scale={3} />
      </Environment>
    </Canvas>
  )
}
