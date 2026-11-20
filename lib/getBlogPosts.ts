import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  readingTime?: string;
  excerpt: string;
}

function excerptFrom(content: string, max = 180) {
  const first = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#')) ?? '';
  const plain = first.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*_]/g, '').replace(/\s+/g, ' ');
  return plain.length <= max ? plain : `${plain.slice(0, max).trimEnd()}...`;
}

export function getBlogPosts(): BlogPost[] {
  const blogsDirectory = path.join(process.cwd(), 'blog');
  const filenames = fs.readdirSync(blogsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        slug: data.slug || filename.replace('.md', ''),
        readingTime: data.readingTime,
        excerpt: excerptFrom(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
