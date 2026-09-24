import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building, PlusCircle, MessageSquare, Users, 
  Heart, User, Settings, LogOut, Menu, X, ChevronRight, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DashboardLayout() {
  const { currentUser, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Properties', path: '/dashboard/properties', icon: Building },
    { label: 'Add Property', path: '/dashboard/properties/add', icon: PlusCircle },
    { label: 'Inquiries', path: '/dashboard/inquiries', icon: MessageSquare },
    { label: 'Leads Pipeline', path: '/dashboard/leads', icon: Users },
    { label: 'Favorites', path: '/favorites', icon: Heart },
    { label: 'My Profile', path: '/dashboard/profile', icon: User },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 p-6 space-y-8 shrink-0 border-r border-slate-800">
        
        {/* Brand */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black">EH</div>
            <span className="font-extrabold text-xl">Agent Portal</span>
          </div>
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
            {currentUser?.name || 'Rahul Sharma'} ({currentUser?.role || 'Agent'})
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {active && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

      </aside>

      {/* Mobile Sidebar Drawer Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base">Agent Dashboard</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-300">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 space-y-2 border-b border-slate-800">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-bold ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main Main Content Container */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
