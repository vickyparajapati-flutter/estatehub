import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, MapPin, Home, DollarSign, Bed, ArrowRight, ShieldCheck, 
  Users, Award, TrendingUp, Sparkles, Star, Building2, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';
import { POPULAR_LOCATIONS } from '../data/mockData';

export default function HomePage() {
  const { properties, agents } = useApp();
  const navigate = useNavigate();

  // Search state
  const [listingType, setListingType] = useState('Buy'); // 'Buy' or 'Rent'
  const [location, setLocation] = useState('Jaipur');
  const [propertyType, setPropertyType] = useState('All Types');
  const [priceRange, setPriceRange] = useState('All');
  const [bedrooms, setBedrooms] = useState('Any');

  const featuredProperties = properties.filter(p => p.featured || p.verified).slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.append('type', listingType.toLowerCase());
    if (location && location !== 'All') params.append('location', location);
    if (propertyType && propertyType !== 'All Types') params.append('propertyType', propertyType);
    if (bedrooms && bedrooms !== 'Any') params.append('bedrooms', bedrooms);
    if (priceRange && priceRange !== 'All') params.append('priceRange', priceRange);
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
        {/* Background Overlay with Unsplash Real Estate Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="EstateHub Luxury Home"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" /> Premium Real Estate Marketplace
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Find Your <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">Perfect Property</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Discover homes, apartments, villas and commercial properties from trusted owners and verified agents across India.
            </p>
          </div>

          {/* Large Property Search Box */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 max-w-4xl mx-auto text-slate-800 text-left">
            
            {/* Buy / Rent Toggle */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setListingType('Buy')}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  listingType === 'Buy'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setListingType('Rent')}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  listingType === 'Rent'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              
              {/* Location Select */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Locations</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai, Maharashtra</option>
                  <option value="Bangalore">Bangalore, Karnataka</option>
                  <option value="Gurgaon">Gurgaon, Haryana</option>
                  <option value="Noida">Noida, Uttar Pradesh</option>
                  <option value="Pune">Pune, Maharashtra</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 text-blue-500" /> Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All Types">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-blue-500" /> Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Any">Any Beds</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-blue-500" /> Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Prices</option>
                  <option value="under-1cr">Under ₹1 Crore</option>
                  <option value="1cr-2cr">₹1 Crore - ₹2 Crore</option>
                  <option value="above-2cr">Above ₹2 Crore</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 h-[42px]"
                >
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>

            </form>

            {/* Popular Quick Links */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-400">Popular Locations:</span>
              {['Jaipur', 'Delhi', 'Mumbai', 'Bangalore', 'Gurgaon'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setLocation(city);
                    navigate(`/properties?location=${city}`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">12,500+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Verified Properties</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-600">8,400+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Happy Families</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">950+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Certified Agents</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">99.4%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Exclusive Listings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Featured Properties</h2>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 text-sm group"
          >
            Explore All Properties <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR LOCATIONS GRID */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Explore Top Metros</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Properties by Popular Cities</h2>
            <p className="text-sm text-slate-600 mt-2">Find your dream residence in India's fastest-growing metropolitan hubs.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => navigate(`/properties?location=${loc.name}`)}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-md text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base leading-snug">{loc.name}</h3>
                  <p className="text-[11px] text-slate-300 font-medium">{loc.properties}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ESTATEHUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" /> Trusted & Transparent Platform
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                Why Millions Choose <span className="text-blue-400">EstateHub</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you are looking to purchase a modern luxury villa, rent a sea-facing apartment, or list commercial office space, EstateHub makes every step effortless.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">100% RERA Verified Listings</h4>
                    <p className="text-xs text-slate-400">All property documents and ownership proofs are pre-verified by legal teams.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Direct Owner & Top Agent Access</h4>
                    <p className="text-xs text-slate-400">Connect with genuine owners and certified real estate advisors without hidden markups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Smart Search & Virtual Gallery</h4>
                    <p className="text-xs text-slate-400">High-resolution property photography, interactive floor plans, and localized market data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Estate Living Room"
                className="rounded-3xl shadow-2xl border border-slate-700/50 object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-5 rounded-2xl shadow-2xl border border-slate-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold">100% Secure</div>
                    <div className="text-xs text-slate-500">Zero Spam Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUSTED AGENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Expert Guidance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Meet Our Top Rated Agents</h2>
          </div>
          <Link
            to="/agents"
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 text-sm group"
          >
            View All Agents <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.slice(0, 3).map((agent) => (
            <div key={agent.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex items-center gap-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/20 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-base">{agent.name}</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 font-medium">{agent.role}</p>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 pt-1">
                  <span className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> {agent.rating}
                  </span>
                  <span>• {agent.propertiesCount} Listed</span>
                </div>
                <Link
                  to={`/agents/${agent.id}`}
                  className="inline-block text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  View Profile & Listings →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Sell or Rent Your Property?</h2>
            <p className="text-blue-100 text-sm">
              Join thousands of property owners reaching thousands of active buyers daily with zero listing fee.
            </p>
          </div>
          <Link
            to="/dashboard/properties/add"
            className="px-8 py-3.5 rounded-2xl bg-white text-blue-900 font-extrabold text-sm shadow-lg hover:bg-blue-50 transition-all shrink-0"
          >
            Post Property For Free
          </Link>
        </div>
      </section>

    </div>
  );
}
