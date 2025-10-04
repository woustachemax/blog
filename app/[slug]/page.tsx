import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ params }: { params: { slug: string } }) {
    const filePath = path.join(process.cwd(), 'blog', `${params.slug}.md`);
    
    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-serif">
            <h1 className="text-4xl font-bold mb-4 sm:text-3xl text-green-200">{data.title}</h1>
            <div className='flex gap-4 text-gray-400 mb-8'>
               <div>Published On: {data.date}</div>
                <div>Reading Time: {data.readingTime}</div>
            </div>
            <div>
                <ReactMarkdown
                    components={{
                        h1: ({children}) => <h1 className="text-3xl font-bold text-green-200 mt-8 mb-4">{children}</h1>,
                        h2: ({children}) => <h2 className="text-2xl font-bold text-green-300 mt-6 mb-3">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-semibold text-green-400 mt-4 mb-2">{children}</h3>,
                        p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed text-lg">{children}</p>,
                        a: ({children, href}) => <a href={href} className="text-green-400 underline hover:text-green-200">{children}</a>,
                        ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-300 ml-4">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-gray-300 ml-4">{children}</ol>,
                        li: ({children}) => <li className="mb-2">{children}</li>,
                        code: ({children, className}) => {
                            const isInline = !className;
                            return isInline ? (
                                <code className="bg-gray-800 text-green-300 px-2 py-1 rounded text-sm font-mono">{children}</code>
                            ) : (
                                <code className="block bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto my-4 font-mono">{children}</code>
                            );
                        },
                        pre: ({children}) => <pre className="my-4">{children}</pre>,
                        strong: ({children}) => <strong className="text-green-200 font-bold">{children}</strong>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}