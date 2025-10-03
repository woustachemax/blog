const jsonData = [
    {"title": "Understanding is just the beginning",
        "date": "2025-06-02",
        "link": "/blogOne"
    }]

export function RecentBlogs() {
    return(
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 font-serif">
            <section id="recents" className="flex flex-col space-y-1 sm:space-y-1 text-left">
                  <div className="  px-4 py-2 ">
                    <h1 className="text-4xl sm:text-3xl font-bold text-green-200 font-serif mt-2 mb-2">
                    Recent Blogs:
                    </h1>
                    <ol className="list-decimal list-inside">
                    {jsonData.map((blog, index)=>(
                        <li key={index} className="text-gray-400 italic  text-xl sm:text-lg">
                             <a href={blog.link}>
                                <span className="underline hover:text-green-200">{blog.title} </span>
                                -&gt;
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