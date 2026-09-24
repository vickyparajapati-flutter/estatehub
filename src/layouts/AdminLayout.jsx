import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, LayoutDashboard, Building, Users, UserCheck, MessageSquare, 
  MapPin, BarChart3, Settings, LogOut, Menu, X, ChevronRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLayout() {
  const { logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Properties Approval', path: '/admin/properties', icon: Building },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Agent Verification', path: '/admin/agents', icon: UserCheck },
    { label: 'Platform Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { label: 'Locations & Metros', path: '/admin/locations', icon: MapPin },
    { label: 'Analytics & Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 text-slate-300 p-6 space-y-8 shrink-0 border-r border-slate-900">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">Admin Console</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            System Control Panel
          </span>
        </div>

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
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
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

        <div className="pt-4 border-t border-slate-900 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900"
          >
            ← Back to Public Portal
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut className="w-4 h-4" /> Exit Admin
          </button>
        </div>

      </aside>

      {/* Mobile Bar */}
      <div className="md:hidden bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-base">EstateHub Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-300">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden bg-slate-950 text-white p-4 space-y-2 border-b border-slate-900">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-bold ${isActive(item.path) ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main Admin View */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
