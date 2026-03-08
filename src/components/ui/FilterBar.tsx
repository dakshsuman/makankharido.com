'use client';
import { X } from 'lucide-react';

interface FilterBarProps {
    filters: {
        type: string;
        propertyType: string;
        beds: string;
        furnishing: string;
        priceRange: string;
        city: string;
    };
    onFilterChange: (key: string, value: string) => void;
    onClear: () => void;
}

export default function FilterBar({ filters, onFilterChange, onClear }: FilterBarProps) {
    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap items-center gap-3">
                {/* Type */}
                <select
                    value={filters.type}
                    onChange={(e) => onFilterChange('type', e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-50 transition-all cursor-pointer"
                >
                    <option value="">All Types</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                    <option value="lease">Lease</option>
                </select>

                {/* Property Type */}
                <select
                    value={filters.propertyType}
                    onChange={(e) => onFilterChange('propertyType', e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-50 transition-all cursor-pointer"
                >
                    <option value="">Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Plot">Plot</option>
                    <option value="Office">Office</option>
                    <option value="Penthouse">Penthouse</option>
                </select>

                {/* Bedrooms */}
                <select
                    value={filters.beds}
                    onChange={(e) => onFilterChange('beds', e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-50 transition-all cursor-pointer"
                >
                    <option value="">Bedrooms</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                </select>

                {/* Furnishing */}
                <select
                    value={filters.furnishing}
                    onChange={(e) => onFilterChange('furnishing', e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-50 transition-all cursor-pointer"
                >
                    <option value="">Furnishing</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                </select>

                {/* Price Range */}
                <select
                    value={filters.priceRange}
                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-50 transition-all cursor-pointer"
                >
                    <option value="">Price Range</option>
                    <option value="0-5000000">Under ₹50 Lakh</option>
                    <option value="5000000-10000000">₹50L - ₹1 Cr</option>
                    <option value="10000000-30000000">₹1 Cr - ₹3 Cr</option>
                    <option value="30000000-50000000">₹3 Cr - ₹5 Cr</option>
                    <option value="50000000-999999999">₹5 Cr+</option>
                </select>

                {/* City */}
                <select
                    value={filters.city}
                    onChange={(e) => onFilterChange('city', e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-50 transition-all cursor-pointer"
                >
                    <option value="">All Cities</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                </select>

                {/* Clear */}
                {activeFiltersCount > 0 && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-[#E53935] rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear ({activeFiltersCount})
                    </button>
                )}
            </div>
        </div>
    );
}
