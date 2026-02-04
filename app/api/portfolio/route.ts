import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const miniProjects = [
  {
    title: "DevBackup",
    description: "Cross-platform bash tool to backup and restore dev environments across computers",
    link: "https://github.com/woustachemax/dev-backup",
    tags: ["Bash", "CLI", "Typescript"],
  },
  {
    title: "Sinkronize",
    description:
      "Built a real-time collaboration platform enabling over 50 users to work on shared projects and communicate instantly, with secure backend and responsive design.",
    link: "https://github.com/woustachemax/sinkronize",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Socket.io", "Authentication"],
  },
]

const BLOG_DIR = path.join(process.cwd(), "blog")

function parseFrontmatter(md: string) {
  const fmMatch = md.match(/^---\s*\n([\s\S]*?)\n---/)
  const fm: Record<string, string> = {}
  if (!fmMatch) return { fm: {}, content: md }

  const fmRaw = fmMatch[1]
  fmRaw.split(/\n+/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(?:"([^"]*)"|'([^']*)'|(.*))$/)
    if (m) {
      const key = m[1]
      const val = m[2] ?? m[3] ?? m[4] ?? ""
      fm[key] = String(val).trim()
    }
  })

  const content = md.slice(fmMatch[0].length).trim()
  return { fm, content }
}

function extractDescription(fm: Record<string, string>, content: string) {
  if (fm.description) return fm.description

  const paragraphs = content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  let first = paragraphs[0] ?? ""

  first = first.replace(/!\[[^\]]*\]\([^\)]+\)/g, "")
  first = first.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
  first = first.replace(/`+/g, "")
  first = first.replace(/#+\s*/g, "")

  first = first.replace(/\s+/g, " ").trim()

  if (!first) return "Short summary of the post."

  const max = 160
  if (first.length <= max) return first
  return first.slice(0, max).trim() + "..."
}

export async function GET() {
  let files: string[] = []
  try {
    files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"))
  } catch (err) {
    return NextResponse.json({ miniProjects, blogPosts: [] })
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      try {
        const full = path.join(BLOG_DIR, file)
        const txt = await fs.readFile(full, "utf8")
        const { fm, content } = parseFrontmatter(txt)
        const title = fm.title ?? file.replace(/\.md$/, "")
        const pubDate = fm.date ?? fm.pubDate ?? null
        const link = fm.slug
          ? `https://blog.siddharththakkar.xyz/${fm.slug}`
          : `https://blog.siddharththakkar.xyz/${file.replace(/\.md$/, "")}`
        const description = extractDescription(fm, content)
        return { title, link, pubDate, description }
      } catch (e) {
        return null
      }
    })
  )

  const valid = posts.filter(Boolean) as Array<{ title: string; link: string; pubDate: string | null; description: string }>

  valid.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0
    return db - da
  })

  const top3 = valid.slice(0, 3).map((p) => ({ title: p.title, link: p.link, pubDate: p.pubDate, description: p.description }))

  return NextResponse.json({ miniProjects, blogPosts: top3 })
}
