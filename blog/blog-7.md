---
title: "I Built a Component Library That Looks Like a 1980s Terminal (And You Might Actually Use It)"
date: "2025-12-08"
readingTime: "6 min"
---

Hi there, I'm Siddharth. Last month, I was browsing through portfolios on Twitter, and I noticed something. Every single one looked the same. Same rounded corners, same pastel colors, same "modern minimalist" aesthetic that Apple made trendy in 2013. Don't get me wrong, that stuff looks clean. But it's boring. Everyone's building the same thing with the same components from the same libraries. So I thought, what if I built something that actually stood out? Something that made people stop scrolling and go "wait, what is that?" That's how GlitchCN/UI was born. A component library that looks like a terminal from 1985 but works like a modern React framework. And unlike DevBackup, people actually use this one.

---

## The Problem With Component Libraries

Let's be honest. Component libraries are everywhere. You've got shadcn/ui, Radix, Chakra, Material UI, and about fifty other options. They're all great. They're all functional. And they all make your app look exactly like everyone else's app. The thing is, most developers don't care about design. They just want something that works so they can focus on the actual functionality. That's fine. But if you're building a portfolio, a side project, or anything where you want to stand out, generic components kill your vibe. You end up looking like every other Next.js template on the internet.

I wanted something different. Not just "change the primary color" different, but "whoa, that's actually unique" different. I wanted components that felt like they came from a retro computer terminal. Glowing borders, scanline effects, monospace fonts, the whole cyberpunk aesthetic. But I also wanted them to be production-ready. No janky CSS hacks. No performance issues. Just solid components that happen to look like they're from Blade Runner.

---

## Why Terminals Are Cooler Than You Think

Before we had GUIs, we had terminals. Black screens with green text. No colors, no images, just raw text output. And honestly? They were cool. There's something about that aesthetic that just works. It's nostalgic for developers, it's immediately recognizable as "tech," and it has this mysterious hacker vibe that modern UIs completely lack.

The problem is, terminals are hard to use. Nobody wants to type commands to navigate your website. But what if you could capture that visual style without the usability problems? That's what GlitchCN does. You get the glowing cyan borders, the monospace fonts, the scanline effects, but you also get buttons you can click, forms you can fill out, and components that just work like any other React library.

Think about it. When you see a glowing border around a button, you know it's interactive. When you see monospace text, you know it's technical. The aesthetic does the heavy lifting for your brand identity without you having to explain what your app does. People see it and immediately understand "this is a developer tool" or "this is something tech-forward." That's powerful.

---

## Building It Was Harder Than I Expected

I started with shadcn/ui because it's the best component architecture out there. Copy-paste components into your project, full ownership, no external dependencies. Perfect. But shadcn components are designed to be neutral. They're meant to fit into any design system. I needed the opposite. I needed components that screamed "retro terminal" from the moment you saw them.

The first thing I tackled was the color scheme. I wanted dark teal backgrounds instead of pure black because black is too harsh. It causes eye strain and doesn't have the depth I wanted. I went with `#001a1a` to `#002626` for backgrounds, which gives this subtle green-blue tint that feels like an old CRT monitor. Then I added glowing cyan (`#00ffff`) and emerald (`#10b981`) accents for borders and highlights. These colors pop against the dark background without being blinding.

Next came the scanline effect. This was tricky because I wanted it to be subtle. Too obvious and it's distracting. Too subtle and nobody notices it. I ended up with a CSS animation that sweeps a semi-transparent white line across components every few seconds. It's just noticeable enough to add depth without pulling your attention away from the content. I used `@keyframes` and `background-image` gradients to achieve this, and it took way more tweaking than I expected to get the speed and opacity right.

The glowing borders were another challenge. CSS `box-shadow` works great for single glows, but I wanted layered glows that felt like neon lights. I stacked multiple shadows with different blur radii and opacity levels to create depth. On hover, the glow intensifies. It's a small detail, but it makes interactions feel alive. Every time you hover over a button, it responds like it's actually emitting light.

Typography was simpler. I used Bitcount Grid Single, a custom monospace font that looks like old computer displays. It's readable, it's consistent, and it immediately sets the tone. Every text element in GlitchCN uses this font by default, which creates a unified aesthetic across all components.

---

## Making It Actually Usable

The hard part wasn't making components look cool. The hard part was making them usable. Retro aesthetics are great until they hurt usability. Glowing text on dark backgrounds can cause eye strain if the contrast isn't right. Animations can be annoying if they're too frequent. Monospace fonts can be hard to read at small sizes.

I spent a ton of time on accessibility. Every component has proper ARIA labels. Keyboard navigation works on everything. Focus states are clear and visible. Color contrast ratios meet WCAG standards. I didn't want this to be a "looks cool but unusable" library. It had to be production-ready.

