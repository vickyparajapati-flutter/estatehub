import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bed, Bath, Maximize2, Car, Layers, MapPin, CheckCircle, Heart, 
  Share2, ShieldCheck, Phone, Mail, MessageSquare, Send, Sparkles, 
  Calendar, Home, FileText, Check, ArrowLeft, Maximize, ArrowLeftRight, Download, Train, Navigation, Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import EmiCalculator from '../components/EmiCalculator';
import SiteVisitModal from '../components/SiteVisitModal';
import PropertyBrochureModal from '../components/PropertyBrochureModal';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { properties, isFavorite, toggleFavorite, isComparing, toggleCompare, addInquiry, triggerToast } = useApp();

  const property = properties.find(p => p.id === id || p.slug === id) || properties[0];
  const favorite = isFavorite(property.id);
  const comparing = isComparing(property.id);

  // Modal States
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  // Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I am interested in ${property.title} (${property.propertyId}). Please arrange a site inspection.`
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone) {
      triggerToast('Please fill in all required contact details.', 'error');
      return;
    }

    addInquiry({
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      message: inquiryForm.message,
      propertyId: property.id,
      propertyTitle: property.title,
      agentId: property.agent?.id || 'agent-1',
      agentName: property.agent?.name || 'Rahul Sharma'
    });

    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: `Hi, I am interested in ${property.title}.`
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property on EstateHub: ${property.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('Property link copied to clipboard!', 'info');
    }
  };

  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <Link to="/properties" className="inline-flex items-center gap-1.5 text-blue-600 hover:underline font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>
        <div className="flex items-center gap-2">
          <span>{property.city}</span> / <span>{property.propertyType}</span> / <span className="text-slate-800 font-bold">{property.propertyId}</span>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <section className="space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
          
          {/* Main Hero Image */}
          <div className="lg:col-span-2 relative h-[380px] sm:h-[480px] group cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <img
              src={galleryImages[selectedImage]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 hover:bg-slate-900"
            >
              <Maximize className="w-4 h-4" /> View Fullscreen Gallery ({galleryImages.length})
            </button>
          </div>

          {/* Side Thumbnail Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3 p-3 bg-slate-950">
            {galleryImages.slice(0, 4).map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative rounded-2xl overflow-hidden h-[225px] transition-all border-2 ${
                  selectedImage === idx ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* Thumbnail Selector Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                selectedImage === idx ? 'border-blue-600 opacity-100' : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* PROPERTY HEADER & QUICK ACTIONS */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                {property.listingType}
              </span>
              {property.verified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Property
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {property.propertyType}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">{property.title}</h1>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.address}</span>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900">{property.price}</div>
              {property.pricePerSqFt && (
                <span className="text-xs font-bold text-slate-400 block text-left lg:text-right">{property.pricePerSqFt}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSiteVisitOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" /> Book Site Visit
              </button>
              <button
                onClick={() => setBrochureOpen(true)}
                className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5"
                title="Download Brochure"
              >
                <Download className="w-4 h-4" /> Brochure
              </button>
              <button
                onClick={() => toggleCompare(property.id)}
                className={`p-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 ${
                  comparing ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Compare Property"
              >
                <ArrowLeftRight className="w-4 h-4" /> {comparing ? 'Comparing' : 'Compare'}
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavorite(property.id)}
                className={`p-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 ${
                  favorite ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Key Features Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0"><Bed className="w-5 h-5" /></div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Bedrooms</div>
              <div className="text-base font-extrabold text-slate-900">{property.bedrooms} Beds</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0"><Bath className="w-5 h-5" /></div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Bathrooms</div>
              <div className="text-base font-extrabold text-slate-900">{property.bathrooms} Baths</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0"><Maximize2 className="w-5 h-5" /></div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Area</div>
              <div className="text-base font-extrabold text-slate-900">{property.area} sq.ft</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0"><Car className="w-5 h-5" /></div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Parking</div>
              <div className="text-base font-extrabold text-slate-900">{property.parking} Parking</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0"><Layers className="w-5 h-5" /></div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Floor</div>
              <div className="text-base font-extrabold text-slate-900 truncate">{property.floor}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: DESCRIPTION, AMENITIES, MAP, EMI CALCULATOR */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Description
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" /> Property Features & Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities?.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs font-bold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NEIGHBORHOOD & CONNECTIVITY SCORE WIDGET */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" /> Neighborhood & Infrastructure Score
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                Score: 9.4 / 10
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  <Train className="w-4 h-4" /> Transit & Metro
                </div>
                <div className="text-slate-900 font-extrabold text-sm">Metro Station 0.4 km</div>
                <div className="text-[11px] text-slate-400">5 Mins Walkable Access</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <Home className="w-4 h-4" /> Schools & Healthcare
                </div>
                <div className="text-slate-900 font-extrabold text-sm">Top Schools 1.2 km</div>
                <div className="text-[11px] text-slate-400">Fortis Hospital 2.5 km</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Shield className="w-4 h-4" /> Locality Appreciation
                </div>
                <div className="text-slate-900 font-extrabold text-sm">+14.2% Growth</div>
                <div className="text-[11px] text-slate-400">High Investment Potential</div>
              </div>
            </div>
          </div>

          {/* EMI CALCULATOR INTEGRATION */}
          <EmiCalculator defaultPrice={property.rawPrice || 8500000} />

          {/* Location Map */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Location Map
            </h3>
            <p className="text-xs text-slate-500">
              {property.locality}, {property.city}, {property.state}
            </p>
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="Map Placeholder"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="relative z-10 text-center space-y-2 p-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-white font-bold text-sm">{property.locality}, {property.city}</div>
                <div className="text-xs text-slate-300">Exact GPS address available upon booking inspection</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AGENT CARD & INQUIRY FORM */}
        <div className="space-y-6">
          
          {/* Agent Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-5">
            <div className="flex items-center gap-4">
              <img
                src={property.agent?.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                alt={property.agent?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-slate-900 text-base">{property.agent?.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-xs text-slate-500 font-medium">{property.agent?.role}</p>
                <div className="text-xs text-slate-600 mt-1 font-semibold">
                  Experience: <span className="text-slate-900 font-bold">{property.agent?.experience}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 font-semibold text-slate-700">
              <span>Rating: ⭐ {property.agent?.rating || 4.8}/5.0</span>
              <Link to={`/agents/${property.agent?.id || 'agent-1'}`} className="text-blue-600 hover:underline">View Profile →</Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${property.agent?.phone}`}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" /> Call Agent
              </a>
              <a
                href={`https://wa.me/${property.agent?.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-4">
            <div>
              <h4 className="text-lg font-extrabold text-white">Send Property Inquiry</h4>
              <p className="text-xs text-slate-400">Fill out your details to get an instant callback from our advisor.</p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Message</label>
                <textarea
                  rows={3}
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* MODALS */}
      <SiteVisitModal
        property={property}
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
      />

      <PropertyBrochureModal
        property={property}
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      {/* LIGHTBOX FULLSCREEN PREVIEW MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-bold">{selectedImage + 1} of {galleryImages.length}</span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
            >
              Close ✕
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={galleryImages[selectedImage]}
              alt="Fullscreen Preview"
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-blue-500 opacity-100' : 'border-transparent opacity-40'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
