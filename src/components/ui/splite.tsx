'use client'

import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSplineLoad(splineApp: any) {
  try {
    splineApp.setBackgroundColor('transparent')
  } catch {
    // no-op
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSplineMouseDown(e: any) {
  // Broadening the name check to find "GET IN TOUCH" anywhere in the target string
  const targetName = e.target?.name || '';
  if (targetName.toUpperCase().includes('GET') && targetName.toUpperCase().includes('TOUCH')) {
    window.open('https://www.linkedin.com/in/julianobianchesi', '_blank')
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={handleSplineLoad}
      onMouseDown={handleSplineMouseDown}
      style={{ background: 'transparent' }}
    />
  )
}
