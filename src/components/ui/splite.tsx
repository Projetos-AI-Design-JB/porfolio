'use client'

import Spline from '@splinetool/react-spline/next'

interface SplineSceneProps {
  scene: string
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSplineLoad(splineApp: any) {
  try {
    // Confirmed in @splinetool/runtime runtime.d.ts — accepts CSS color string
    splineApp.setBackgroundColor('transparent')
  } catch {
    // no-op
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={handleSplineLoad}
      style={{ background: 'transparent' }}
    />
  )
}
