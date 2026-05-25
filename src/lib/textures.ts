import * as THREE from 'three'

export function createBrandTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, 512, 128)
  ctx.shadowColor = 'rgba(255,255,255,0.06)'
  ctx.shadowBlur = 4
  ctx.fillStyle = '#c8c8c8'
  ctx.font = 'bold 26px "Helvetica Neue", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('BRANDEX', 256, 48)
  ctx.shadowBlur = 0
  ctx.fillStyle = '#777777'
  ctx.font = '12px "Helvetica Neue", Arial, sans-serif'
  ctx.fillText('DIGITAL', 256, 80)
  return new THREE.CanvasTexture(canvas)
}

export function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0d0d0d'
  ctx.fillRect(0, 0, 1024, 128)
  ctx.fillStyle = '#555555'
  ctx.font = '10px "Helvetica Neue", Arial, sans-serif'
  ctx.textAlign = 'center'
  for (let i = 0; i < 24; i++) {
    const x = (i / 24) * 1024
    const h = i % 4 === 0 ? 36 : i % 2 === 0 ? 22 : 12
    ctx.fillRect(x, 64 - h / 2, 1, h)
    if (i % 4 === 0) {
      ctx.fillStyle = '#888888'
      ctx.fillText(`${0.2 + i * 0.15}m`, x, 96)
      ctx.fillStyle = '#555555'
    }
  }
  return new THREE.CanvasTexture(canvas)
}
