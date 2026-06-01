'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ServiceVisualization, ServiceColor } from '@/data/services'
import { colorConfig } from '@/data/services'

interface Props {
  type: ServiceVisualization
  isActive: boolean
  isMobile: boolean
  mouseX: number
  mouseY: number
  progress: number
  color: ServiceColor
}

function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}

function WireframeVisualization({ isActive, color }: { isActive: boolean; color: ServiceColor }) {
  const mounted = useMounted()
  const cfg = colorConfig[color]
  const dur = 1.2
  const gradId = 'wf-grad-' + color

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={cfg.secondaryColor} stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <motion.rect x="30" y="40" width="340" height="320" rx="16" stroke={'url(#' + gradId + ')'} strokeWidth="1.5" fill="rgba(0,0,0,0.02)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: dur * 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.rect x="30" y="40" width="340" height="44" rx="16" fill={cfg.accentColor} fillOpacity={0.05}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: dur * 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.rect x="60" y="54" width="200" height="16" rx="8" stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.3}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: dur * 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      {[
        [60, 90, 60, 0.2],
        [140, 90, 40, 0.25],
        [200, 90, 40, 0.3],
      ].map(([x, y, w, d]) => (
        <motion.rect key={'' + x + y} x={x} y={y} width={w} height="8" rx="4" fill={cfg.accentColor} fillOpacity={0.5}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: dur * 0.5, delay: d, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: x + 'px ' + (y + 4) + 'px' }}
        />
      ))}

      <motion.rect x="60" y="120" width="280" height="100" rx="8" stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.2} fill={'url(#' + gradId + ')'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: dur * 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      />

      {[
        [80, 140, 180, 12, 0.45, 0.6],
        [80, 162, 120, 8, 0.5, 0.3],
        [80, 180, 80, 8, 0.55, 0.2],
      ].map(([x, y, w, h, d, o]) => (
        <motion.rect key={'' + x + h} x={x} y={y} width={w} height={h} rx="4" fill={cfg.accentColor} fillOpacity={o}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: dur * 0.5, delay: d, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: x + 'px ' + (y + h / 2) + 'px' }}
        />
      ))}

      {[
        [60, 240, 130, 70, 0.5],
        [205, 240, 135, 70, 0.55],
      ].map(([x, y, w, h, d]) => (
        <motion.rect key={'' + x + y} x={x} y={y} width={w} height={h} rx="8" stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.15} fill={cfg.accentColor} fillOpacity={0.03}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: dur * 0.6, ease: [0.16, 1, 0.3, 1], delay: d }}
        />
      ))}

      <motion.rect x="60" y="330" width="280" height="16" rx="8" fill={cfg.accentColor} fillOpacity={0.03}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: dur * 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      />

      {[
        [290, 54, 340, 54, 0.3],
        [290, 66, 325, 66, 0.35],
        [290, 78, 330, 78, 0.4],
      ].map(([x1, y1, x2, y2, d]) => (
        <motion.line key={'' + x1 + y1} x1={x1} y1={y1} x2={x2} y2={y2} stroke={cfg.accentColor} strokeWidth="2" strokeOpacity={0.3} strokeLinecap="round"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: dur * 0.4, delay: d, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: x1 + 'px ' + y1 + 'px' }}
        />
      ))}

      {isActive && (
        <motion.rect
          x="30" y="40" width="340" height="320" rx="16"
          stroke={cfg.accentColor} strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </svg>
  )
}

