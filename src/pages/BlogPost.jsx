import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import { MainLayout } from '../components/MainLayout';
import { Reveal } from '../components/Reveal';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[1000] pointer-events-none">
        <div
          className="h-full bg-orange-500 shadow-[0_0_15px_#f97316] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="pt-40 pb-20 max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-orange-600 mb-10 transition-colors group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-orange-200"></div>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em]">{post.category}</span>
              <div className="h-[1px] w-8 bg-orange-200"></div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-14 tracking-tight leading-[1.1] md:leading-[1.05]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 backdrop-blur-sm border border-slate-100 rounded-3xl py-6 px-10 max-w-fit mx-auto shadow-sm">
              <div className="flex items-center gap-2 group cursor-default">
                <Calendar size={14} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-slate-500">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="w-[1px] h-3 bg-slate-200 hidden md:block"></div>
              <div className="flex items-center gap-2 group cursor-default">
                <Clock size={14} className="text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-slate-500">5 MIN READ</span>
              </div>
              <div className="w-[1px] h-3 bg-slate-200 hidden md:block"></div>
              <div className="flex items-center gap-2 group">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                  <img src={post.author_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100'} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-slate-900 font-black tracking-normal lowercase first-letter:uppercase">{post.author_name}</span>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-3xl mx-auto mb-20 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] border-4 border-white group">
            <div className="aspect-[16/9]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-slate-600 font-normal text-lg md:text-xl leading-[1.9] mb-24 
                          prose prose-slate prose-lg max-w-none 
                          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                          prose-p:mb-10 prose-p:leading-[1.9]
                          prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-[2rem] prose-blockquote:italic prose-blockquote:font-medium
                          prose-a:text-orange-600 prose-a:font-black prose-a:no-underline prose-a:border-b-2 prose-a:border-orange-500/20 hover:prose-a:border-orange-500 prose-a:transition-all
                          prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:my-16
                          prose-pre:bg-slate-900 prose-pre:rounded-[2.5rem] prose-pre:p-8
                          prose-ul:list-disc prose-ul:pl-6 prose-li:mb-4
                          selection:bg-orange-500 selection:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {post.author_bio && (
              <div className="p-12 md:p-20 bg-slate-900 rounded-[4.5rem] flex flex-col md:flex-row items-center gap-12 mb-24 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full -mr-48 -mt-48" />
                <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl flex-shrink-0 group-hover:rotate-6 transition-transform duration-700">
                  <img
                    src={post.author_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200'}
                    alt={post.author_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left relative z-10">
                  <div className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Master Author</div>
                  <h4 className="text-3xl font-black text-white mb-4">{post.author_name}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{post.author_bio}</p>
                </div>
              </div>
            )}

            <div className="border-t border-slate-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-6">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Share Article</div>
                <div className="flex gap-6 text-slate-300">
                  <Facebook size={26} className="hover:text-blue-600 hover:scale-110 transition-all cursor-pointer" />
                  <Twitter size={26} className="hover:text-sky-400 hover:scale-110 transition-all cursor-pointer" />
                  <Instagram size={26} className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer" />
                  <Share2 size={26} className="hover:text-slate-900 hover:scale-110 transition-all cursor-pointer" />
                </div>
              </div>
              <Link to="/blog" className="px-12 py-6 bg-slate-900 text-white rounded-full font-black text-sm hover:bg-orange-600 transition-all active:scale-95 shadow-[0_20px_40px_-5px_rgba(15,23,42,0.2)]">
                EXPLORE MORE ARTICLES
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
    </MainLayout>
  );
}
