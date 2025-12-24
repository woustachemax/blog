---
title: "I Built a Landing Page Generator That Yells at People"
date: "2025-12-24"
readingTime: "8 min"
---

Hi there, I'm Siddharth. You know what's annoying? People who spend three weeks researching the perfect tech stack instead of just building something. "Should I use React or Vue? TypeScript or JavaScript? Tailwind or styled-components?" Just pick one and start coding. But they don't. They read seventeen blog posts, watch four YouTube tutorials, ask on Twitter, and still haven't written a single line of code.

So I built a tool that generates landing pages that literally yell at these people. It's called "Just Fucking Use Anything" and it scrapes any product URL, feeds it to an AI, and spits out an aggressive landing page in the style of justfuckinguse[product].com. Because sometimes people need to be told to stop overthinking and just ship.

---

## The Inspiration Was Everywhere

If you've been on developer Twitter (or X, whatever we're calling it now), you've seen the "justfuckinguse" pages. justfuckingusehtml.com. justfuckingusereact.com. justfuckingusecss.com. They're all the same vibe: black background, bold typography, aggressive copy that tells you to stop being indecisive and just use the damn tool.

I loved the concept. It's the antidote to analysis paralysis. But there were only like six of these pages, one for each popular framework. What about all the other tools? What about QuackStack? Or any random SaaS product someone's building? They all deserve their own aggressive landing page.

Then I realized: I could automate this. Scrape any product website, extract the key info, throw it at an AI with a prompt that says "be aggressive and impatient," and generate a landing page in that style. The AI does the writing, I just provide the template and the attitude.

---

## The Tech Stack (Because You Asked)

This is a Next.js app. Why Next.js? Because it has API routes built in, so I can handle the scraping and AI generation on the backend without spinning up a separate server. Also, Vercel deployment is literally one command. That's it. That's the entire justification.

For scraping, I used Cheerio because it's fast and doesn't require spinning up a headless browser like Puppeteer. Most product websites are static HTML anyway, so Cheerio works fine. For AI generation, I used Gemini because it has a free tier and the API is stupid simple. OpenAI would work too, but I didn't want to pay for it while building the prototype.

The frontend is React with Tailwind because that's what I know and I built this in an afternoon. No fancy state management. Just `useState` and `fetch`. Keep it simple.

---

## Scraping Websites Is Harder Than It Looks

I thought scraping would be easy. "Just fetch the HTML and parse it, how hard can that be?" Turns out, pretty hard.

First, some websites block requests that don't have a proper User-Agent header. If you just do a raw `fetch()`, you get a 403 Forbidden. So you have to pretend to be a browser by adding headers:

```javascript
fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  }
})
```

Second, not all URLs return HTML. Some return JSON. Some return binary data. Some redirect to a login page. You have to check the `Content-Type` header to make sure you're actually getting HTML:

```javascript
const contentType = response.headers.get('content-type')
if (!contentType || !contentType.includes('text/html')) {
  throw new Error('URL does not return HTML content')
}
```

Third, once you have the HTML, you need to extract the useful parts. Websites are full of navigation bars, footers, cookie banners, and JavaScript that you don't need. I used Cheerio to strip out all the `<script>` and `<style>` tags, then grabbed the title, meta description, headings, and first few paragraphs of body text. That gives the AI enough context to understand what the product does without sending it 50KB of HTML.

The tricky part was finding code examples. Some product sites have code snippets in `<pre>` or `<code>` tags. Some don't. I extract them if they exist, but if the site doesn't have any code examples, the AI just skips that section. This means the generated pages are hit-or-miss depending on how well-structured the source website is. But that's fine. Perfect is the enemy of done.

---

## Writing the AI Prompt Was the Hard Part

The actual scraping code took maybe an hour. The AI prompt took way longer because getting the right tone is hard. I wanted aggressive, impatient, frustrated, but not mean. There's a difference between "stop overthinking it, just use this tool" and "you're an idiot for not using this tool." The former is motivating. The latter is just rude.

Here's the prompt I ended up with:

