import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import { MainLayout } from '../components/MainLayout';
import { Reveal } from '../components/Reveal';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/blogs/${slug}`);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return (
    <MainLayout>
      <div className="min-h-screen bg-white flex items-center justify-center font-black animate-pulse">Loading Article...</div>
    </MainLayout>
  );

  if (!post) return (
    <MainLayout>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4 text-slate-900">Post Not Found</h1>
        <Link to="/blog" className="text-orange-600 font-bold hover:underline">Back to Blog</Link>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-2 font-black text-slate-400 hover:text-orange-600 mb-12 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>

          <div className="mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black mb-6 uppercase tracking-widest">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-500" />
                <span>Mar 29, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-orange-500" />
                <span>5 Min Read</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-orange-500" />
                <span>By Admin</span>
              </div>
            </div>
          </div>

          <div className="relative h-[25rem] md:h-[35rem] w-full mb-16 shadow-2xl shadow-slate-200 overflow-hidden rounded-[3.5rem]">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="mb-20 prose prose-slate max-w-none prose-lg prose-orange font-medium leading-relaxed text-slate-600">
            {post.content.split('\n').map((para, i) => <p key={i} className="mb-4">{para}</p>)}
          </div>

          <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share Article</div>
              <div className="flex gap-4 text-slate-300">
                <Facebook size={24} className="hover:text-blue-600 transition-colors cursor-pointer" />
                <Twitter size={24} className="hover:text-sky-400 transition-colors cursor-pointer" />
                <Instagram size={24} className="hover:text-pink-600 transition-colors cursor-pointer" />
                <Share2 size={24} className="hover:text-slate-900 transition-colors cursor-pointer" />
              </div>
            </div>
            <Link to="/blog" className="px-10 py-5 bg-slate-900 text-white rounded-[2.5rem] font-black hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
              Explore More Articles
            </Link>
          </div>
        </Reveal>
      </main>
    </MainLayout>
  );
}
