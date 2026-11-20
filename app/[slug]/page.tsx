import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GridBackground } from '../components/GridBackground';
import { SiteFooter } from '../components/SiteFooter';

const reading = 'font-[family-name:var(--font-geist-sans)] max-w-[62ch]';

function textOf(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(textOf).join('');
    return '';
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Only plain slugs map to files, so a crafted slug can't read outside ./blog.
    if (!/^[a-z0-9-]+$/i.test(slug)) notFound();
    const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 space-y-8">
            <GridBackground />

            <Button size="sm" asChild>
                <Link href="/">
                    <ArrowLeft size={14} /> All posts
                </Link>
            </Button>

            <Card>
                <CardHeader className="space-y-4 py-6 sm:px-8">
                    <div className="flex flex-wrap gap-2">
                        <Badge><CalendarDays size={10} /> {data.date}</Badge>
                        {data.readingTime && <Badge><Clock size={10} /> {data.readingTime}</Badge>}
                    </div>
                    <h1 className="font-mono text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-[rgb(var(--glitch-primary))]">
                        {data.title}
                    </h1>
                </CardHeader>

                <CardContent className="py-8 sm:px-8">
                    <article className={reading}>
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h2 className="font-mono text-3xl font-bold text-[rgb(var(--glitch-primary))] mt-12 mb-6">{children}</h2>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="font-mono text-2xl font-bold text-[rgb(var(--glitch-border-hover))] mt-12 mb-5">
                                        <span className="text-[rgb(var(--glitch-accent))]">## </span>
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[rgb(var(--glitch-accent))] mt-10 mb-4">{children}</h3>
                                ),
                                p: ({ children }) => {
                                    // A "tl;dr" paragraph gets pulled out as a callout.
                                    if (/^tl;dr/i.test(textOf(children).trim())) {
                                        return (
                                            <div className="relative my-10 border border-[rgb(var(--glitch-border)/35%)] p-5">
                                                <span className="absolute -top-2.5 left-4 bg-[rgb(var(--glitch-surface))] px-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[rgb(var(--glitch-primary)/55%)]">
                                                    summary
                                                </span>
                                                <p className="text-[17px] leading-[1.75] text-[rgb(var(--glitch-primary)/85%)]">{children}</p>
                                            </div>
                                        );
                                    }
                                    return <p className="mb-6 text-[17px] leading-[1.75] text-[rgb(var(--glitch-primary)/80%)]">{children}</p>;
                                },
                                a: ({ children, href }) => (
                                    <a href={href} className="text-[rgb(var(--glitch-border-hover))] underline decoration-[rgb(var(--glitch-border)/40%)] underline-offset-4 hover:decoration-[rgb(var(--glitch-accent))] hover:text-[rgb(var(--glitch-accent))] transition-colors">
                                        {children}
                                    </a>
                                ),
                                ul: ({ children }) => <ul className="list-disc list-outside mb-7 ml-6 space-y-2 text-[rgb(var(--glitch-primary)/85%)] marker:text-[rgb(var(--glitch-accent))]">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-outside mb-7 ml-6 space-y-2 text-[rgb(var(--glitch-primary)/85%)] marker:text-[rgb(var(--glitch-accent))]">{children}</ol>,
                                li: ({ children }) => <li className="pl-1 leading-[1.8]">{children}</li>,
                                code: ({ children, className }) => {
                                    const isInline = !className;
                                    return isInline ? (
                                        <code className="px-1.5 py-0.5 text-[13px] text-[rgb(var(--glitch-border-hover))] bg-[rgb(var(--glitch-border)/10%)] border border-[rgb(var(--glitch-border)/25%)]">{children}</code>
                                    ) : (
                                        <code className="block overflow-x-auto p-5 text-[13px] leading-[1.7] text-[rgb(var(--glitch-primary)/90%)]">{children}</code>
                                    );
                                },
                                pre: ({ children }) => (
                                    <div className="my-8 border border-[rgb(var(--glitch-border)/35%)] bg-[rgb(var(--glitch-surface-hover)/60%)]">
                                        <div className="border-b border-[rgb(var(--glitch-border)/25%)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[rgb(var(--glitch-primary)/45%)]">code</div>
                                        <pre className="m-0">{children}</pre>
                                    </div>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="my-8 border-l-2 border-[rgb(var(--glitch-accent))] pl-5 italic text-[rgb(var(--glitch-primary)/75%)]">{children}</blockquote>
                                ),
                                strong: ({ children }) => <strong className="font-bold text-[rgb(var(--glitch-primary))]">{children}</strong>,
                                hr: () => <Separator className="my-12" />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>
                </CardContent>
            </Card>

            <SiteFooter />
        </div>
    );
}