```
You are a brutally honest, no-nonsense tech writer creating a "justfuckinguse[product]" page.

Create a short, aggressive article (300-500 words max) that:
1. Opens with "Stop overthinking it. Just fucking use [Product]."
2. Explains what it is in ONE sentence
3. Lists 3-5 key reasons to use it (short, punchy bullet points)
4. Shows ONE code example or getting started command if available
5. Ends with "Stop reading. Start building. [URL]"

Style: Aggressive, impatient, frustrated with people who overcomplicate things. Short sentences. No fluff.
```

The key was constraining the output. Without the word limit, Gemini would generate a 2000-word essay. With the structure, it stays focused. The style instructions help, but honestly, the model still sometimes sounds too polite. I had to iterate a few times to get it consistently aggressive.

I also added formatting instructions because the AI would randomly decide to use markdown headers or bullet points inconsistently. Now I explicitly tell it to use `**text**` for bold and `-` for bullet points, then I convert those to HTML tags in post-processing. This way the output is consistent even if the model decides to be creative.

---

## The UI Is Brutalist on Purpose

The design is intentionally harsh. Black background, white text, monospace font, no rounded corners, no gradients, no soft shadows. Just raw, aggressive design that matches the tone of the content.

I added a noise texture overlay because plain black looks boring. The noise is just an SVG filter with `feTurbulence` set to a low opacity. It gives the page a grainy, printed feel without being distracting. This is a trick I learned from brutalist web design: texture adds character without breaking minimalism.

