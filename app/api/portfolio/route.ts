import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

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
  } catch {
    return NextResponse.json({ blogPosts: [] }, { headers: CORS_HEADERS })
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      try {
        const full = path.join(BLOG_DIR, file)
        const txt = await fs.readFile(full, "utf8")
        const { fm, content } = parseFrontmatter(txt)
        const title = fm.title ?? file.replace(/\.md$/, "")
        const pubDate = fm.date ?? fm.pubDate ?? null
        const slug = fm.slug ?? file.replace(/\.md$/, "")
        const link = `https://blog.siddharththakkar.xyz/${slug}`
        const description = extractDescription(fm, content)
        return { title, link, pubDate, description, slug }
      } catch {
        return null
      }
    })
  )

  const valid = posts.filter(Boolean) as Array<{
    title: string
    link: string
    pubDate: string | null
    description: string
    slug: string
  }>

  valid.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0
    return db - da
  })

  const top3 = valid.slice(0, 3).map(({ title, link, pubDate, description }) => ({
    title,
    link,
    pubDate,
    description,
  }))

  return NextResponse.json({ blogPosts: top3 }, { headers: CORS_HEADERS })
}
