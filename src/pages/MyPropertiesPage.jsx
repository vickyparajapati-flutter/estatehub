import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2, PlusCircle, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MyPropertiesPage() {
  const { properties, deleteProperty, updatePropertyStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');
  const [deleteModalId, setDeleteModalId] = useState(null);

  const displayedProperties = properties.filter(p => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Listed Properties</h1>
          <p className="text-xs text-slate-500 mt-1">Manage, update or remove properties in your portfolio.</p>
        </div>

        <Link
          to="/dashboard/properties/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4" /> Add Property
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 text-xs font-bold">
        {['All', 'Published', 'Draft', 'Pending Review', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterStatus === status
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Property</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Views</th>
                <th className="p-3.5">Leads</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedProperties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block truncate max-w-xs">{p.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">ID: {p.propertyId}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-700">{p.propertyType}</td>
                  <td className="p-3.5 text-slate-600">{p.city}, {p.state}</td>
                  <td className="p-3.5 font-bold text-slate-900">{p.price}</td>
                  <td className="p-3.5 font-bold text-purple-600">{p.views || 0}</td>
                  <td className="p-3.5 font-bold text-amber-600">{p.inquiriesCount || 0}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'Published' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'Draft' ? 'bg-slate-100 text-slate-800' :
                      p.status === 'Pending Review' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      to={`/properties/${p.id}`}
                      className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 inline-block"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteModalId(p.id)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 inline-block"
                      title="Delete Property"
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

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Delete Property?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently remove this property from EstateHub listings?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProperty(deleteModalId);
                  setDeleteModalId(null);
                }}
                className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
