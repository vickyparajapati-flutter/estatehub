import React from 'react';
import { 
  Building, Users, UserCheck, MessageSquare, TrendingUp, ShieldCheck, CheckCircle2, Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminOverview() {
  const { properties, users, agents, inquiries } = useApp();

  const totalProperties = properties.length;
  const activeProperties = properties.filter(p => p.status === 'Published').length;
  const totalUsers = users.length;
  const totalAgents = agents.length;
  const totalOwners = users.filter(u => u.role === 'Owner').length;
  const totalInquiries = inquiries.length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Admin Control Overview</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time SaaS platform health, user registrations, and property audit pipeline.</p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Properties</span>
          <div className="text-2xl font-black text-slate-900">{totalProperties}</div>
          <span className="text-[10px] text-blue-600 font-bold">+18% this month</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Properties</span>
          <div className="text-2xl font-black text-emerald-600">{activeProperties}</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% Verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Users</span>
          <div className="text-2xl font-black text-slate-900">{totalUsers}</div>
          <span className="text-[10px] text-indigo-600 font-bold">Active Accounts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Agents</span>
          <div className="text-2xl font-black text-blue-600">{totalAgents}</div>
          <span className="text-[10px] text-blue-600 font-bold">RERA Certified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Owners</span>
          <div className="text-2xl font-black text-slate-900">{totalOwners}</div>
          <span className="text-[10px] text-purple-600 font-bold">Direct Sellers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Inquiries</span>
          <div className="text-2xl font-black text-amber-600">{totalInquiries}</div>
          <span className="text-[10px] text-amber-600 font-bold">Processed</span>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Property Listings Growth */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Property Listings Growth</h3>
          <div className="h-48 w-full flex items-end gap-3 pt-4 px-2">
            {[35, 45, 60, 80, 110, 145].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-600">{val}</span>
                <div className="w-full bg-emerald-500 rounded-t-xl" style={{ height: `${(val / 145) * 100}%` }} />
                <span className="text-[10px] text-slate-400 font-bold">M{idx+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Property Distribution by City */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Property Distribution by City</h3>
          <div className="space-y-3 pt-2 text-xs font-semibold">
            {[
              { city: 'Jaipur', count: '420 Listings', pct: 85, color: 'bg-blue-600' },
              { city: 'Gurgaon', count: '950 Listings', pct: 92, color: 'bg-indigo-600' },
              { city: 'Mumbai', count: '2,100 Listings', pct: 98, color: 'bg-emerald-600' },
              { city: 'Bangalore', count: '1,800 Listings', pct: 90, color: 'bg-purple-600' },
              { city: 'Delhi', count: '1,250 Listings', pct: 88, color: 'bg-amber-600' }
            ].map((item) => (
              <div key={item.city} className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>{item.city}</span>
                  <span className="text-slate-400">{item.count}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-lg">Recent System Activity Log</h3>
        <div className="space-y-3 text-xs font-medium text-slate-700">
          {[
            { text: 'Rahul Sharma added a new property: Luxury 3 BHK Sky Villa in Jaipur.', time: '10 mins ago', type: 'property' },
            { text: 'Priya Mehta received a new inquiry from Meera Sen for Gurgaon Villa.', time: '25 mins ago', type: 'inquiry' },
            { text: 'New user Suresh Singhal registered as Owner.', time: '1 hour ago', type: 'user' },
            { text: 'Property listing EH-MUM-5421 approved by Admin.', time: '2 hours ago', type: 'approve' }
          ].map((act, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{act.text}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold shrink-0">{act.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
