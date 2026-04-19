'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

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
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={handleSplineLoad}
        style={{ background: 'transparent' }}
      />
    </Suspense>
  )
}
