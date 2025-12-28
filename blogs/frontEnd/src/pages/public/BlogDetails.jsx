import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import parse from 'html-react-parser';

const BlogDetails = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${slug}`);
                setBlog(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog", error);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );
    if (!blog) return <div className="text-center mt-20 text-xl font-medium text-gray-600">Blog not found.</div>;

    return (
        <article className="min-h-screen bg-white">
            {/* Header / Banner */}
            <div className="w-full bg-gray-900 text-white relative">
                <div className="absolute inset-0 bg-gray-900/50 z-10"></div>
                {blog.thumbnail ? (
                    <div className="w-full h-[50vh] min-h-[400px]">
                        <img src={`http://localhost:5000${blog.thumbnail}`} alt={blog.title} className="w-full h-full object-cover opacity-60" />
                    </div>
                ) : (
                    <div className="w-full h-[400px] bg-gradient-to-r from-indigo-900 to-purple-900"></div>
                )}

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <Link to="/" className="inline-block mb-6 text-indigo-300 hover:text-white transition-colors text-sm font-bold tracking-wider uppercase">
                            &larr; Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-shadow-lg">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm md:text-base text-gray-200">
                            <span className="bg-indigo-600/80 backdrop-blur px-3 py-1 rounded-full font-semibold">
                                {blog.category?.name}
                            </span>
                            <span>•</span>
                            <span>{new Date(blog.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>Admin Author</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-30">
                <div className="bg-slate-50 border border-gray-100 p-8 md:p-12 rounded-2xl shadow-xl">
                    <div className="prose prose-lg prose-indigo max-w-none font-serif text-gray-800 leading-relaxed">
                        {parse(blog.description)}
                    </div>

                    {/* Share / Tags Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex gap-2">
                            <span className="text-gray-500 text-sm font-medium">Share:</span>
                            <button className="text-gray-400 hover:text-indigo-600 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></button>
                            <button className="text-gray-400 hover:text-blue-700 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;
