import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Mail, Phone, Lock, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SignupPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Buyer'); // 'Buyer', 'Agent', 'Owner'

  const handleSignup = (e) => {
    e.preventDefault();
    login(email || 'newuser@estatehub.com', accountType, name || 'New User');
    if (accountType === 'Buyer') {
      navigate('/properties');
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
          <h2 className="text-2xl font-extrabold text-slate-900">Create Your Account</h2>
          <p className="text-xs text-slate-500">Join India's premier real estate SaaS platform.</p>
        </div>

        {/* Account Type Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">I want to register as:</label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
            {['Buyer', 'Agent', 'Owner'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAccountType(type)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  accountType === type
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+91 98000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Register as {accountType}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
