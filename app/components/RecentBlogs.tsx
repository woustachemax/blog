import { getBlogPosts } from '@/lib/getBlogPosts';

export function RecentBlogs() {
    const blogPosts = getBlogPosts();

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-20">
            <section id="recents" className="flex flex-col space-y-24 text-left">
                <div className="space-y-16">
                    {blogPosts.map((blog, index) => (
                        <div key={blog.slug} className="group relative">
                            <a href={`/${blog.slug}`} className="block space-y-4">
                                <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-500/30">
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    <div className="w-4 h-px bg-current" />
                                    <span>Log Entry</span>
                                </div>
                                <div className="flex justify-between items-baseline gap-8">
                                    <h3 className="text-xl lg:text-2xl font-serif text-white group-hover:text-emerald-400 transition-all duration-500 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-white/5 group-hover:text-emerald-400 group-hover:font-bold transition-all duration-500 whitespace-nowrap tabular-nums tracking-[0.2em] uppercase">
                                        [{blog.date}]
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}