import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, XCircle, Trash2, Edit } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminProperties() {
  const { properties, updatePropertyStatus, deleteProperty } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Admin Property Approval & Management</h1>
          <p className="text-xs text-slate-500 mt-1">Review, approve, or reject incoming property submissions.</p>
        </div>

        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Image & Title</th>
                <th className="p-3.5">Owner / Agent</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block truncate max-w-xs">{p.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">ID: {p.propertyId}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{p.agent?.name || 'Rahul Sharma'}</td>
                  <td className="p-3.5 text-slate-600">{p.city}, {p.state}</td>
                  <td className="p-3.5 font-bold text-slate-900">{p.price}</td>
                  <td className="p-3.5 font-bold text-slate-700">{p.propertyType}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'Published' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'Pending Review' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    <Link to={`/properties/${p.id}`} className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 inline-block" title="View">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => updatePropertyStatus(p.id, 'Published')}
                      className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 inline-block"
                      title="Approve Listing"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updatePropertyStatus(p.id, 'Rejected')}
                      className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 inline-block"
                      title="Reject Listing"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProperty(p.id)}
                      className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 inline-block"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
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
