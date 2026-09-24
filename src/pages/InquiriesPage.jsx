import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function InquiriesPage() {
  const { inquiries, updateInquiryStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');

  const STATUSES = ['All', 'New', 'Contacted', 'Interested', 'Converted', 'Closed'];

  const filteredInquiries = inquiries.filter(i => {
    if (filterStatus === 'All') return true;
    return i.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Inquiries & Leads Management</h1>
        <p className="text-xs text-slate-500 mt-1">Track buyer inquiries and transition leads through your sales pipeline.</p>
      </div>

      {/* Pipeline Status Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 text-xs font-bold">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterStatus === status
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Inquiries Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{inquiry.name}</h3>
                <span className="text-[11px] text-slate-400 font-medium">Received on {inquiry.date}</span>
              </div>

              {/* Status Dropdown selector */}
              <select
                value={inquiry.status}
                onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                className={`px-3 py-1 rounded-xl text-xs font-bold focus:outline-none ${
                  inquiry.status === 'New' ? 'bg-rose-100 text-rose-800' :
                  inquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                  inquiry.status === 'Interested' ? 'bg-purple-100 text-purple-800' :
                  inquiry.status === 'Converted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Inquiry Context */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">Property:</span>
                <span className="font-bold text-slate-900 truncate">{inquiry.propertyTitle}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 italic text-slate-700">
                "{inquiry.message}"
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <a
                href={`tel:${inquiry.phone}`}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" /> Call
              </a>
              <a
                href={`mailto:${inquiry.email}`}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 flex items-center justify-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" /> Email
              </a>
              <a
                href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 flex items-center justify-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
