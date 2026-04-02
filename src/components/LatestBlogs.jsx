import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Reveal } from './Reveal';

export const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('/api/blogs');
        setBlogs(data.slice(0, 3)); // Only show latest 3
      } catch (err) {
        console.error('Error fetching latest blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return null; // Or a skeleton
  if (blogs.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 px-2 md:px-0">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Insights & News
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Latest from our <span className="text-orange-600">Blog</span>
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-black text-sm hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            <span>View All Articles</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <Reveal key={blog.id} delay={idx * 150}>
              <Link to={`/blog/${blog.slug}`} className="group block h-full">
                <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-orange-500" />
                        <span>Mar 29, 2026</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-orange-500" />
                        <span>5 Min</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-black text-slate-900 text-xs group-hover:gap-4 transition-all">
                      <span>Read More</span>
                      <ArrowRight size={16} className="text-orange-600" />
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
