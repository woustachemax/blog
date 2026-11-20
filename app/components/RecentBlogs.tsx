import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/getBlogPosts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RecentBlogs() {
  const blogPosts = getBlogPosts();

  return (
    <section id="recents" className="space-y-4">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-[rgb(var(--glitch-primary)/50%)]">
        <span>$ ls ./posts</span>
        <span>{String(blogPosts.length).padStart(2, '0')} entries</span>
      </div>

      <div className="space-y-4">
        {blogPosts.map((blog, index) => (
          <Link key={blog.slug} href={`/${blog.slug}`} className="group block">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[rgb(var(--glitch-primary)/45%)]">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div className="flex gap-2">
                    <Badge>{blog.date}</Badge>
                    {blog.readingTime && <Badge>{blog.readingTime}</Badge>}
                  </div>
                </div>
                <CardTitle className="flex items-start justify-between gap-4 font-mono font-normal text-2xl sm:text-3xl text-[rgb(var(--glitch-primary))] group-hover:text-[rgb(var(--glitch-border-hover))] transition-colors">
                  {blog.title}
                  <ArrowUpRight className="mt-1 shrink-0 text-[rgb(var(--glitch-accent)/60%)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[rgb(var(--glitch-accent))]" size={20} />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="font-[family-name:var(--font-geist-sans)] text-[15px] leading-relaxed text-[rgb(var(--glitch-primary)/65%)]">
                  {blog.excerpt}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
