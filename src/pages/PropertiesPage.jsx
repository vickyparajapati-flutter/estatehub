import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, Search, SlidersHorizontal, RotateCcw, X, ChevronDown, LayoutGrid, ListFilter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function PropertiesPage() {
  const { properties } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States initialized from URL or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'All');
  const [listingType, setListingType] = useState(searchParams.get('type') || 'All'); // 'buy', 'rent', or 'All'
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'All');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'popular'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync URL state updates
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) setLocationFilter(loc);
    const type = searchParams.get('type');
    if (type) setListingType(type);
    const pType = searchParams.get('propertyType');
    if (pType) setPropertyType(pType);
  }, [searchParams]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('All');
    setListingType('All');
    setPropertyType('All');
    setBedrooms('Any');
    setBathrooms('Any');
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
    setSelectedAmenities([]);
    setSortBy('newest');
    setSearchParams({});
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Keyword search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesLocality = prop.locality?.toLowerCase().includes(query);
        const matchesType = prop.propertyType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCity && !matchesLocality && !matchesType) return false;
      }

      // Location filter
      if (locationFilter !== 'All' && prop.city.toLowerCase() !== locationFilter.toLowerCase()) {
        return false;
      }

      // Listing Type filter (For Sale vs For Rent)
      if (listingType !== 'All') {
        if (listingType.toLowerCase() === 'buy' && prop.listingType !== 'For Sale') return false;
        if (listingType.toLowerCase() === 'rent' && prop.listingType !== 'For Rent') return false;
      }

      // Property Type filter
      if (propertyType !== 'All' && prop.propertyType.toLowerCase() !== propertyType.toLowerCase()) {
        return false;
      }

      // Bedrooms
      if (bedrooms !== 'Any') {
        const requiredBeds = parseInt(bedrooms, 10);
        if (prop.bedrooms < requiredBeds) return false;
      }

      // Bathrooms
      if (bathrooms !== 'Any') {
        const requiredBaths = parseInt(bathrooms, 10);
        if (prop.bathrooms < requiredBaths) return false;
      }

      // Min/Max Price
      if (minPrice && prop.rawPrice < parseFloat(minPrice)) return false;
      if (maxPrice && prop.rawPrice > parseFloat(maxPrice)) return false;

      // Min/Max Area
      if (minArea && prop.area < parseFloat(minArea)) return false;
      if (maxArea && prop.area > parseFloat(maxArea)) return false;

      // Amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => prop.amenities?.includes(a));
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.rawPrice - b.rawPrice;
      if (sortBy === 'price-high') return b.rawPrice - a.rawPrice;
      if (sortBy === 'popular') return b.views - a.views;
      // Default newest
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  }, [
    properties, searchTerm, locationFilter, listingType, propertyType, 
    bedrooms, bathrooms, minPrice, maxPrice, minArea, maxArea, selectedAmenities, sortBy
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const ALL_AMENITIES = ['Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Lift', 'Balcony', 'Power Backup', 'Modular Kitchen'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Quick Search Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white space-y-6 shadow-xl">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Property Directory</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">Explore Properties</h1>
          <p className="text-slate-300 text-sm mt-2">
            Browse through {filteredProperties.length} verified listings across India with real-time filters and detailed floor plans.
          </p>
        </div>

        {/* Global Keyword Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-lg text-slate-800">
          <div className="flex-1 flex items-center gap-2 px-3 w-full">
            <Search className="w-5 h-5 text-blue-600 shrink-0" />
            <input
              type="text"
              placeholder="Search by city, locality, project name or keyword..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full py-2 bg-transparent text-sm focus:outline-none font-medium placeholder-slate-400"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Main Grid Layout: Left Filters + Right Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" /> Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-5 text-xs font-semibold text-slate-700">
            
            {/* Listing Type Toggle */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Listing Type</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {['All', 'buy', 'rent'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setListingType(type); setCurrentPage(1); }}
                    className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      listingType.toLowerCase() === type.toLowerCase()
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type === 'buy' ? 'For Sale' : type === 'rent' ? 'For Rent' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* City Location */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">City / Metro</label>
              <select
                value={locationFilter}
                onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Cities</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Noida">Noida</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => { setPropertyType(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
                <option value="Office">Office</option>
              </select>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => { setBedrooms(e.target.value); setCurrentPage(1); }}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bathrooms</label>
                <select
                  value={bathrooms}
                  onChange={(e) => { setBathrooms(e.target.value); setCurrentPage(1); }}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            {/* Price Min / Max */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Price Range (₹)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Area Min / Max */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Area (sq.ft)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min sqft"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max sqft"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Amenities</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {ALL_AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT PROPERTY LISTINGS GRID */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Sort & Count Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80">
            <div className="text-sm font-semibold text-slate-600">
              Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> properties
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills */}
          {(locationFilter !== 'All' || listingType !== 'All' || propertyType !== 'All' || bedrooms !== 'Any' || selectedAmenities.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-400">Active Filters:</span>
              {locationFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Location: {locationFilter} <button onClick={() => setLocationFilter('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {listingType !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Type: {listingType === 'buy' ? 'For Sale' : 'For Rent'} <button onClick={() => setListingType('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {propertyType !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Category: {propertyType} <button onClick={() => setPropertyType('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {bedrooms !== 'Any' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Beds: {bedrooms}+ BHK <button onClick={() => setBedrooms('Any')}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-rose-600 hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Property Cards Grid */}
          {paginatedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No properties found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                We couldn't find any properties matching your exact criteria. Try clearing some filters or searching a broader city.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}

        </main>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-600" /> Filter Options
              </h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Filter Controls */}
            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-2">
                <label className="text-slate-400 uppercase tracking-wider block">City Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <option value="All">All Cities</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 uppercase tracking-wider block">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 uppercase tracking-wider block">Bedrooms</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Any', '1', '2', '3', '4'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedrooms(b)}
                      className={`py-2 rounded-xl border text-xs font-bold ${bedrooms === b ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    >
                      {b === 'Any' ? 'Any' : `${b}+ BHK`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg mt-6"
              >
                Apply Filters ({filteredProperties.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