function UIAssembleVisualization({ isActive, color }: { isActive: boolean; color: ServiceColor }) {
  const mounted = useMounted()
  const cfg = colorConfig[color]
  const dur = 1.0
  const gradId = 'ui-grad-' + color

  const rectAnimate = (delay: number) => ({
    initial: { scale: 0, opacity: 0, y: 20 },
    animate: isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 20 },
    transition: { duration: dur * 0.7, delay, ease: [0.34, 1.56, 0.64, 1] },
  })

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={cfg.secondaryColor} stopOpacity={0.05} />
        </linearGradient>
      </defs>

      <motion.g opacity={isActive ? 1 : 0} transition={{ duration: 0.5 }}>
        {[40, 100, 160, 220, 280, 340].map((x) => (
          <line key={'v' + x} x1={x} y1={40} x2={x} y2={360} stroke={cfg.accentColor} strokeOpacity={0.06} strokeWidth="1" />
        ))}
        {[40, 100, 160, 220, 280, 340].map((y) => (
          <line key={'h' + y} x1={40} y1={y} x2={360} y2={y} stroke={cfg.accentColor} strokeOpacity={0.06} strokeWidth="1" />
        ))}
      </motion.g>

      <motion.rect x="40" y="40" width="140" height="320" rx="12" fill={'url(#' + gradId + ')'} stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.15} {...rectAnimate(0)} />
      <motion.rect x="56" y="60" width="108" height="24" rx="6" fill={cfg.accentColor} fillOpacity={0.15} {...rectAnimate(0.1)} />
      <motion.rect x="56" y="96" width="80" height="8" rx="4" fill={cfg.accentColor} fillOpacity={0.4}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '56px 100px' }}
      />
      <motion.rect x="56" y="112" width="60" height="8" rx="4" fill={cfg.accentColor} fillOpacity={0.2}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '56px 116px' }}
      />

      {[
        { cx: 68, cy: 148, fill: '#7C3AED', delay: 0.2 },
        { cx: 98, cy: 148, fill: '#06B6D4', delay: 0.25 },
        { cx: 128, cy: 148, fill: '#22D3EE', delay: 0.3 },
        { cx: 158, cy: 148, fill: '#8B5CF6', delay: 0.35 },
      ].map((s) => (
        <motion.circle key={'' + s.cx} cx={s.cx} cy={s.cy} r="10" fill={s.fill} {...rectAnimate(s.delay)} />
      ))}

      <motion.rect x="56" y="180" width="108" height="6" rx="3" fill={cfg.accentColor} fillOpacity={0.3}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '56px 183px' }}
      />
      <motion.rect x="56" y="194" width="88" height="6" rx="3" fill={cfg.accentColor} fillOpacity={0.15}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '56px 197px' }}
      />

      <motion.rect x="200" y="40" width="160" height="140" rx="12" fill={cfg.accentColor} fillOpacity={0.03} stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.1} {...rectAnimate(0.2)} />
      <motion.rect x="220" y="60" width="40" height="40" rx="10" fill={cfg.accentColor} fillOpacity={0.1} {...rectAnimate(0.3)} />
      <motion.rect x="272" y="64" width="68" height="10" rx="5" fill={cfg.accentColor} fillOpacity={0.5}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '272px 69px' }}
      />
      <motion.rect x="272" y="82" width="48" height="8" rx="4" fill={cfg.accentColor} fillOpacity={0.2}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '272px 86px' }}
      />
      <motion.rect x="220" y="116" width="120" height="8" rx="4" fill={cfg.accentColor} fillOpacity={0.15}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '220px 120px' }}
      />
      <motion.rect x="220" y="132" width="80" height="8" rx="4" fill={cfg.accentColor} fillOpacity={0.1}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '220px 136px' }}
      />
      <motion.rect x="220" y="156" width="100" height="16" rx="8" fill={cfg.accentColor} fillOpacity={0.2} {...rectAnimate(0.5)} />

      <motion.rect x="200" y="196" width="75" height="90" rx="10" fill={cfg.accentColor} fillOpacity={0.03} stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.08} {...rectAnimate(0.35)} />
      <motion.rect x="285" y="196" width="75" height="90" rx="10" fill={cfg.accentColor} fillOpacity={0.03} stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.08} {...rectAnimate(0.4)} />
      <motion.rect x="200" y="302" width="160" height="58" rx="10" fill={cfg.accentColor} fillOpacity={0.05} {...rectAnimate(0.45)} />

      <motion.rect x="200" y="302" width="32" height="32" rx="8" fill={cfg.accentColor} fillOpacity={0.1} {...rectAnimate(0.5)} />
      <motion.rect x="242" y="308" width="50" height="6" rx="3" fill={cfg.accentColor} fillOpacity={0.3}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '242px 311px' }}
      />

      {[
        { cx: 370, cy: 100, r: 6, delay: 0.5 },
        { cx: 380, cy: 220, r: 4, delay: 0.55 },
        { cx: 30, cy: 300, r: 5, delay: 0.6 },
      ].map((d) => (
        <motion.circle key={'' + d.cx + d.cy} cx={d.cx} cy={d.cy} r={d.r} fill={cfg.accentColor} fillOpacity={0.2} {...rectAnimate(d.delay)} />
      ))}
    </svg>
  )
}

