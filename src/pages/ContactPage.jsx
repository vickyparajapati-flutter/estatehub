import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { addInquiry, triggerToast } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedProperty: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      triggerToast('Please complete all required fields.', 'error');
      return;
    }

    addInquiry({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      propertyTitle: formData.interestedProperty,
      message: formData.message,
      agentName: 'EstateHub Helpdesk'
    });

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      interestedProperty: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">We'd Love to Hear From You</h1>
        <p className="text-slate-600 text-sm">
          Have questions about buying, renting, or listing property? Our advisory team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Info Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600"><Phone className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Customer Support</div>
                <div className="text-sm font-extrabold text-slate-900">+91 (141) 270-9000</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600"><Mail className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Email Inquiry</div>
                <div className="text-sm font-extrabold text-slate-900">support@estatehub.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600"><MapPin className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Headquarters</div>
                <div className="text-sm font-extrabold text-slate-900">Malviya Nagar, Jaipur, Rajasthan 302017</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600"><Clock className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Working Hours</div>
                <div className="text-sm font-extrabold text-slate-900">Mon - Sun: 9:00 AM - 8:00 PM IST</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
            <h4 className="font-bold text-base text-white">Instant WhatsApp Connect</h4>
            <p className="text-xs text-slate-400">Speak directly with an available on-duty agent right now.</p>
            <a
              href="https://wa.me/919829012345"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 shadow-md"
            >
              <MessageSquare className="w-4 h-4" /> Start WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900">Send Us a Direct Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Interested In</label>
                <select
                  value={formData.interestedProperty}
                  onChange={(e) => setFormData({ ...formData, interestedProperty: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="Buying a Property">Buying a Property</option>
                  <option value="Renting a Property">Renting a Property</option>
                  <option value="Listing My Property">Listing My Property</option>
                  <option value="Agent Partnership">Agent Partnership</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Message</label>
              <textarea
                rows={4}
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="py-3.5 px-8 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Inquiry
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
