import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, Check, X, ArrowLeft, Heart, Sparkles, MapPin, Bed, Bath, Maximize2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ComparePage() {
  const { properties, compareList, toggleCompare, isFavorite, toggleFavorite } = useApp();

  const selectedProperties = properties.filter(p => compareList.includes(p.id));

  const ALL_AMENITIES = ['Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Lift', 'Balcony', 'Power Backup', 'Modular Kitchen'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <Link to="/properties" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Properties
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">Side-by-Side Property Comparison</h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare specs, prices, and amenities across {selectedProperties.length} selected properties.
          </p>
        </div>

        <Link
          to="/properties"
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 self-start sm:self-auto"
        >
          Add More Properties
        </Link>
      </div>

      {selectedProperties.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="p-4 w-48 bg-slate-50 font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                  Specifications
                </th>
                {selectedProperties.map((p) => (
                  <th key={p.id} className="p-4 min-w-[260px] max-w-[300px] border-l border-slate-100">
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                        <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleCompare(p.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">{p.title}</h3>
                      <div className="text-lg font-black text-blue-600">{p.price}</div>
                      
                      <Link
                        to={`/properties/${p.id}`}
                        className="w-full inline-block text-center py-2 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-blue-600 hover:text-white transition-all text-xs"
                      >
                        View Full Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              
              {/* Row: City & State */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">City / Locality</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-semibold">
                    {p.locality ? `${p.locality}, ` : ''}{p.city}
                  </td>
                ))}
              </tr>

              {/* Row: Listing Type */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Listing Type</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                      {p.listingType}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Property Type */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Property Type</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-semibold">{p.propertyType}</td>
                ))}
              </tr>

              {/* Row: Bedrooms */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Bedrooms</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-bold text-slate-900">{p.bedrooms} Beds</td>
                ))}
              </tr>

              {/* Row: Bathrooms */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Bathrooms</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-bold text-slate-900">{p.bathrooms} Baths</td>
                ))}
              </tr>

              {/* Row: Carpet Area */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Carpet Area</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-bold text-slate-900">{p.area} sq.ft</td>
                ))}
              </tr>

              {/* Row: Price / sq.ft */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Price Rate</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-semibold text-slate-500">
                    {p.pricePerSqFt || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Row: Furnishing */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Furnishing</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">{p.furnishing || 'N/A'}</td>
                ))}
              </tr>

              {/* Row: Facing */}
              <tr>
                <td className="p-4 bg-slate-50 font-bold text-slate-900">Facing</td>
                {selectedProperties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">{p.facing || 'East Facing'}</td>
                ))}
              </tr>

              {/* Amenities Rows */}
              {ALL_AMENITIES.map(amenity => (
                <tr key={amenity}>
                  <td className="p-4 bg-slate-50 font-bold text-slate-700">{amenity}</td>
                  {selectedProperties.map(p => {
                    const hasAmenity = p.amenities?.includes(amenity);
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center">
                        {hasAmenity ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center mx-auto">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-14 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Building className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No properties selected to compare</h3>
          <p className="text-slate-500 text-xs">
            Browse our properties directory and click the compare icon to compare up to 4 properties side-by-side.
          </p>
          <Link to="/properties" className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">
            Browse Directory
          </Link>
        </div>
      )}

    </div>
  );
}
