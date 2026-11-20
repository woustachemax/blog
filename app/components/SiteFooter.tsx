import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="space-y-4 pt-8">
      <Separator />
      <div className="flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[rgb(var(--glitch-primary)/45%)]">
        <a
          href="https://www.siddharththakkar.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[rgb(var(--glitch-accent))] transition-colors"
        >
          siddharththakkar.xyz
        </a>
        <a
          href="https://glitchcn-ui.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[rgb(var(--glitch-accent))] transition-colors"
        >
          built with glitchcn/ui · glacier
        </a>
      </div>
    </footer>
  )
}
