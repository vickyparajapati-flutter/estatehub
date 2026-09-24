import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('rahul.sharma@estatehub.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('Agent');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, role);
    if (role === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-slate-900">EstateHub</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500">Sign in to manage listings, leads, and inquiries.</p>
        </div>

        {/* Demo Quick Logins */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Demo Role Presets:</span>
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => { setEmail('rahul.sharma@estatehub.com'); setRole('Agent'); }}
              className={`py-1 rounded-lg text-xs font-bold ${role === 'Agent' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              Agent Demo
            </button>
            <button
              type="button"
              onClick={() => { setEmail('suresh.owner@gmail.com'); setRole('Owner'); }}
              className={`py-1 rounded-lg text-xs font-bold ${role === 'Owner' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              Owner Demo
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@estatehub.com'); setRole('Admin'); }}
              className={`py-1 rounded-lg text-xs font-bold ${role === 'Admin' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              Remember Me
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to email!'); }} className="text-blue-600 font-bold hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In to {role} Dashboard
          </button>
        </form>

        {/* Social Login UI */}
        <div className="space-y-3 pt-2">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 font-bold uppercase absolute">Or Continue With</span>
          </div>

          <button
            type="button"
            onClick={() => handleLogin({ preventDefault: () => {} })}
            className="w-full py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Sign In with Google
          </button>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}