function LogoMorphVisualization({ isActive, color }: { isActive: boolean; color: ServiceColor }) {
  const cfg = colorConfig[color]
  const dur = 1.5
  const gradId = 'logo-grad-' + color
  const glowId = 'logo-glow-' + color

  const morphPath = isActive
    ? 'M 200 80 C 280 80, 340 140, 320 220 C 300 300, 220 340, 180 320 C 140 300, 80 260, 80 200 C 80 140, 120 80, 200 80 Z'
    : 'M 200 60 L 280 140 L 260 260 L 140 280 L 80 200 C 80 120, 120 60, 200 60 Z'

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.6} />
          <stop offset="50%" stopColor={cfg.secondaryColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={cfg.accentColor} stopOpacity={0.1} />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <motion.circle
        cx="200" cy="200" r="120"
        fill={cfg.accentColor}
        filter={'url(#' + glowId + ')'}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isActive ? { opacity: 0.08, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <motion.path
        d={morphPath}
        fill={'url(#' + gradId + ')'}
        stroke={cfg.accentColor}
        strokeWidth="2"
        strokeOpacity={0.5}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
      />

      {[
        { cx: 200, cy: 120, size: 24, shape: 'circle', delay: 0.3 },
        { cx: 260, cy: 160, size: 20, shape: 'triangle', delay: 0.5 },
        { cx: 250, cy: 250, size: 18, shape: 'square', delay: 0.7 },
        { cx: 150, cy: 250, size: 16, shape: 'circle', delay: 0.9 },
        { cx: 140, cy: 150, size: 14, shape: 'square', delay: 1.1 },
      ].map((el) => {
        const half = el.size / 2
        const baseAnim = {
          initial: { scale: 0, opacity: 0, rotate: -30 },
          animate: isActive ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -30 },
          transition: { duration: dur * 0.6, delay: el.delay, ease: [0.34, 1.56, 0.64, 1] },
        }
        if (el.shape === 'circle') {
          return <motion.circle key={'' + el.cx + el.cy} cx={el.cx} cy={el.cy} r={half} fill={cfg.accentColor} fillOpacity={0.15} stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.3} {...baseAnim} />
        } else if (el.shape === 'triangle') {
          return (
            <motion.polygon key={'' + el.cx + el.cy}
              points={(el.cx) + ',' + (el.cy - half) + ' ' + (el.cx - half) + ',' + (el.cy + half) + ' ' + (el.cx + half) + ',' + (el.cy + half)}
              fill={cfg.secondaryColor} fillOpacity={0.15} stroke={cfg.secondaryColor} strokeWidth="1" strokeOpacity={0.3} {...baseAnim}
            />
          )
        }
        return (
          <motion.rect key={'' + el.cx + el.cy} x={el.cx - half} y={el.cy - half} width={el.size} height={el.size} rx={half / 2} fill={cfg.accentColor} fillOpacity={0.15} stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.3} {...baseAnim} />
        )
      })}

      <motion.ellipse
        cx="200" cy="200" rx="90" ry="30"
        stroke={cfg.accentColor} strokeWidth="0.5" strokeOpacity={0.15}
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1, rotate: [0, 360] } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      />
      <motion.ellipse
        cx="200" cy="200" rx="60" ry="60"
        stroke={cfg.secondaryColor} strokeWidth="0.5" strokeOpacity={0.1}
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1, rotate: [360, 0] } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      />

      <motion.circle
        cx="200" cy="200" r="8"
        fill={cfg.accentColor}
        initial={{ opacity: 0, scale: 0 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </svg>
  )
}

function NeuralNetworkVisualization({ isActive, color }: { isActive: boolean; color: ServiceColor }) {
  const cfg = colorConfig[color]
  const glowId = 'nn-glow-' + color

  const nodes = [
    { id: 0, x: 200, y: 60 },
    { id: 1, x: 100, y: 160 },
    { id: 2, x: 300, y: 160 },
    { id: 3, x: 60, y: 280 },
    { id: 4, x: 200, y: 300 },
    { id: 5, x: 340, y: 280 },
    { id: 6, x: 200, y: 340 },
  ]

  const connections = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 4], [2, 5],
    [3, 6], [4, 6], [5, 6],
    [1, 2], [3, 4], [4, 5],
  ]

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={'nn-grad-' + color} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={cfg.secondaryColor} stopOpacity={0.1} />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {connections.map(([from, to], i) => {
        const f = nodes[from]
        const t = nodes[to]
        return (
          <motion.line
            key={i}
            x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke={cfg.accentColor}
            strokeWidth="1.5"
            strokeOpacity={0.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, delay: i * 0.05, ease: 'easeInOut' }}
          />
        )
      })}

      {isActive && connections.slice(0, 5).map(([from, to], i) => {
        const f = nodes[from]
        const t = nodes[to]
        return (
          <motion.circle
            key={'pulse-' + i}
            r="3"
            fill={cfg.accentColor}
            filter={'url(#' + glowId + ')'}
            initial={{ offsetDistance: '0%', opacity: 0.8 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
            style={{
              offsetPath: 'path(\'M ' + f.x + ' ' + f.y + ' L ' + t.x + ' ' + t.y + '\')',
            }}
          />
        )
      })}

      {nodes.map((node, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={node.x} cy={node.y} r="18"
            fill={cfg.accentColor} fillOpacity={0.05}
            stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.3}
            initial={{ scale: 0, opacity: 0 }}
            animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <motion.circle
            cx={node.x} cy={node.y} r="5"
            fill={cfg.accentColor} fillOpacity={0.5}
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          />
          {isActive && (
            <motion.circle
              cx={node.x} cy={node.y} r="5"
              fill={cfg.accentColor}
              filter={'url(#' + glowId + ')'}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.g>
      ))}

      <motion.g opacity={isActive ? 0.5 : 0} transition={{ duration: 1 }}>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle
              key={'bg-' + row + '-' + col}
              cx={60 + col * 70} cy={60 + row * 70}
              r="1.5"
              fill={cfg.accentColor}
              fillOpacity={0.08}
            />
          ))
        )}
      </motion.g>
    </svg>
  )
}

