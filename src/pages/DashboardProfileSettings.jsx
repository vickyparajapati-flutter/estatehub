import React, { useState } from 'react';
import { User, Settings, Save, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function DashboardProfileView() {
  const { currentUser, triggerToast } = useApp();
  const [name, setName] = useState(currentUser?.name || 'Rahul Sharma');
  const [phone, setPhone] = useState('+91 98290 12345');
  const [location, setLocation] = useState('Jaipur, Rajasthan');

  const handleSave = (e) => {
    e.preventDefault();
    triggerToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Agent Profile Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage public profile card information presented to buyers.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <img src={currentUser?.avatar} alt="Profile" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20" />
          <div>
            <span className="font-bold text-slate-900 text-sm block">{currentUser?.name}</span>
            <span className="text-[10px] text-blue-600 font-bold">RERA Certified Consultant</span>
          </div>
        </div>

        <div>
          <label className="block mb-1">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" />
        </div>

        <div>
          <label className="block mb-1">Operating Region</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200" />
        </div>

        <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export function DashboardSettingsView() {
  const { triggerToast } = useApp();
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Notification & Lead Preferences</h1>
        <p className="text-xs text-slate-500 mt-1">Configure automated SMS and WhatsApp lead notifications.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-semibold text-slate-700">
        <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
          <span>Instant WhatsApp Lead Alerts</span>
          <input type="checkbox" defaultChecked className="rounded text-blue-600 w-4 h-4" />
        </label>
        <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
          <span>Daily Performance Email Digest</span>
          <input type="checkbox" defaultChecked className="rounded text-blue-600 w-4 h-4" />
        </label>
        <button onClick={() => triggerToast('Preferences saved!', 'info')} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
