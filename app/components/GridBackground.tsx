"use client"
import { useEffect, useState } from "react"

const useMobile = ()=>{
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
    const check=()=> setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return ()=>window.removeEventListener('resize', check);
  },[])

  return isMobile;
}

export function GridBackground() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile() 

  useEffect(() => setMounted(true), [])

  if (!mounted || isMobile) return null

  const rows = 30
  const cols = 80
  const safeCols = [20, 60]

  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const x = i % cols
    const inSafeZone = x >= safeCols[0] && x <= safeCols[1]
    if (inSafeZone) return 0
    return Math.random() < 0.04 ? Math.floor(Math.random() * 4) + 1 : 0
  })

  const levels = [
    "bg-transparent",
    "bg-green-200",
    "bg-green-400",
    "bg-green-600",
    "bg-green-800",
  ]

  return (
    <div className="absolute inset-0 h-full w-full -z-10">
      <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div
        className="absolute inset-0 h-full w-full grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 24px)`,
          gridTemplateRows: `repeat(${rows}, 24px)`,
        }}
      >
        {cells.map((level, i) => (
          <div key={i} className={`${levels[level]} h-6 w-6`} />
        ))}
      </div>
    </div>
  )
}
