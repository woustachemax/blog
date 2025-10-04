import { getBlogPosts } from '@/lib/getBlogPosts';

export function RecentBlogs() {
    const blogPosts = getBlogPosts();

    return(
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 font-serif">
            <section id="recents" className="flex flex-col space-y-1 sm:space-y-1 text-left">
                <div className="px-4 py-2">
                    <h1 className="text-4xl sm:text-3xl font-bold text-green-200 font-serif mt-2 mb-2">
                        Recent Blogs:
                    </h1>
                    <ol className="list-decimal list-inside">
                        {blogPosts.map((blog, index) => (
                            <li key={blog.slug} className="text-gray-400 italic text-xl sm:text-lg">
                                <a href={`/${blog.slug}`}>
                                    <span className="underline hover:text-green-200">{blog.title}</span>
                                    {' -> '}
                                </a>
                                <span className="mx-1">({blog.date})</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    )
}