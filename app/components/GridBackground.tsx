// Glitchcn-style backdrop: a faint grid drawn from the theme's --glitch-* colours,
// so it follows whatever theme is set. Kept dim on purpose.
export function GridBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[rgb(var(--glitch-surface))]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--glitch-border) / 7%) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--glitch-border) / 7%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgb(var(--glitch-surface))]" />
    </div>
  )
}
