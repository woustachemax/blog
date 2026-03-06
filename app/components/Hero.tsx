'use client'
export function Hero() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 pt-32 pb-16">
      <section id="hero" className="flex flex-col space-y-8 text-left">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-500/40">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Status: Online</span>
          <span className="text-white/10">/</span>
          <span>Journal_v1.0.4</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl lg:text-6xl font-serif text-white tracking-tight cursor-pointer"
            onClick={() => window.open('https://www.siddharththakkar.xyz/')}
          >
            Siddharth Thakkar
          </h1>
          <p className="text-gray-500 font-serif italic text-lg opacity-80">
            Explore the 'why' behind I love building.
          </p>
        </div>

        <div className="h-px w-12 bg-emerald-500/20" />
      </section>
    </div>
  )
}