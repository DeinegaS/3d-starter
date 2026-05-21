'use client'

import dynamic from 'next/dynamic'
import { useDeviceTier } from '@/hooks/useDeviceTier'

const HouseScene = dynamic(
  () => import('@/components/canvas/HouseScene').then((m) => m.HouseScene),
  { ssr: false }
)

const TIERS = [
  { label: 'Tier 2', desc: 'Сайт-визитка' },
  { label: 'Tier 3', desc: '3D Landing' },
  { label: 'Tier 4', desc: 'Real Estate' },
  { label: 'Tier 5', desc: 'Showcase' },
]

function TextLeft() {
  return (
    <div className='flex flex-col justify-center gap-4 px-8'>
      <p className='font-mono text-xs uppercase tracking-widest text-synkora-accent'>
        SYNKORA · Real Estate · 3D
      </p>
      <h1 className='text-3xl font-bold leading-tight text-synkora-ink'>
        Сайты, которые<br />показывают будущее
      </h1>
      <p className='text-sm leading-relaxed text-synkora-muted'>
        Технология. Дизайн. Недвижимость.
      </p>
    </div>
  )
}

function TextRight() {
  return (
    <div className='flex flex-col justify-center gap-3 px-8'>
      {TIERS.map((t) => (
        <div
          key={t.label}
          className='rounded border border-synkora-line bg-synkora-paper px-3 py-2'
        >
          <span className='font-mono text-xs text-synkora-accent'>{t.label}</span>
          <span className='ml-2 text-xs text-synkora-muted'>{t.desc}</span>
        </div>
      ))}
    </div>
  )
}

function TextCompact() {
  return (
    <div className='flex flex-col items-center gap-3 p-6 text-center'>
      <p className='font-mono text-xs uppercase tracking-widest text-synkora-accent'>
        SYNKORA · Real Estate · 3D
      </p>
      <h1 className='text-2xl font-bold leading-tight text-synkora-ink'>
        Сайты, которые показывают будущее
      </h1>
      <p className='text-sm text-synkora-muted'>
        Технология. Дизайн. Недвижимость.
      </p>
    </div>
  )
}

export function AdaptiveHero() {
  const { tier } = useDeviceTier()

  if (tier === 'desktop') {
    return (
      <div
        className='relative flex w-full bg-synkora-bg'
        style={{ height: '100vh' }}
      >
        <div className='flex w-1/5 flex-col justify-center'>
          <TextLeft />
        </div>

        <div className='relative flex-1' style={{ minWidth: 0 }}>
          <HouseScene
            simplified={false}
            pages={3}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>

        <div className='flex w-1/5 flex-col justify-center'>
          <TextRight />
        </div>
      </div>
    )
  }

  if (tier === 'tablet') {
    return (
      <div className='flex w-full flex-col bg-synkora-bg' style={{ minHeight: '80vh' }}>
        <div style={{ height: '55vh' }}>
          <HouseScene
            simplified={false}
            pages={3}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
        <TextCompact />
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col bg-synkora-bg' style={{ minHeight: '60vh' }}>
      <div style={{ height: '40vh' }}>
        <HouseScene
          simplified={true}
          pages={1}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
      <TextCompact />
    </div>
  )
}
