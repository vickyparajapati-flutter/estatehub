import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, Eye, MessageSquare, TrendingUp, Clock, PlusCircle, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DashboardOverview() {
  const { properties, inquiries, currentUser } = useApp();
  const [chartRange, setChartRange] = useState('7d');

  // Filter agent's properties
  const myProperties = properties.filter(p => p.agentId === currentUser?.id || p.agent?.id === currentUser?.id || true);
  
  const totalViews = myProperties.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalInquiries = inquiries.length;
  const activeListings = myProperties.filter(p => p.status === 'Published').length;
  const pendingInquiries = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">Welcome back, {currentUser?.name || 'Rahul Sharma'}. Here is your listing performance summary.</p>
        </div>

        <Link
          to="/dashboard/properties/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4" /> Add New Listing
        </Link>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Properties</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600"><Building className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{myProperties.length}</div>
          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% from last month
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Listings</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-emerald-600">{activeListings}</div>
          <div className="text-[10px] text-slate-400 font-bold">Published on Portal</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Views</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600"><Eye className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalViews.toLocaleString()}</div>
          <div className="text-[10px] text-purple-600 font-bold">High Buyer Interest</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600"><MessageSquare className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalInquiries}</div>
          <div className="text-[10px] text-amber-600 font-bold">+5 new leads this week</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Inquiries</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600"><Clock className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-rose-600">{pendingInquiries}</div>
          <div className="text-[10px] text-rose-500 font-bold">Action Required</div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Property Views */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Property Views Trend</h3>
              <p className="text-xs text-slate-400">Daily visitor traffic over time</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setChartRange('7d')}
                className={`px-3 py-1 rounded-lg ${chartRange === '7d' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setChartRange('30d')}
                className={`px-3 py-1 rounded-lg ${chartRange === '30d' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="h-56 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,140 Q 80,60 160,110 T 320,40 T 500,80 L 500,180 L 0,180 Z"
                fill="url(#viewsGrad)"
              />
              <path
                d="M 0,140 Q 80,60 160,110 T 320,40 T 500,80"
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
              />
              {/* Data points */}
              <circle cx="80" cy="90" r="5" fill="#2563eb" />
              <circle cx="160" cy="110" r="5" fill="#2563eb" />
              <circle cx="320" cy="40" r="6" fill="#2563eb" />
              <circle cx="500" cy="80" r="5" fill="#2563eb" />
            </svg>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-bold pt-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Chart 2: Monthly Lead Statistics */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Monthly Lead Conversion</h3>
              <p className="text-xs text-slate-400">Buyer inquiries by status</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">High Conversion</span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 px-4">
            {[
              { month: 'Oct', val: 40, col: 'bg-blue-400' },
              { month: 'Nov', val: 65, col: 'bg-blue-500' },
              { month: 'Dec', val: 50, col: 'bg-blue-500' },
              { month: 'Jan', val: 85, col: 'bg-indigo-600' },
              { month: 'Feb', val: 95, col: 'bg-blue-600' }
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-600">{bar.val}</span>
                <div className={`w-full rounded-t-xl ${bar.col}`} style={{ height: `${bar.val}%` }} />
                <span className="text-[11px] text-slate-400 font-bold">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PROPERTY PERFORMANCE TABLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Property Performance</h3>
          <Link to="/dashboard/properties" className="text-xs font-bold text-blue-600 hover:underline">
            View All Properties →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Property</th>
                <th className="p-3.5">Views</th>
                <th className="p-3.5">Inquiries</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myProperties.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 block truncate max-w-xs">{p.title}</span>
                      <span className="text-[11px] text-slate-400">{p.city} • {p.price}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{p.views || 0}</td>
                  <td className="p-3.5 font-bold text-slate-800">{p.inquiriesCount || 0}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Link to={`/properties/${p.id}`} className="text-blue-600 hover:underline font-bold flex items-center gap-1">
                      View <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
