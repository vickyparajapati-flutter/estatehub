import React, { useState } from 'react';
import { ShieldCheck, Star, Phone, Mail, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminAgents() {
  const { agents, triggerToast } = useApp();
  const [agentList, setAgentList] = useState(agents);

  const toggleVerification = (agentId) => {
    setAgentList(prev => prev.map(a => {
      if (a.id === agentId) {
        const updated = !a.verified;
        triggerToast(`Agent RERA Verification set to ${updated ? 'Verified' : 'Unverified'}`, 'info');
        return { ...a, verified: updated };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Agent RERA Verification & Oversight</h1>
        <p className="text-xs text-slate-500 mt-1">Audit credentials, listed properties count, and buyer review scores.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Agent</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Properties</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agentList.map((agent) => (
                <tr key={agent.id} className="hover:bg-slate-50">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={agent.image} alt={agent.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 block">{agent.name}</span>
                      <span className="text-[11px] text-slate-400">{agent.email}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-700">{agent.location}</td>
                  <td className="p-3.5 font-bold text-slate-800">{agent.experience}</td>
                  <td className="p-3.5 font-bold text-slate-900">{agent.propertiesCount} Listed</td>
                  <td className="p-3.5 font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {agent.rating}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified RERA
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleVerification(agent.id)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100"
                    >
                      Toggle Badge
                    </button>
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
