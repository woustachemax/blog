import { getBlogPosts } from '@/lib/getBlogPosts';

export function RecentBlogs() {
    const blogPosts = getBlogPosts();

    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-20">
            <section id="recents" className="flex flex-col space-y-24 text-left">
                <div className="space-y-16">
                    {blogPosts.map((blog, index) => (
                        <div key={blog.slug} className="group relative">
                            <a href={`/${blog.slug}`} className="block space-y-4">
                                <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-200/20">
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-8">
                                    <h3 className="text-xl lg:text-2xl font-serif text-white group-hover:text-emerald-400 transition-all duration-500 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-white/5 group-hover:text-emerald-400 group-hover:font-bold transition-all duration-500 whitespace-nowrap tabular-nums tracking-[0.2em] uppercase shrink-0">
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