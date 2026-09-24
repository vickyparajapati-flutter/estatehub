import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                EstateHub
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              EstateHub is India's leading modern real estate platform connecting home buyers, tenants, owners, and verified agents with premier luxury properties across top metros.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% RERA Verified Listings
              </span>
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-500" /> +91 6375521991
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-500" /> hello@aianthro.com
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500" /> Malviya Nagar, Jaipur, Rajasthan 302017
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/properties" className="hover:text-blue-400 transition-colors">All Properties</Link></li>
              <li><Link to="/properties?type=buy" className="hover:text-blue-400 transition-colors">Properties for Sale</Link></li>
              <li><Link to="/properties?type=rent" className="hover:text-blue-400 transition-colors">Properties for Rent</Link></li>
              <li><Link to="/agents" className="hover:text-blue-400 transition-colors">Verified Agents</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Popular Metros */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Top Locations</h4>
            <ul className="space-y-2.5 text-sm">
              {POPULAR_LOCATIONS.map((loc) => (
                <li key={loc.name}>
                  <Link to={`/properties?location=${loc.name}`} className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{loc.name}</span>
                    <span className="text-[11px] text-slate-500">{loc.properties}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Subscribe</h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive exclusive price drop alerts and market insights directly in your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to EstateHub Newsletter!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Join Newsletter
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EstateHub Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-400">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
