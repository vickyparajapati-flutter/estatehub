import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize2, MapPin, CheckCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(property.id);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Header & Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
            {property.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold shadow-sm">
                <Sparkles className="w-3 h-3 fill-slate-950" /> Featured
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${property.listingType === 'For Rent' ? 'bg-indigo-600' : 'bg-blue-600'}`}>
              {property.listingType}
            </span>
            {property.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold shadow-sm">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Heart / Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
              favorite
                ? 'bg-rose-500 text-white shadow-lg scale-110'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-500 shadow-md'
            }`}
            title={favorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
          </button>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-3.5 z-10">
            <span className="text-xl sm:text-2xl font-black text-white drop-shadow-md tracking-tight">
              {property.price}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              {property.propertyType}
            </span>
            {property.propertyId && (
              <span className="text-[11px] text-slate-400 font-mono font-medium">
                ID: {property.propertyId}
              </span>
            )}
          </div>

          <Link to={`/properties/${property.id}`} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{property.locality ? `${property.locality}, ` : ''}{property.city}, {property.state}</span>
          </div>

          {/* Specs Bar */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-slate-600 text-xs font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
              <Bed className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
              <Bath className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
              <Maximize2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.area} sq.ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="px-5 pb-5 pt-1">
        <Link
          to={`/properties/${property.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
        >
          View Details <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
