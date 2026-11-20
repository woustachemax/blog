import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section id="hero" className="space-y-6 pt-16 sm:pt-24">
      <h1 className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[rgb(var(--glitch-primary))]">
        <a
          href="https://www.siddharththakkar.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[rgb(var(--glitch-border-hover))] transition-colors"
        >
          Siddharth&apos;s
        </a>{" "}
        <span className="whitespace-nowrap">
          Blogs
          <span className="ml-2 inline-block h-[0.7em] w-[0.4em] translate-y-[0.05em] bg-[rgb(var(--glitch-border)/70%)] animate-pulse" />
        </span>
      </h1>
      <p className="max-w-xl font-[family-name:var(--font-geist-sans)] text-base text-[rgb(var(--glitch-primary)/65%)]">
        Explore the &apos;why&apos; behind I love building.
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge>written by a human</Badge>
        <Badge>typos included</Badge>
      </div>
    </section>
  )
}
