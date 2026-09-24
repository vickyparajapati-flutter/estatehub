import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, MapPin, Phone, Mail, Building, Search, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AgentsPage() {
  const { agents } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || agent.location.toLowerCase().includes(selectedCity.toLowerCase());
    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white space-y-6 shadow-xl text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
          <ShieldCheck className="w-4 h-4" /> RERA Certified Professionals
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Meet Our Trusted Agents</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Connect with experienced, verified real estate consultants across India who guide you with zero hidden costs and complete legal transparency.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl max-w-xl mx-auto text-slate-800 shadow-lg">
          <div className="flex-1 flex items-center gap-2 px-3 w-full">
            <Search className="w-5 h-5 text-blue-600 shrink-0" />
            <input
              type="text"
              placeholder="Search agent by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 bg-transparent text-sm focus:outline-none font-medium placeholder-slate-400"
            />
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="All">All Cities</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/10 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{agent.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{agent.role}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{agent.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats pill bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-center text-xs font-semibold text-slate-700">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Experience</div>
                  <div className="font-extrabold text-slate-900 mt-0.5">{agent.experience}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Properties</div>
                  <div className="font-extrabold text-slate-900 mt-0.5">{agent.propertiesCount} Listed</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Rating</div>
                  <div className="font-extrabold text-amber-500 flex items-center justify-center gap-0.5 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400" /> {agent.rating}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {agent.bio}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${agent.phone}`}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" /> Call
              </a>
              <Link
                to={`/agents/${agent.id}`}
                className="py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors shadow-sm"
              >
                View Profile <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
