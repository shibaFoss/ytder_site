import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User, Key, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { GlobalStyles } from '../components/GlobalStyles';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { username, password });
      
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden selection:bg-orange-600 selection:text-white">
      <GlobalStyles />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/30 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/20 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border border-white shadow-2xl shadow-slate-200/50">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-slate-200 group hover:rotate-12 transition-transform duration-500">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Access</h1>
            <p className="text-slate-500 font-medium">Manage your AIO-YTDER Blog</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake">
              <AlertTriangle size={20} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                <User size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl pl-14 pr-6 py-4 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                <Key size={20} />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl pl-14 pr-6 py-4 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-[2rem] py-5 font-black text-lg hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Secure Login 
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <button 
            onClick={() => navigate('/')}
            className="w-full text-center mt-8 text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
          >
            Back to Public Site
          </button>
        </div>
        
        <p className="text-center mt-8 text-xs font-bold text-slate-300 uppercase tracking-[0.2em] pointer-events-none">
          SYSTEM ENCRYPTED • VERSION 2.5
        </p>
      </div>
    </div>
  );
}
