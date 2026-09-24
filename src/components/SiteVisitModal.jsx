import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X, CheckCircle2, Video, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SiteVisitModal({ property, isOpen, onClose }) {
  const { addSiteVisit, triggerToast } = useApp();

  const [visitDate, setVisitDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 1:00 PM');
  const [visitType, setVisitType] = useState('In-Person Visit');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen || !property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      triggerToast('Please complete all contact details.', 'error');
      return;
    }

    addSiteVisit({
      propertyId: property.id,
      propertyTitle: property.title,
      agentId: property.agent?.id || 'agent-1',
      agentName: property.agent?.name || 'Rahul Sharma',
      visitDate,
      timeSlot,
      visitType,
      name,
      email,
      phone,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative border border-slate-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pr-6">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Site Inspection Booking
          </span>
          <h3 className="text-xl font-extrabold text-slate-900">Schedule a Property Tour</h3>
          <p className="text-xs text-slate-500 truncate">
            {property.title} • {property.locality}, {property.city}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
          
          {/* Visit Type Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setVisitType('In-Person Visit')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                visitType === 'In-Person Visit' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> In-Person Visit
            </button>
            <button
              type="button"
              onClick={() => setVisitType('Virtual 3D Video Tour')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                visitType === 'Virtual 3D Video Tour' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Live 3D Tour
            </button>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-slate-600">Preferred Date *</label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-slate-600">Time Slot *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              >
                <option value="10:00 AM - 12:00 PM">Morning (10 AM - 12 PM)</option>
                <option value="12:00 PM - 03:00 PM">Afternoon (12 PM - 3 PM)</option>
                <option value="04:00 PM - 07:00 PM">Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="block text-slate-600">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-600">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-600">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-4"
          >
            <Send className="w-4 h-4" /> Confirm Free Site Inspection Booking
          </button>
        </form>

      </div>
    </div>
  );
}