Performance was another concern. Scanline animations and glowing shadows can tank your frame rate if you're not careful. I used CSS transforms instead of position changes because transforms are GPU-accelerated. I kept animations simple and avoided unnecessary re-renders. I tested on slower devices to make sure nothing lagged. The result is a library that looks visually complex but performs just as well as any standard component library.

---

## The Components

GlitchCN has 15+ components so far. Buttons, cards, inputs, dialogs, tables, tabs, you name it. Each one has the signature glowing borders, dark teal backgrounds, and scanline effects. But they also have multiple variants because not every use case needs maximum glow.

The Button component has five variants: default (glowing cyan), secondary (muted), destructive (red for danger actions), outline (just the border), and ghost (minimal styling). This gives you flexibility without breaking the aesthetic. The Card component has headers, footers, and content sections that automatically align and space correctly. The Input component glows on focus, has smooth transitions, and works with labels and error states.

My favorite is the Command component. It's a keyboard-driven command palette that feels like you're typing into an actual terminal. Press Ctrl+K, start typing, and it filters through actions. It's built on top of cmdk, which handles all the hard parts like fuzzy search and keyboard navigation. I just styled it to look like a terminal prompt.

The Table component was the most challenging. Tables are inherently complex with rows, headers, sorting, and hover states. But I wanted it to feel like you're looking at data in a terminal. I added row hover effects that make each row glow slightly. I used fixed-width columns for that authentic terminal grid feel. And I made sure sorting icons and interactive elements were obvious without cluttering the design.

---

## Installation Is Dead Simple

This is where shadcn/ui really shines. You don't install GlitchCN as an npm package. You don't have a massive dependency in your `node_modules`. Instead, you use the shadcn CLI to copy components directly into your project.

First, you add the GlitchCN registry to your `components.json`:

```json
{
  "registries": {
    "@glitchcn": "https://glitchcn-ui.vercel.app/r/{name}.json"
  }
}
```

Then you install components:

```bash
npx shadcn@latest add @glitchcn/button
npx shadcn@latest add @glitchcn/card
```

Or install everything at once:

```bash
npx shadcn@latest add @glitchcn/all
```

The components get copied into your `components/ui` folder. Now you own the code. You can modify it, extend it, or completely change it. There's no version lock-in, no breaking updates, no waiting for maintainers to fix bugs. It's just code in your project that you control.

---

## People Actually Use It

Unlike DevBackup, GlitchCN has users. I posted it on Twitter and got way more traction than I expected. Developers reached out saying they used it for portfolios, side projects, and even client work. One guy built an entire SaaS dashboard with it. Another person used it for a command-line game interface. A designer asked if they could use the aesthetic for a Figma template.

The feedback was overwhelmingly positive. People appreciated that it wasn't just another "Material Design clone" or "Tailwind component dump." It had personality. It stood out. And it worked. Nobody complained about performance. Nobody said it was too hard to customize. They just used it and built cool stuff.

I think the reason it worked is because it solves a real problem. Not a technical problem, but a design problem. Most developers aren't designers. They don't know how to make their apps look unique. GlitchCN gives them a ready-made aesthetic that actually looks good without requiring design skills. You install the components, use them in your app, and suddenly your project looks way cooler than it did five minutes ago.

---

## What I Learned

Building GlitchCN taught me that design isn't just about making things pretty. It's about identity. When someone sees your app, they should immediately understand what it's about. A banking app should feel secure and professional. A creative tool should feel expressive and fun. A developer tool should feel technical and powerful. Design communicates this instantly, before anyone reads a single word.

I also learned that constraints breed creativity. I limited myself to dark teal, cyan, and emerald. I committed to monospace fonts and glowing borders. These constraints forced me to get creative within those boundaries. The result is a cohesive design system that feels intentional, not random.

And I learned that open source works when you solve real problems. DevBackup didn't get traction because the problem wasn't painful enough. GlitchCN got traction because developers genuinely struggled with making their apps look unique. Solve real problems, and people will use your stuff.

---

## Try It Out

If you want to make your Next.js app look like a terminal from the future, check out [GlitchCN/UI](https://glitchcn-ui.vercel.app). The docs have examples, code snippets, and live previews of every component. Installation takes two minutes. Customization is easy because it's just code in your project.

The repo is on [GitHub](https://github.com/woustachemax/glitchcn-ui) if you want to contribute or report issues. And if you build something cool with it, tag me on Twitter. I'd love to see what you make.

---

## Go Build Something

You didn't think you'd become a design expert just by reading this, right? The real learning happens when you install GlitchCN, drop some components into a project, and start building. Because no great interface ever started with just reading.

(Thanks for reading this. Even if you stick with boring rounded corners.)