---
title: "I Built an AI Intern That Actually Works (No, Really)"
date: "2025-11-09"
readingTime: "9 min"
---

Hi there, I'm Siddharth. Remember that blog I wrote about vector embeddings? The one where I was basically like "I felt dumb about this Twitter buzzword so I learned it and made a thing"? Yeah, that thing just became way more useful than I expected. Let me tell you about QuackStack and why you should probably use it (or at least why I use it every day now).

---

## The Problem I Keep Having

I context switch constantly. Like, way too much. I'll be deep in one project, someone pings me about something else, and suddenly I'm staring at code I wrote three months ago thinking "what the hell was I doing here?" Or worse, it's code someone else wrote and now I need to understand it immediately because production is broken and users are mad.

You know what I'd do? Open the codebase, grep around for random keywords, read through a bunch of files hoping something clicks, maybe throw some code at ChatGPT like "explain this function please." It worked, sure, but it was annoying. And then I started using Cursor and Windsurf, and I'd have to manually feed them context about the project every single time I started a new chat. Like, "hey this is what my project does, here's the folder structure, this is how auth works" and on and on.

I kept thinking: what if my AI coding tools just knew about my codebase already? Like actually understood the whole thing without me having to explain it constantly?

---

## QuackStack: Your Cracked Unpaid Intern

So I built QuackStack. It's a CLI tool that indexes your entire codebase locally, generates embeddings (which is basically fancy math that turns code into meaning, read my other blog if you want the deep dive), stores everything in a database, and lets you ask questions about your code conversationally. But here's the actually cool part: it auto-generates context files for every major AI coding assistant.

You run `quack --context` once and it creates:
- `.cursorrules` for Cursor
- `.windsurfrules` for Windsurf  
- `.clinerules` for Cline
- `.continue/context.md` for Continue
- `.aider.conf.yml` for Aider

Your AI tools automatically read these files. No more copy pasting project context. No more "okay so let me explain what this codebase does" every time you start a conversation. They just know. It's beautiful.

---

## Why Local Embeddings Changed Everything

In my original blog, I talked about using OpenAI's embedding API. That was fine for learning, but it had two massive problems:

1. **Privacy**: Your code literally gets sent to OpenAI to generate embeddings
2. **Cost**: Indexing a large codebase costs actual money

The new version? **100% local embeddings**. I integrated a local embedding model that runs on your machine. Zero API calls for indexing. Your code never leaves your computer. And it's completely free.

The only time you need an API key is when you actually ask questions and want conversational answers. And even then, you're only sending your query and the relevant code snippets, not your entire codebase. You can use OpenAI, Claude, Gemini (which has a free tier!), DeepSeek, or Mistral. Whatever you want.

This was huge. Privacy-conscious developers who wouldn't touch the old version are using it now. Companies with strict security policies can actually adopt it. I didn't expect this to be the killer feature but here we are.

---

## The Interactive REPL Nobody Asked For (But Everyone Uses)

I added an interactive mode because I got tired of the friction of running a command, getting an answer, then having to run another command to ask a follow-up question. Now you just type `quack` and it drops you into a conversational interface.

```
$ quack
Welcome to QuackStack! 🐥
🔍 Indexing your codebase...
✅ Indexing complete!

🐥 Quack! How can I help? > where is the authentication logic?

The authentication logic is in src/auth/handler.ts. It uses JWT tokens
with a 24-hour expiration. Refresh tokens are stored in Redis.

💡 Want more details? (y/n) > y

📚 Relevant Code:
[1] src/auth/handler.ts (relevance: 92.1%)
...

🐥 Quack! How can I help? > how does token refresh work?
```

It just stays open. You ask questions, it answers, you ask follow-ups, it gives you more context. Press Ctrl+C when you're done. That's it.

---

## Watch Mode: Set It and Forget It

This one's my favorite feature and I don't even know why I built it originally, I was just annoyed. You run `quack --watch` in your project directory and it watches for file changes. Every time you save a file, it re-indexes the changed files and regenerates all your AI tool context files automatically.

Start it once in a background terminal:
```bash
quack --watch &
```

Now your AI coding assistants always have up-to-date context about your project. You're working on a new feature? They know about it. Refactored something? Context updates automatically. It's like having a teammate whose only job is keeping everyone synced on what the codebase looks like. Except this teammate never complains and works for free.

---

## Real Use Cases I Didn't Expect

People are using QuackStack in ways I genuinely didn't plan for and it's wild:

