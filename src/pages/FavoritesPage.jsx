import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function FavoritesPage() {
  const { properties, favorites, toggleFavorite } = useApp();

  const savedProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1">
            <Heart className="w-4 h-4 fill-rose-600" /> Saved Shortlist
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Your Favorite Properties</h1>
          <p className="text-xs text-slate-500 mt-1">
            You have saved {savedProperties.length} properties for price drop tracking and inspection.
          </p>
        </div>

        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
        >
          Explore More Properties <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <div key={property.id} className="relative group">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-14 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Your favorite list is empty</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Click the heart icon on any property card to shortlist homes you love and compare them side by side.
          </p>
          <Link
            to="/properties"
            className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
          >
            Browse Properties
          </Link>
        </div>
      )}

    </div>
  );
}
