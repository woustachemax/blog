---
title: "Maybe The Gatekeepers Were Right"
date: "2026-03-04"
readingTime: "8 min"
---

I came across oat last week. 8KB. Zero dependencies. Shadcn like components. No Node.js garbage, no build step, no `npm install` prayer circle. Just drop in a CSS and JS file and build something decent. It was made by Dr. Kailash Nadh, CTO of Zerodha, and one of the people I genuinely look up to in tech. His whole *Why?* section reads like someone finally saying the quiet part loud, the JS ecosystem is a hot mess and we've all just been coping.

Reading that felt like a slap on the face. So when I sat down to redesign my portfolio (check it out at siddharththakkar.xyz), I made a call. No Framer Motion. Animations in Tailwind only. I spent 45 minutes in a fistfight with `transition` utilities wondering why I was suffering when `framer-motion` would've had this done in five. And the annoying part? I knew that the whole time. I just wanted to understand the vanilla way first. Turns out, that instinct might actually matter. A lot.

---

## The Slop Machine Problem

The uncomfortable thought I couldn't shake is that the entire JS/TS and Python ecosystem has made it criminally easy to write bloated software. `package.json` is basically a slop machine. Pull the handle, install whatever sounds right, and six months later you're maintaining a `node_modules` folder the size of a small country. And it's not just the weight of it. Nobody questions it anymore. Installing a 400KB library to format a date is a solved, acceptable thing. I never noticed this, and it's a shame.

In the AI era, it's worse. You can vibe code an entire app into existence without understanding a single line of it. The abstraction layers are so thick you could be floating 10 floors above the actual problem and not even know it. The code works, ships, and gets reviewed. Nobody asks what's underneath because nobody needs to. Until they do.

---

## The Elevator Only Goes Up

Bear with me here, it gets weird before it gets useful.

Imagine you're stranded on an island with a laptop and WiFi. You want to build a website from actual scratch. You'd start at assembly, work your way up to a high-level language, get to JavaScript, and eventually reach React. Each layer assumes the one below it works. You understand none of the layers you skipped. Every new framework is another floor up. And the elevator only goes up.

Abstractions exist for a reason. They're how we build complex things fast. The problem is we started treating the elevator as the only way to move. Nobody learns the stairs anymore. So when something breaks three floors down, everyone's standing around confused, calling it a "weird edge case," when really it's just physics.

---

## Why Going Back Down Actually Matters

Two reasons.

**The LLM moat nobody's talking about.** Legacy and lower-level technologies have way less training data for LLMs. The models are scary good at React. They've seen millions of components, millions of patterns. But ask them to write solid vanilla JS from scratch, or do something meaningful in C without reaching for a library, and you'll feel the hesitation real fast. That gap is a moat. Not a comfortable one, because it means doing harder things. But a real one, because fewer people will bother.

**Skills that don't deprecate.** Even if we eventually get enough lower-level code into training sets and the models close that gap, if you know how to build from the ground up, those skills transfer everywhere. You're not locked to a framework. You understand what the abstraction is hiding and why it made that trade-off. That knowledge compounds instead of expiring.

---

## The Scrappiness CS Gave Up

I'm an EE by degree. (The CS transition arc is a whole separate post.) But the thing that genuinely got me about Electronics was how scrappy the constraints were. Real hardware, real physics, limited resources. You couldn't install a library to fix a resistor. You had to actually know things, not because it was good for your career, but because the alternative was a circuit that didn't work.

CS gave up that scrappiness somewhere along the way. And I get why, abstraction is how we scaled. But I think we over-rotated. We went from "understand the tools you use" to "just use the tool" to "the tool is the skill." And now the AI writes the tool, so what exactly is left?

Maybe the people who told you to learn fundamentals before frameworks were onto something. Maybe the "just learn C before Python" gatekeepers were annoying and correct. (Doesn't mean they weren't also annoying.)

Going the vanilla route won't make you the fastest developer in the room. But when the AI writes all the React and nobody knows what's happening underneath, knowing what's happening underneath stops being a pedantic flex and starts being an actual job skill. That's the bet I'm making, anyway.

(No, I'm not switching to assembly. I'm not insane.)

---

**tl;dr** Found a lil' 8KB UI lib, got humbled by Tailwind transitions, spiraled into thinking lower-level knowledge is quietly becoming the most underrated skill in the AI era. The gatekeepers were annoying. They were also right.