**Onboarding new developers**: Instead of dumping a 50-page README on them (that they won't read anyway, let's be honest), just tell them to run `quack` and ask questions. "How does the payment flow work?" "Where do we handle errors?" They get answers immediately.

**Code archaeology**: Finding where something is implemented without grepping through thousands of files. "Where do we validate user emails?" Boom, answer. No more spending 20 minutes tracking down a single function.

**Documentation generation**: Some teams are using QuackStack to auto-generate explanations of how their systems work. Ask it questions, save the answers, turn them into docs. Is it cheating? Maybe. Does it work? Absolutely.

**Context for AI pair programming**: This was the big one. Give Cursor or Windsurf persistent context about your codebase and watch how much better their suggestions get. They actually understand your project structure, naming conventions, and patterns. It's like they finally get what you're trying to build.

---

## The Technical Stuff (For the Nerds)

Under the hood, QuackStack does this:
1. Scans your project (ignoring node_modules, .git, all the usual suspects)
2. Uses AST parsing to extract functions and classes
3. Chunks code intelligently (not just splitting at random line numbers)
4. Generates embeddings locally using transformers.js
5. Stores everything in PostgreSQL with vector similarity support
6. Uses cosine similarity to find relevant code when you query
7. Feeds context to your chosen AI provider for conversational answers

Supports 15+ languages: JavaScript, TypeScript, Python, Go, Rust, Java, C/C++, C#, Ruby, PHP, Swift, Kotlin, and more. If I missed your favorite language, open an issue on GitHub and I'll probably add it.

---

## Why I'm Actually Proud of This

I started QuackStack as a learning project. "Let me understand vector embeddings by building something." Classic developer move, right? But somewhere along the way it became a tool I actually use every single day. And other developers are using it too, which is honestly kind of insane to me.

The best part? It's MIT licensed and fully open source. No accounts, no subscriptions, no vendor lock-in, none of that nonsense. Clone the repo, run it locally, modify it however you want. Your code, your infrastructure, your control. The way it should be.

---

## Try It Out

Installation is literally one command:
```bash
npm install -g quackstack
```

Set up your environment (this is the only "config" you need):
```bash
# Database (required)
QUACKSTACK_DATABASE_URL=postgresql://...

# AI provider for answers (pick one)
QUACKSTACK_OPENAI_KEY=sk-...
# or QUACKSTACK_GEMINI_KEY (has free tier!)
# or QUACKSTACK_ANTHROPIC_KEY
# or QUACKSTACK_DEEPSEEK_KEY
# or QUACKSTACK_MISTRAL_KEY
```

Run it:
```bash
quack
```

That's it. No complex setup, no configuration files, no 30-minute tutorial. It just works. (And if it doesn't, open an issue and I'll fix it, probably.)

---

## What's Next

I'm working on a VS Code extension so you don't even need to leave your editor. Also exploring team collaboration features, imagine your whole team sharing a QuackStack knowledge base about your codebase. That could be cool, or it could be a nightmare. We'll find out.

There's a live demo at [quackstack.siddharththakkar.xyz](https://quackstack.siddharththakkar.xyz/) if you want to see it in action without installing anything.

The GitHub repo is at [github.com/woustachemax/quackstack](https://github.com/woustachemax/quackstack). Star it if you think it's cool. Open issues if something breaks (it probably will at some point, that's software). Submit PRs if you want to make it better.

---

## Final Thoughts

I learned vector embeddings because I was tired of feeling dumb about a buzzword on Twitter. I built QuackStack to understand how semantic search actually works. But what I ended up building was a tool that solves a real problem: context switching sucks, and AI coding assistants are only as good as the context you give them.

QuackStack fixes both. And it's free, open source, and runs entirely on your machine.

So yeah, go try it. Let me know what breaks. Tell me what features you want. Build something cool with it. Or don't, I'm not your boss.

But seriously, if you're constantly switching between projects or using AI coding tools, you should probably try QuackStack. It'll save you time, and time is the only thing we can't get back (wow, that got deep, sorry).

---

## Go Build Something

You didn't think you'd become an expert just by reading a blog, right? The real learning happens when you try things out, break stuff, fix it, and figure out what works. So go install QuackStack, run it on your messiest project, and see what happens. Because no great project ever started with just reading.

(And if you're one of my 4 readers, thanks for making it this far. Mom, Dad, I love you. Fourth person, whoever you are, you're a real one.)