function GraphGrowthVisualization({ isActive, color }: { isActive: boolean; color: ServiceColor }) {
  const cfg = colorConfig[color]
  const gradId = 'graph-grad-' + color
  const barGradId = 'graph-bar-' + color
  const glowId = 'graph-glow-' + color

  const linePath = 'M 50 300 L 100 280 L 150 290 L 200 240 L 250 200 L 300 140 L 350 80'
  const areaPath = linePath + ' L 350 300 L 50 300 Z'
  const barData = [
    { x: 80, h: 60 },
    { x: 120, h: 90 },
    { x: 160, h: 130 },
    { x: 200, h: 170 },
    { x: 240, h: 200 },
    { x: 280, h: 230 },
    { x: 320, h: 250 },
  ]

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={cfg.accentColor} stopOpacity={0} />
        </linearGradient>
        <linearGradient id={barGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={cfg.accentColor} stopOpacity={0.05} />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <motion.g opacity={isActive ? 0.3 : 0} transition={{ duration: 0.5 }}>
        {[60, 120, 180, 240, 300].map((y) => (
          <line key={'grid-' + y} x1="50" y1={y} x2="350" y2={y} stroke={cfg.accentColor} strokeWidth="0.5" strokeOpacity={0.15} strokeDasharray="4 4" />
        ))}
      </motion.g>

      <motion.path
        d={areaPath}
        fill={'url(#' + gradId + ')'}
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <motion.path
        d={linePath}
        stroke={cfg.accentColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {isActive && (
        <motion.path
          d={linePath}
          stroke={cfg.accentColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={'url(#' + glowId + ')'}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {[
        { x: 50, y: 300 }, { x: 100, y: 280 }, { x: 150, y: 290 },
        { x: 200, y: 240 }, { x: 250, y: 200 }, { x: 300, y: 140 }, { x: 350, y: 80 },
      ].map((pt, i) => (
        <motion.g key={'pt-' + i}>
          <motion.circle
            cx={pt.x} cy={pt.y} r="5"
            fill={cfg.accentColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
          />
          {isActive && (
            <motion.circle
              cx={pt.x} cy={pt.y} r="10"
              fill={cfg.accentColor}
              fillOpacity={0.15}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 2, delay: 0.3 + i * 0.12, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.g>
      ))}

      {barData.map((bar, i) => (
        <motion.rect
          key={'bar-' + i}
          x={bar.x - 10} y={340 - bar.h}
          width="20" height={bar.h}
          rx="4"
          fill={'url(#' + barGradId + ')'}
          stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.2}
          initial={{ scaleY: 0, opacity: 0, transformOrigin: bar.x + 'px 340px' }}
          animate={isActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {isActive && (
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 0, 0] }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M 340 70 L 355 55 L 370 70" stroke={cfg.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="355" y1="55" x2="355" y2="85" stroke={cfg.accentColor} strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      )}

      <motion.line
        x1="50" y1="340" x2="350" y2="340"
        stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.3}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '50px 340px' }}
      />
    </svg>
  )
}

function CampaignMetricsVisualization({ isActive, color }: { isActive: boolean; color: ServiceColor }) {
  const cfg = colorConfig[color]
  const gradId = 'cm-grad-' + color
  const glowId = 'cm-glow-' + color
  const metrics = [
    { label: 'Reach', value: '2.4M', pct: 85 },
    { label: 'Engagement', value: '18.7%', pct: 72 },
    { label: 'Conversion', value: '5.2%', pct: 62 },
    { label: 'ROI', value: '340%', pct: 92 },
  ]

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={cfg.accentColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={cfg.secondaryColor} stopOpacity={0.1} />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <motion.path
        d="M 80 280 A 120 120 0 0 1 320 280"
        stroke={cfg.accentColor}
        strokeWidth="2"
        strokeOpacity={0.15}
        fill="none"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.path
        d="M 80 280 A 120 120 0 0 1 260 178"
        stroke={cfg.accentColor}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.g
        initial={{ rotate: -90, opacity: 0 }}
        animate={isActive ? { rotate: 30, opacity: 1 } : { rotate: -90, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: '200px 280px' }}
      >
        <line x1="200" y1="280" x2="200" y2="170" stroke={cfg.accentColor} strokeWidth="2" strokeLinecap="round" />
        <circle cx="200" cy="280" r="8" fill={cfg.accentColor} fillOpacity={0.2} stroke={cfg.accentColor} strokeWidth="2" />
        <circle cx="200" cy="280" r="3" fill={cfg.accentColor} />
      </motion.g>

      {metrics.map((m, i) => {
        const cols = 2
        const x = 40 + (i % cols) * 160
        const y = 40 + Math.floor(i / cols) * 100
        return (
          <motion.g key={'metric-' + i}>
            <motion.rect
              x={x} y={y} width="140" height="80" rx="12"
              fill={cfg.accentColor} fillOpacity={0.03}
              stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.12}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={isActive ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            />
            <motion.text
              x={x + 70} y={y + 32}
              textAnchor="middle"
              fill={cfg.accentColor}
              fontSize="22"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {m.value}
            </motion.text>
            <motion.text
              x={x + 70} y={y + 56}
              textAnchor="middle"
              fill={cfg.secondaryColor}
              fontSize="10"
              fontWeight="500"
              fontFamily="monospace"
              letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.15 }}
            >
              {m.label}
            </motion.text>
            <motion.rect
              x={x + 20} y={y + 66}
              width={m.pct} height="3" rx="1.5"
              fill={cfg.accentColor} fillOpacity={0.3}
              initial={{ scaleX: 0, opacity: 0, transformOrigin: (x + 20) + 'px ' + (y + 66) + 'px' }}
              animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.g>
        )
      })}

      <motion.line
        x1="40" y1="370" x2="360" y2="370"
        stroke={cfg.accentColor} strokeWidth="1" strokeOpacity={0.1}
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '40px 370px' }}
      />
      {isActive && (
        <>
          <motion.circle cx="60" cy="370" r="2" fill={cfg.accentColor} fillOpacity={0.5}
            animate={{ cx: [60, 340], opacity: [0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
          <motion.circle cx="80" cy="370" r="2" fill={cfg.secondaryColor} fillOpacity={0.5}
            animate={{ cx: [80, 340], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: 'linear' }} />
        </>
      )}
    </svg>
  )
}

export default function ServiceVisualization({ type, isActive, isMobile, mouseX, mouseY, progress, color }: Props) {
  const cfg = colorConfig[color]
  const mounted = useMounted()

  const visualMouseX = mouseX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const visualMouseY = mouseY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  const parallaxStyle = !isMobile && mounted ? {
    transform: 'translate(' + (visualMouseX * 0.025) + 'px, ' + (visualMouseY * 0.025) + 'px)',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  } : {}

  const renderVisualization = () => {
    switch (type) {
      case 'wireframe': return <WireframeVisualization isActive={isActive} color={color} />
      case 'ui-assemble': return <UIAssembleVisualization isActive={isActive} color={color} />
      case 'logo-morph': return <LogoMorphVisualization isActive={isActive} color={color} />
      case 'neural-network': return <NeuralNetworkVisualization isActive={isActive} color={color} />
      case 'graph-growth': return <GraphGrowthVisualization isActive={isActive} color={color} />
      case 'campaign-metrics': return <CampaignMetricsVisualization isActive={isActive} color={color} />
      default: return null
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={parallaxStyle}>
      <motion.div
        className="absolute inset-[10%] rounded-full blur-[80px]"
        style={{ background: cfg.glowColor }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 0.12, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative w-full h-full max-w-[400px] max-h-[400px]">
        {mounted && renderVisualization()}
      </div>
    </div>
  )
}
