import React from 'react';
import { Building2, MapPin, Printer, Download, X, ShieldCheck, Check } from 'lucide-react';

export default function PropertyBrochureModal({ property, isOpen, onClose }) {
  if (!isOpen || !property) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 relative border border-slate-200">
        
        {/* Modal Top Bar (hidden during print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" /> EstateHub Official Property Brochure
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-800">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">EstateHub</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Verified</span>
              </div>
              <p className="text-[11px] text-slate-500">Find a Place You'll Love to Live • RERA Certified</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">ID: {property.propertyId}</span>
              <span className="text-2xl font-black text-blue-600">{property.price}</span>
            </div>
          </div>

          {/* Title & Image */}
          <div className="space-y-3">
            <h1 className="text-2xl font-black text-slate-900">{property.title}</h1>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" /> {property.address}
            </p>

            <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={property.images?.[0]} alt={property.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl text-center text-xs font-semibold">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Bedrooms</span>
              <span className="font-extrabold text-slate-900 text-sm">{property.bedrooms} BHK</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Bathrooms</span>
              <span className="font-extrabold text-slate-900 text-sm">{property.bathrooms} Baths</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Carpet Area</span>
              <span className="font-extrabold text-slate-900 text-sm">{property.area} sq.ft</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Facing</span>
              <span className="font-extrabold text-slate-900 text-sm">{property.facing || 'East'}</span>
            </div>
          </div>

          {/* Summary & Amenities */}
          <div className="space-y-3 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm">Property Description</h3>
            <p className="text-slate-600 leading-relaxed">{property.description}</p>
          </div>

          <div className="space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm">Key Amenities</h3>
            <div className="grid grid-cols-3 gap-2">
              {property.amenities?.map(a => (
                <div key={a} className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs bg-slate-900 text-white p-4 rounded-2xl">
            <div>
              <span className="text-[10px] text-blue-400 uppercase font-bold block">Listing Consultant</span>
              <span className="font-bold text-sm">{property.agent?.name || 'Rahul Sharma'}</span>
              <span className="block text-[11px] text-slate-400">{property.agent?.role}</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-white">{property.agent?.phone || '+91 6375521991'}</span>
              <span className="block text-[11px] text-slate-400">{property.agent?.email || 'hello@aianthro.com'}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
