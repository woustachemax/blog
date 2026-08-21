'use client'
export function Hero() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16">
      <section id="hero" className="flex flex-col space-y-8 text-left">
        <div className="space-y-2">
          <h1 className="text-5xl lg:text-6xl font-serif text-white tracking-tight cursor-pointer"
          >
            <span onClick={() => window.open('https://www.siddharththakkar.xyz/')}>Siddharth's</span> Blogs
          </h1>
          <p className="text-gray-500 font-serif italic text-lg opacity-80">
            Explore the 'why' behind I love building.
          </p>
        </div>

      </section>
    </div>
  )
}