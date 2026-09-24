import React, { useState } from 'react';
import { Users, Shield, UserX, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminUsers() {
  const { users, triggerToast } = useApp();
  const [userList, setUserList] = useState(users);

  const toggleUserStatus = (userId) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        triggerToast(`User account status updated to ${newStatus}`, 'info');
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">User Management Directory</h1>
        <p className="text-xs text-slate-500 mt-1">Audit buyers, registered agents, property owners, and portal administrators.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">User Name</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Phone</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Properties</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userList.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">{usr.name}</td>
                  <td className="p-3.5 text-slate-600">{usr.email}</td>
                  <td className="p-3.5 text-slate-600">{usr.phone}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      usr.role === 'Admin' ? 'bg-slate-900 text-white' :
                      usr.role === 'Agent' ? 'bg-blue-100 text-blue-800' :
                      usr.role === 'Owner' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {usr.role}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{usr.properties}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${usr.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {usr.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleUserStatus(usr.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                        usr.status === 'Active'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {usr.status === 'Active' ? 'Suspend' : 'Activate'}
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
