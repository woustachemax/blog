import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
            <Link
                href="/"
                className="group flex items-center gap-3 text-emerald-500/40 hover:text-emerald-400 mb-20 transition-all duration-300 font-mono text-[10px] tracking-[0.3em] uppercase"
            >
                <span className="text-white/20 group-hover:text-emerald-500/40 transition-colors">01//</span>
                Return to Index
            </Link>

            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <aside className="lg:w-48 shrink-0 flex flex-col gap-8 lg:sticky lg:top-20 order-2 lg:order-1">
                    <div className="space-y-1">
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-emerald-500/30">Published</span>
                        <span className="block text-sm font-serif text-gray-400 italic">{data.date}</span>
                    </div>
                    <div className="space-y-1">
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-emerald-500/30">Length</span>
                        <span className="block text-sm font-serif text-gray-400 italic">{data.readingTime} Reading</span>
                    </div>
                    <div className="h-px w-8 bg-emerald-500/10" />
                </aside>

                <main className="flex-1 max-w-2xl order-1 lg:order-2">
                    <header className="mb-20">
                        <h1 className="text-3xl lg:text-4xl font-bold text-emerald-400 leading-[1.1] tracking-tight mb-4 font-serif">
                            {data.title}
                        </h1>
                    </header>

                    <article className="prose prose-invert max-w-none">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-3xl font-bold text-emerald-500/90 mt-20 mb-8 font-serif leading-tight">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-bold text-emerald-500/70 mt-16 mb-6 font-serif leading-tight">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold text-emerald-500/40 mt-12 mb-4 font-mono uppercase tracking-wider text-sm">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => <p className="text-gray-400 mb-10 leading-[1.8] text-lg font-serif">{children}</p>,
                                a: ({ children, href }) => <a href={href} className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8 hover:decoration-emerald-500 transition-all duration-300">{children}</a>,
                                ul: ({ children }) => <ul className="list-disc list-outside mb-10 text-gray-400 ml-6 space-y-4">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-outside mb-10 text-gray-400 ml-6 space-y-4">{children}</ol>,
                                li: ({ children }) => <li className="pl-2">{children}</li>,
                                code: ({ children, className }) => {
                                    const isInline = !className;
                                    return isInline ? (
                                        <code className="bg-emerald-500/5 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-[13px] border border-emerald-500/10">{children}</code>
                                    ) : (
                                        <div className="relative my-16 group">
                                            {/* Engineered Corner Accents */}
                                            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-emerald-500/30" />
                                            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-emerald-500/30" />
                                            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-emerald-500/30" />
                                            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-emerald-500/30" />

                                            <code className="relative block bg-[#080808] border border-white/5 text-gray-300 p-8 rounded-sm overflow-x-auto font-mono text-[13px] leading-[1.7]">
                                                {children}
                                            </code>

                                            {/* Subtitle/Label for Code Block */}
                                            <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/10 bg-white/[0.02] border-l border-b border-white/5 rounded-bl-sm">
                                                Code_Snippet
                                            </div>
                                        </div>
                                    );
                                },
                                pre: ({ children }) => <pre className="bg-transparent p-0 my-0">{children}</pre>,
                                strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                                hr: () => <div className="h-px w-full bg-emerald-500/5 my-20" />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>

                    <footer className="mt-40 pt-12 border-t border-white/5">
                        <Link
                            href="/"
                            className="group relative inline-flex items-center gap-4 text-rose-500/40 hover:text-rose-500 transition-all duration-300 font-mono text-[10px] tracking-[0.4em] uppercase"
                        >
                            <span>Terminate Journal Session</span>

                            <div className="fixed inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50">
                                <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(244,63,94,0.3)] ring-[32px] ring-rose-500/10 animate-pulse" />
                            </div>

                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] border border-rose-500/20 px-1 py-0.5 rounded-sm">
                                ERR_SIGTERM
                            </span>
                        </Link>
                    </footer>
                </main>
            </div>
        </div>
    );
}