The form is as simple as possible. Two inputs, one button. No fancy validation, no loading spinners (actually, I added a loading spinner later because people kept clicking the button multiple times thinking it didn't work). The generated page displays in an iframe so you can preview it before downloading.

The download button is the most important feature. It saves the generated HTML as a standalone file with zero dependencies. No external stylesheets, no JavaScript libraries, just one HTML file with inline CSS. You can host it anywhere. Throw it on Netlify, upload it to S3, whatever. It just works.

---

## Generating Standalone HTML Files

This was surprisingly tricky. Modern web development assumes you're using a build system. Everything is componentized, styles are in separate files, there are CDN imports everywhere. But I wanted the output to be a single HTML file that you can open in a browser and it just works.

So the `createHTML()` function takes the AI-generated article, wraps it in a full HTML document with inline styles, and returns it as a string. The fonts are imported from Google Fonts, so there's one external dependency, but other than that it's completely self-contained.

The tricky part was converting the AI's markdown-style formatting into HTML. Gemini returns text with `**bold**` and `*italics*` and bullet points starting with `-`. I wrote a parser that walks through the text line by line, detects what type of content it is (paragraph, list item, code block), and wraps it in the appropriate HTML tags.

Code blocks were the hardest because sometimes the AI includes ` ```bash ` markers and sometimes it doesn't. Sometimes it starts commands with `$` and sometimes it doesn't. I ended up just checking if a line starts with common command prefixes like `npm`, `pip`, `docker`, or `git`, and if it does, wrap it in `<pre><code>`. It's not perfect, but it works most of the time.

---

## Why This Exists

Honestly? Because I thought it would be funny. The "justfuckinguse" pages make me laugh every time I read them. The aggressive tone is so over-the-top that it wraps around to being helpful. When you're stuck in analysis paralysis, sometimes you just need someone to yell at you to pick a tool and move on.

But also, I wanted to learn how to integrate web scraping with AI generation. I'd used OpenAI's API before, but always for simple text generation. Never for extracting structured data from messy HTML and turning it into a formatted article. This project forced me to think about how to clean data, write effective prompts, and handle edge cases when the input is unpredictable.

And I wanted to build something I could actually use. I've got a dozen side projects, and every single one needs a landing page. Do I want to spend three hours writing aggressive copy for each one? No. Do I want to click a button and get it auto-generated? Yes. So now I have that.

---

## The Limitations Are Obvious

This tool only works if the source website has good information. If you give it a barebones landing page with no content, the AI has nothing to work with. It'll generate something generic and useless. Garbage in, garbage out.

It also doesn't handle dynamic content. If the product info is loaded via JavaScript after the page renders, Cheerio won't see it because it's not a real browser. I'd need to use Puppeteer or Playwright to scrape JavaScript-heavy sites, but that's slower and more expensive to run. For now, I'm just accepting that some sites won't work.

The AI-generated copy is hit-or-miss. Sometimes it nails the tone perfectly. Sometimes it sounds like a corporate blog post trying to be edgy. I could fine-tune the prompt more, but at some point, you just accept that AI isn't perfect and move on. The user can always edit the HTML after downloading it.

And obviously, this tool generates pages that are intentionally aggressive. Not every product needs that tone. If you're building a meditation app or a healthcare platform, "just fucking use it" probably isn't the right messaging. But for dev tools and SaaS products aimed at technical audiences? It works.

---

## Real Talk About AI-Generated Content

I used AI to generate the landing page copy, and I'm not ashamed of it. Some people think using AI for content creation is cheating or lazy. I think it's just a tool. You still need to understand what you're building, write a good prompt, and refine the output. The AI doesn't magically know what your product does or who your audience is. You have to give it that context.

The way I see it, AI is like a junior writer. It can draft content quickly, but you still need to review it, edit it, and make sure it makes sense. Would I ship AI-generated copy directly to production without reading it? Hell no. But would I use it to get a first draft in 30 seconds instead of staring at a blank page for an hour? Absolutely.

This project taught me that the hard part isn't the AI generation. It's everything around it. Scraping the data. Cleaning the input. Writing a prompt that consistently produces good output. Handling errors when the AI returns garbage. Post-processing the output to format it correctly. The AI is maybe 20% of the work. The other 80% is engineering.

---

## Just Fucking Use It!

The tool is live at [justfuckinguseanything.vercel.app](https://justfuckinguseanything.vercel.app/). Paste in any product URL, click generate, and see what happens. If it breaks, it's probably because the website you chose has weird HTML or blocks scraping. Try a different URL.

The code is on GitHub at [github.com/woustachemax/justfuckinguseanything](https://github.com/woustachemax/justfuckinguseanything). It's MIT licensed, so clone it, modify it, break it, fix it, whatever. I built this in an afternoon and I'm not maintaining it beyond fixing critical bugs. If you want a feature, submit a PR.

To run it locally:
```bash
pnpm install
```

Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_key_here
```

Start the dev server:
```bash
pnpm dev
```

That's it. No complex setup. No database. No authentication. Just a simple web scraper + AI wrapper.

---

## What I Learned

I learned that web scraping is 90% edge case handling. Every website is structured differently, and there's no universal way to extract the "important" content. You just grab what you can and hope it's enough.

I learned that AI prompts need constraints. Without strict formatting rules and word limits, the output is unpredictable. With them, it's still unpredictable, but at least it's consistently unpredictable.

I learned that brutalist design is fun. No fancy animations, no gradients, no component libraries. Just HTML, CSS, and attitude. It forces you to focus on typography and layout instead of hiding bad design behind visual effects.

And I learned that the best projects are the ones you build because they make you laugh. I don't know if anyone will actually use this tool. I don't care. I built it because the idea was funny, and that was reason enough.

---

## Go Build Something Stupid

Not every project has to be a startup. Not every side project has to solve a real problem or make money. Sometimes you just build something because it's funny, or because you want to learn a specific technology, or because you're bored on a Saturday afternoon.

This was one of those projects. I built it in a few hours, learned some new stuff about web scraping and AI integration, and now it exists on the internet. Will it change the world? No. Did I have fun building it? Yes. That's enough.

So go build something stupid. Build a landing page generator that yells at people. Build a tool that turns GitHub READMEs into haikus. Build a VS Code extension that insults your code. Whatever. Just build something.

Because the only way to get better at building is to build. And the only way to have fun building is to stop taking it so seriously.

---

(If you're reading this, thanks. If you actually tried the tool, double thanks. If you starred the repo on GitHub, we're basically best friends now.)