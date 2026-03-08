'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Home, Heart, Settings, Plus, Edit3, Trash2,
    Eye, MapPin, Bed, Bath, Maximize, TrendingUp, Users, Building2
} from 'lucide-react';
import Link from 'next/link';
import PropertyCard from '@/components/ui/PropertyCard';
import { dummyProperties } from '@/lib/dummy-data';

const tabs = [
    { label: 'My Listings', icon: Building2 },
    { label: 'Saved Properties', icon: Heart },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState(0);

    // Simulate user's listings (first 4 properties)
    const myListings = dummyProperties.slice(0, 4);
    const savedProperties = dummyProperties.slice(5, 9);

    const stats = [
        { label: 'Active Listings', value: '4', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Total Views', value: '2,847', icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Inquiries', value: '36', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Saved', value: savedProperties.length.toString(), icon: Heart, color: 'text-[#E53935]', bg: 'bg-red-50' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
                            Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">Welcome back! Manage your properties and saved listings.</p>
                    </div>
                    <Link
                        href="/sell"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                    >
                        <Plus className="w-5 h-5" />
                        Add Property
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-5 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-[#111]">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6">
                    {tabs.map((tab, i) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(i)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === i
                                        ? 'bg-[#111] text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                {activeTab === 0 && (
                    <div className="space-y-4">
                        {myListings.map((property) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row gap-4"
                            >
                                <Link href={`/property/${property.id}`} className="w-full sm:w-48 shrink-0">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-36 sm:h-full rounded-xl object-cover"
                                    />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <Link href={`/property/${property.id}`} className="text-lg font-semibold text-[#111] hover:text-[#E53935] transition-colors">
                                                {property.title}
                                            </Link>
                                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                                <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                                                {property.address}
                                            </div>
                                        </div>
                                        <span className="text-xl font-bold text-[#E53935] whitespace-nowrap">{property.priceLabel}</span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3">
                                        {property.beds > 0 && (
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Bed className="w-4 h-4" /> {property.beds} Bed
                                            </span>
                                        )}
                                        {property.baths > 0 && (
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Bath className="w-4 h-4" /> {property.baths} Bath
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1 text-sm text-gray-500">
                                            <Maximize className="w-4 h-4" /> {property.area} sqft
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <Link
                                            href={`/property/${property.id}`}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            View
                                        </Link>
                                        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                            <Edit3 className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                        <button className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-[#E53935] rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {savedProperties.map((property, i) => (
                            <PropertyCard key={property.id} property={property} isSaved={true} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
