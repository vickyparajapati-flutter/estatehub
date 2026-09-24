import React from 'react';
import { MessageSquare, MapPin, BarChart3, Settings, ShieldCheck, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AdminInquiriesView() {
  const { inquiries } = useApp();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Platform Inquiries Master Log</h1>
        <p className="text-xs text-slate-500 mt-1">Audit all customer inquiries generated across every property listing.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Customer Name</th>
                <th className="p-3.5">Property</th>
                <th className="p-3.5">Assigned Agent</th>
                <th className="p-3.5">Phone</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">{inq.name}</td>
                  <td className="p-3.5 text-slate-800 font-medium">{inq.propertyTitle}</td>
                  <td className="p-3.5 text-slate-600">{inq.agentName}</td>
                  <td className="p-3.5 font-mono">{inq.phone}</td>
                  <td className="p-3.5 text-slate-400">{inq.date}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {inq.status}
                    </span>
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

export function AdminLocationsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Metros & Tier-1 City Coverage</h1>
        <p className="text-xs text-slate-500 mt-1">Manage active real estate markets and regional RERA regulations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Jaipur', 'Gurgaon', 'Delhi', 'Mumbai', 'Bangalore', 'Noida'].map((city) => (
          <div key={city} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg">{city}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
            </div>
            <p className="text-xs text-slate-500">Over 500+ verified properties listed with active agent network.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminReportsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Analytics & SaaS Revenue Reports</h1>
        <p className="text-xs text-slate-500 mt-1">Platform lead conversions, featured listing revenue, and traffic telemetry.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center max-w-lg mx-auto">
        <BarChart3 className="w-12 h-12 text-blue-600 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Monthly Performance Benchmark: 99.4%</h3>
        <p className="text-xs text-slate-500">Total volume traded: ₹1,250 Crores across 12,500 active buyer transactions.</p>
      </div>
    </div>
  );
}

export function AdminSettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">System Configuration & API Keys</h1>
        <p className="text-xs text-slate-500 mt-1">Global platform settings, email gateway, and security policies.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <div className="space-y-2 text-xs font-semibold">
          <label className="block text-slate-700">Platform Brand Name</label>
          <input type="text" defaultValue="EstateHub" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" />
        </div>
        <div className="space-y-2 text-xs font-semibold">
          <label className="block text-slate-700">RERA Compliance Officer Email</label>
          <input type="email" defaultValue="compliance@estatehub.com" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" />
        </div>
        <button onClick={() => alert('Settings saved successfully!')} className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
          Save Admin Settings
        </button>
      </div>
    </div>
  );
}
