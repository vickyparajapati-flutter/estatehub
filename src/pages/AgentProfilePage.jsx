import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Star, MapPin, Phone, Mail, MessageSquare, ArrowLeft, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function AgentProfilePage() {
  const { id } = useParams();
  const { agents, properties } = useApp();

  const agent = agents.find(a => a.id === id) || agents[0];
  const agentProperties = properties.filter(p => p.agentId === agent.id || p.agent?.id === agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Link */}
      <Link to="/agents" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Agents Directory
      </Link>

      {/* Profile Header Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-28 h-28 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-lg shrink-0"
          />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{agent.name}</h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> RERA Verified Agent
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-500">{agent.role} • {agent.location}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
              <span className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 mr-1" /> {agent.rating} ({agent.reviewCount} Reviews)
              </span>
              <span>• Experience: <strong className="text-slate-900">{agent.experience}</strong></span>
              <span>• Listed: <strong className="text-slate-900">{agent.propertiesCount} Properties</strong></span>
            </div>
          </div>
        </div>

        {/* Contact Action CTAs */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
          <a
            href={`tel:${agent.phone}`}
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
          >
            <Phone className="w-4 h-4" /> Call {agent.phone}
          </a>
          <a
            href={`https://wa.me/${agent.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
          >
            <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* About & Bio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">About {agent.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {agent.bio}
            </p>
          </div>

          {/* Properties Listed by Agent */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-slate-900">Properties Listed by {agent.name}</h3>
              <span className="text-xs font-bold text-slate-500">{agentProperties.length} active listings</span>
            </div>

            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-500 text-sm">
                No active properties listed under this profile currently.
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Reviews & Contact */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 text-lg">Client Reviews ({agent.reviews?.length || 0})</h4>
            <div className="space-y-4">
              {agent.reviews?.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{r.user}</span>
                    <span className="text-amber-500 font-bold flex items-center">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> {r.rating}
                    </span>
                  </div>
                  <p className="text-slate-600 italic">"{r.comment}"</p>
                  <span className="text-[10px] text-slate-400 block">{r.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
