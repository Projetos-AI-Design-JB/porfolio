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
function handleSplineMouseUp(e: any) {
  // Ignora o filtro de nomes da malha 3D e força o disparo para não ter erro
  window.open('https://www.linkedin.com/in/juliano-bianchesi', '_blank')
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={handleSplineLoad}
      onMouseUp={handleSplineMouseUp}
      style={{ background: 'transparent' }}
    />
  )
}
