'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, IndianRupee, BedDouble, ChevronDown } from 'lucide-react';
import { cities, propertyTypes } from '@/lib/dummy-data';

export default function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [budget, setBudget] = useState('');
    const [bedrooms, setBedrooms] = useState('');

    const budgetOptions = [
        { label: 'Under ₹50 Lakh', value: '0-5000000' },
        { label: '₹50L - ₹1 Cr', value: '5000000-10000000' },
        { label: '₹1 Cr - ₹3 Cr', value: '10000000-30000000' },
        { label: '₹3 Cr - ₹5 Cr', value: '30000000-50000000' },
        { label: '₹5 Cr+', value: '50000000-999999999' },
    ];

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set('city', location);
        if (propertyType) params.set('propertyType', propertyType);
        if (budget) params.set('budget', budget);
        if (bedrooms) params.set('beds', bedrooms);
        router.push(`/search?${params.toString()}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/8 p-3 border border-white/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {/* Location */}
                    <div className="relative group">
                        <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                            <MapPin className="w-5 h-5 text-[#E53935] shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Location</label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none cursor-pointer appearance-none"
                                >
                                    <option value="">Any City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="relative group">
                        <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                            <Home className="w-5 h-5 text-[#E53935] shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Property Type</label>
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none cursor-pointer appearance-none"
                                >
                                    <option value="">All Types</option>
                                    {propertyTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="relative group">
                        <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                            <IndianRupee className="w-5 h-5 text-[#E53935] shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Budget</label>
                                <select
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none cursor-pointer appearance-none"
                                >
                                    <option value="">Any Budget</option>
                                    {budgetOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="relative group">
                        <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                            <BedDouble className="w-5 h-5 text-[#E53935] shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Bedrooms</label>
                                <select
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none cursor-pointer appearance-none"
                                >
                                    <option value="">Any</option>
                                    <option value="1">1 BHK</option>
                                    <option value="2">2 BHK</option>
                                    <option value="3">3 BHK</option>
                                    <option value="4">4+ BHK</option>
                                </select>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    className="w-full mt-3 px-6 py-3.5 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                >
                    <Search className="w-5 h-5" />
                    Search Properties
                </motion.button>
            </div>
        </motion.div>
    );
}
