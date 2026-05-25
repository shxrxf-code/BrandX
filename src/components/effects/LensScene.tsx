'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import DSLRCamera from '@/components/effects/DSLRCamera'
import CinematicCamera from '@/components/effects/CinematicCamera'
import ApertureBlade from '@/components/effects/ApertureBlade'
import FloatingDust from '@/components/effects/FloatingDust'
import GlowRing from '@/components/effects/GlowRing'

interface LensSceneProps {
  timeline: number
  tier: string
}

export default function LensScene({ timeline, tier }: LensSceneProps) {
  const isHighTier = tier === 'high'
  const bladeCount = tier === 'low' ? 5 : 7

  const apertureProgress = useMemo(() => {
    if (timeline < 0.35) return 0
    if (timeline < 0.75) return (timeline - 0.35) / 0.4
    return Math.min(1, (timeline - 0.35) / 0.4)
  }, [timeline])

  return (
    <>
      <ambientLight intensity={0.06} />
      <spotLight
        position={[5, 4, 5]}
        intensity={isHighTier ? 2.0 : 1.2}
        angle={0.35}
        penumbra={0.6}
        castShadow
        color="#ffe8cc"
      />
      <spotLight
        position={[-3.5, 1.5, 3]}
        intensity={isHighTier ? 0.6 : 0.3}
        angle={0.45}
        penumbra={0.7}
        color="#4466cc"
      />
      <spotLight
        position={[0, 3.5, -4]}
        intensity={isHighTier ? 0.5 : 0.2}
        angle={0.5}
        penumbra={0.8}
        color="#7C3AED"
      />
      <spotLight
        position={[3, -2, 3]}
        intensity={0.25}
        angle={0.4}
        penumbra={0.8}
        color="#22D3EE"
      />
      <pointLight position={[0, 0, 3]} intensity={0.12} color="#ffffff" />

      {isHighTier && (
        <spotLight
          position={[-2, -1, -3]}
          intensity={0.3}
          angle={0.4}
          penumbra={0.9}
          color="#8888ff"
        />
      )}

      <directionalLight position={[1, 2, 4]} intensity={0.15} />

      <CinematicCamera timeline={timeline} tier={tier} />

      <group position={[0, 0, 0]}>
        <DSLRCamera timeline={timeline} tier={tier} />

        <GlowRing openProgress={apertureProgress} />

        {Array.from({ length: bladeCount }, (_, i) => (
          <ApertureBlade
            key={i}
            index={i}
            total={bladeCount}
            openProgress={apertureProgress}
            tier={tier}
          />
        ))}

        <mesh position={[0, 0, 0.04]}>
          <ringGeometry args={[0.15, 0.65, tier === 'low' ? 20 : 36]} />
          <meshStandardMaterial
            color="#050505"
            metalness={0.8}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <ringGeometry args={[0.05, 0.9, tier === 'low' ? 16 : 32]} />
          <meshStandardMaterial
            color="#020202"
            metalness={0.3}
            roughness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {tier !== 'low' && <FloatingDust tier={tier} />}

      <Environment
        preset={isHighTier ? 'studio' : 'city'}
        environmentIntensity={isHighTier ? 0.8 : 0.4}
      />

      <EffectComposer enableNormalPass={false} multisampling={tier === 'low' ? 0 : 4}>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.85}
          intensity={tier === 'low' ? 0.15 : tier === 'medium' ? 0.3 : 0.45}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.12} darkness={tier === 'low' ? 0.5 : 0.75} />
      </EffectComposer>
    </>
  )
}
