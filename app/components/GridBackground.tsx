"use client"
import { useEffect, useState } from "react"

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [])

  return isMobile;
}

export function GridBackground() {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 })
  const isMobile = useMobile()

  useEffect(() => {
    setMounted(true)
    const update = () => {
      setDimensions({
        cols: Math.ceil(window.innerWidth / 24),
        rows: Math.ceil(window.innerHeight / 24)
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!mounted) return null

  const cells = Array.from({ length: dimensions.rows * dimensions.cols }, (_, i) => {
    const seed = (i * 1234567) % 1000
    const isActive = seed < 25
    if (!isActive) return null

    return {
      opacity: (seed % 10) / 40 + 0.05,
      scale: (seed % 5) / 2 + 0.5,
      delay: (seed % 100) / 10
    }
  })

  return (
    <div className="fixed inset-0 h-full w-full -z-10 bg-black overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, 24px)`,
          gridTemplateRows: `repeat(${dimensions.rows}, 24px)`,
        }}
      >
        {cells.map((cell, i) => (
          <div key={i} className="relative w-6 h-6 border-[0.5px] border-white/[0.02]">
            {cell && (
              <div
                className="absolute inset-[2px] rounded-sm"
                style={{
                  background: `rgba(16, 185, 129, ${cell.opacity * 2.5})`,
                  boxShadow: `0 0 8px rgba(16, 185, 129, ${cell.opacity * 0.5})`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />

      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}