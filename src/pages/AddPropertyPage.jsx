import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, DollarSign, Home, Image, Upload, Check, Save, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AddPropertyPage() {
  const { addProperty, currentUser } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    propertyType: 'Apartment',
    listingType: 'For Sale',
    description: '',
    address: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    locality: 'Malviya Nagar',
    zipCode: '302017',
    price: '',
    rawPrice: 8500000,
    maintenance: '₹3,500 / mo',
    deposit: '2 Months Rent',
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    floor: '8th Floor',
    totalFloors: '14 Floors',
    parking: 2,
    builtYear: 2023,
    facing: 'East Facing',
    furnishing: 'Fully Furnished',
    amenities: ['Parking', 'Lift', 'Gym', 'Swimming Pool', 'Garden', 'Security', 'Power Backup', 'Balcony'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    ownerName: currentUser?.name || 'Rahul Sharma',
    phone: '+91 6375521991',
    email: currentUser?.email || 'hello@aianthro.com'
  });

  const ALL_AMENITIES = ['Parking', 'Lift', 'Gym', 'Swimming Pool', 'Garden', 'Security', 'Power Backup', 'Balcony', 'Modular Kitchen', 'Clubhouse'];

  const toggleAmenity = (amenity) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev, amenity]
    }));
  };

  const handleSubmit = (status = 'Published') => {
    if (!form.title || !form.price || !form.city) {
      alert('Please fill in required fields (Title, Price, City)');
      return;
    }

    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const createdProp = addProperty({
      ...form,
      slug,
      status,
      price: form.price.startsWith('₹') ? form.price : `₹${form.price}`,
      rawPrice: parseFloat(form.price.replace(/[^0-9.]/g, '')) || 8500000,
      images: [
        form.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
      ]
    });

    navigate('/dashboard/properties');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900">Add New Property</h1>
        <p className="text-xs text-slate-500 mt-1">Publish your property on EstateHub for maximum buyer visibility.</p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Section 1: Basic Info */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" /> Basic Information
          </h3>

          <div className="space-y-3 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1">Property Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Luxury 3 BHK Sky Villa"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Property Type</label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Listing Type</label>
                <select
                  value={form.listingType}
                  onChange={(e) => setForm({ ...form, listingType: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1">Detailed Description</label>
              <textarea
                rows={4}
                placeholder="Highlight key luxury amenities, neighborhood details, connectivity..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Location */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Location Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
            <div className="sm:col-span-2">
              <label className="block mb-1">Street Address</label>
              <input
                type="text"
                placeholder="Apex Tower, Malviya Nagar"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">City *</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              >
                <option value="Jaipur">Jaipur</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Pricing & Specs */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" /> Pricing & Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1">Expected Price (₹) *</label>
              <input
                type="text"
                required
                placeholder="e.g. ₹85 Lakhs or 8500000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block mb-1">Bedrooms</label>
              <input
                type="number"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: parseInt(e.target.value, 10) })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">Bathrooms</label>
              <input
                type="number"
                value={form.bathrooms}
                onChange={(e) => setForm({ ...form, bathrooms: parseInt(e.target.value, 10) })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">Carpet Area (sq.ft)</label>
              <input
                type="number"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: parseFloat(e.target.value) })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">Parking Slots</label>
              <input
                type="number"
                value={form.parking}
                onChange={(e) => setForm({ ...form, parking: parseInt(e.target.value, 10) })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">Furnishing</label>
              <select
                value={form.furnishing}
                onChange={(e) => setForm({ ...form, furnishing: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
              >
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Amenities Checklist */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" /> Select Amenities
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
            {ALL_AMENITIES.map((amenity) => (
              <label
                key={amenity}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  form.amenities.includes(amenity)
                    ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 5: Media Upload */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Image className="w-5 h-5 text-blue-600" /> Image Photography URL
          </h3>

          <div className="space-y-2 text-xs font-semibold text-slate-700">
            <label className="block">High Resolution Image URL</label>
            <input
              type="text"
              placeholder="Paste stock photo URL..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
            />
            {form.imageUrl && (
              <div className="mt-2 h-36 w-60 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => handleSubmit('Draft')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('Published')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Publish Property Now
          </button>
        </div>

      </div>

    </div>
  );
}
