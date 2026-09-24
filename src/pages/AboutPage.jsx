import React from 'react';
import { Building2, ShieldCheck, Users, Award, CheckCircle, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
          <Sparkles className="w-4 h-4" /> About EstateHub
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          Redefining Real Estate in India with Trust & Elegance
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          EstateHub is built with one mission: to empower home buyers, tenants, owners, and developers with transparent pricing, RERA-verified documents, and an unmatched digital browsing experience.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">100% RERA Transparency</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every property on EstateHub undergoes physical verification and document checks before listing. Say goodbye to fake photos or deceptive pricing.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Certified Partner Network</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We onboard only top 5% rated real estate consultants and corporate developers with proven track records across Jaipur, Gurgaon, Delhi, Mumbai, and Bangalore.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">SaaS Platform Excellence</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our end-to-end digital stack equips buyers with virtual tours, instant inquiry pipeline tracking, and effortless property submission tools for owners.
          </p>
        </div>
      </div>

      {/* Story Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Building the Future of Indian Real Estate</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded in 2024, EstateHub has facilitated over ₹1,200 Crores in real estate transactions. Our dedicated customer success teams operate from Jaipur, Gurgaon, and Mumbai, ensuring every inquiry receives immediate attention.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
          alt="Corporate Office"
          className="rounded-2xl shadow-xl border border-slate-800 object-cover w-full h-72"
        />
      </div>

    </div>
  );
}
