import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
}

export function getBlogPosts(): BlogPost[] {
  const blogsDirectory = path.join(process.cwd(), 'blog');
  const filenames = fs.readdirSync(blogsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        slug: data.slug || filename.replace('.md', '')
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}