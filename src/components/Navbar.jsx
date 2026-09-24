import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, Heart, User, Menu, X, PlusCircle, LogIn, LogOut, 
  ShieldCheck, LayoutDashboard, ChevronDown, Sparkles, ArrowLeftRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { currentUser, favorites, compareList, logout, switchRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Demo Banner for Quick Role Switching */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" /> LIVE DEMO
            </span>
            <span className="hidden md:inline text-slate-400">Switch role view to test dashboard capabilities:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-[11px] font-medium">
            {['Buyer', 'Agent', 'Owner', 'Admin'].map((role) => (
              <button
                key={role}
                onClick={() => switchRole(role)}
                className={`px-2.5 py-0.5 rounded-md transition-all ${
                  currentUser?.role === role 
                    ? 'bg-blue-600 text-white font-semibold shadow-xs' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {role} View
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                  EstateHub
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide hidden sm:block">
                Find a Place You'll Love to Live
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-slate-600 text-sm">
            <Link 
              to="/properties?type=buy" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/properties') && location.search.includes('buy') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Buy
            </Link>
            <Link 
              to="/properties?type=rent" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${location.search.includes('rent') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Rent
            </Link>
            <Link 
              to="/dashboard/properties/add" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/dashboard/properties/add') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Sell
            </Link>
            <Link 
              to="/agents" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/agents') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Agents
            </Link>
            <Link 
              to="/properties" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/properties') && !location.search ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Properties
            </Link>
            <Link 
              to="/compare" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/compare') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Compare
            </Link>
            <Link 
              to="/about" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/about') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3.5 py-2 rounded-lg transition-colors ${isActive('/contact') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Compare Counter */}
            <Link 
              to="/compare" 
              className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Compare Properties"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Favorites Icon */}
            <Link 
              to="/favorites" 
              className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* List Your Property CTA Button */}
            <Link
              to="/dashboard/properties/add"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              List Your Property
            </Link>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="text-left leading-tight hidden sm:block">
                    <span className="block text-xs font-bold text-slate-800">{currentUser.name}</span>
                    <span className="block text-[10px] text-blue-600 font-semibold">{currentUser.role}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700">
                        {currentUser.role} Account
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'Admin' ? (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4" /> Admin Console
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4" /> {currentUser.role} Dashboard
                        </Link>
                      )}

                      <Link
                        to="/compare"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      >
                        <ArrowLeftRight className="w-4 h-4 text-indigo-600" /> Property Comparison ({compareList.length})
                      </Link>

                      <Link
                        to="/favorites"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      >
                        <Heart className="w-4 h-4 text-rose-500" /> Favorites ({favorites.length})
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium text-left"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-slate-700 font-semibold hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link 
              to="/compare" 
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link 
              to="/favorites" 
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-1 font-medium text-slate-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left">Home</Link>
            <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left">Properties</Link>
            <Link to="/compare" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left">Compare ({compareList.length})</Link>
            <Link to="/agents" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left">Agents</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left">About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left">Contact</Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left font-bold text-blue-600">Agent Dashboard</Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-left font-bold text-slate-900">Admin Console</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
