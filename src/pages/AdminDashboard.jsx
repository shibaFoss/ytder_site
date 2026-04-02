import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  FileEdit, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Eye, 
  Globe, 
  Calendar, 
  Image as ImageIcon,
  CheckCircle2,
  Rocket
} from 'lucide-react';
import { GlobalStyles } from '../components/GlobalStyles';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
    
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [navigate]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = {
      title: formData.get('title'),
      category: formData.get('category'),
      content: formData.get('content'),
      excerpt: formData.get('content').substring(0, 150) + '...',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800'
    };

    const token = localStorage.getItem('adminToken');
    try {
      await axios.post('http://localhost:5000/api/blogs', postData, {
        headers: { Authorization: token }
      });
      setIsAdding(false);
      window.location.reload(); // Quick refresh
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating post');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: token }
      });
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 selection:bg-orange-600 selection:text-white">
      <GlobalStyles />
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-slate-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase tracking-widest">Dash<span className="text-orange-600">Admin</span></span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-6">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-orange-600 text-white font-black text-sm shadow-xl shadow-orange-200/50 transition-all">
            <FileEdit size={20} />
            <span>Manage Blogs</span>
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold transition-all">
            <Globe size={20} />
            <span>Site Overview</span>
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 font-black transition-all"
          >
            <LogOut size={20} />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">Blog Manager</h1>
            <p className="text-slate-500 font-medium">Create and manage your articles seamlessly.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-orange-600 shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            <Plus size={24} />
            <span>New Article</span>
          </button>
        </header>

        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Total Articles</div>
            <div className="text-4xl font-black text-slate-900">02</div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Global Views</div>
            <div className="text-4xl font-black text-slate-900">14.3K</div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Admin Status</div>
            <div className="text-4xl font-black text-emerald-500 flex items-center gap-2">Online <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span></div>
          </div>
        </div>

        {/* --- RECENT REVIEWS / BLOG TABLE --- */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recent Articles</h3>
            <div className="px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">Manage All</div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Views</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {blogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-slate-900 max-w-sm truncate">{blog.title}</td>
                    <td className="px-8 py-6 font-medium text-slate-500">{blog.date}</td>
                    <td className="px-8 py-6 font-black text-slate-900">{blog.views.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        <CheckCircle2 size={12} />
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-200 shadow-sm transition-all focus:outline-none">
                          <Eye size={18} />
                        </button>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all focus:outline-none">
                          <FileEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 hover:border-red-200 shadow-sm transition-all focus:outline-none"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- NEW/EDIT MODAL PLACEHOLDER --- */}
      {isAdding && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl p-10 md:p-16 rounded-[4rem] shadow-2xl relative animate-in slide-in-from-bottom duration-500">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-8 right-8 p-3 rounded-full bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
            >
              <Trash2 size={24} />
            </button>

            <header className="mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Draft Article</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Release v1.2 Engine</p>
            </header>

            <form onSubmit={handleCreatePost} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Article Title</label>
                  <input name="title" type="text" placeholder="Enter post title..." className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Category</label>
                  <select name="category" className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all appearance-none">
                    <option value="Tutorial">Tutorial</option>
                    <option value="News">News</option>
                    <option value="Comparison">Comparison</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Post Content (Markdown Support)</label>
                  <textarea name="content" rows={6} placeholder="Start writing your magic..." className="w-full bg-slate-50 border border-slate-100 rounded-[2.5rem] px-8 py-6 font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all" required />
              </div>

              <div className="flex gap-4 items-center">
                <button className="flex-grow bg-slate-900 text-white rounded-[2rem] py-6 font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-200">
                  Publish Post
                </button>
                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center justify-center text-slate-300 hover:text-orange-500 cursor-pointer transition-colors shadow-inner">
                  <ImageIcon size={32} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
