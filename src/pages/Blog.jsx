import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { GlobalStyles } from '../components/GlobalStyles';

/**
 * Blog Listing Page
 */
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from real backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/blogs');
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-500 selection:text-white">
      <GlobalStyles />
      
      {/* Reusing existing Navbar structure (but without the version logic for now or simplified) */}
      <Navbar stars={0} versionData={{ latest_version: 'v2.5.0', latest_apk_url: '#' }} onDownload={() => {}} />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              AIO-YTDER <span className="text-orange-600">Blog</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Guides, news, and tips for the ultimate video downloading experience on Android.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-sm animate-pulse">
                <div className="h-48 bg-slate-100 rounded-2xl mb-4"></div>
                <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-100 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {posts.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 100}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-orange-500" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-orange-500" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 font-black text-slate-900 group-hover:gap-4 transition-all">
                        <span>Read Article</span>
                        <ArrowRight size={20} className="text-orange-600" />
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <Footer versionData={{ latest_version: 'v2.5.0', latest_apk_url: '#' }} onDownload={() => {}} setShowPrivacy={() => {}} setShowTerms={() => {}} setShowContact={() => {}} />
    </div>
  );
}
