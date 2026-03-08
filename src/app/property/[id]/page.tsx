'use client';
import { use, useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Bed, Bath, Maximize, Star, Heart, Phone, Calendar,
    Share2, BadgeCheck, ArrowLeft, Building2
} from 'lucide-react';
import Link from 'next/link';
import { dummyProperties } from '@/lib/dummy-data';
import ImageGallery from '@/components/ui/ImageGallery';
import PropertyCard from '@/components/ui/PropertyCard';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const property = dummyProperties.find((p) => p.id === id);
    const [saved, setSaved] = useState(false);
    const [showContact, setShowContact] = useState(false);

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
                <div className="text-6xl mb-4">🏠</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h1>
                <p className="text-gray-500 mb-6">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Link
                    href="/search"
                    className="px-6 py-3 bg-[#E53935] text-white font-semibold rounded-xl hover:bg-[#C62828] transition-colors"
                >
                    Browse Properties
                </Link>
            </div>
        );
    }

    const similarProperties = dummyProperties
        .filter((p) => p.id !== property.id && p.city === property.city)
        .slice(0, 4);

    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            {/* Back nav */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/search"
                            className="flex items-center gap-2 text-gray-600 hover:text-[#E53935] transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Search
                        </Link>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSaved(!saved)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-red-50 text-[#E53935]' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#E53935]'
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                                {saved ? 'Saved' : 'Save'}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ImageGallery images={property.images} title={property.title} />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Price */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100"
                        >
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white text-xs font-semibold rounded-full uppercase">
                                    {property.type === 'buy' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'Lease'}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                    {property.propertyType}
                                </span>
                                {property.verified && (
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full flex items-center gap-1">
                                        <BadgeCheck className="w-3 h-3" /> Verified
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[#111] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                                {property.title}
                            </h1>

                            <div className="flex items-center gap-2 text-gray-500 mb-4">
                                <MapPin className="w-4 h-4 text-[#E53935]" />
                                <span>{property.address}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-[#E53935]">{property.priceLabel}</span>
                                <div className="flex items-center gap-1 ml-4">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    <span className="font-semibold">{property.rating}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                                {property.beds > 0 && (
                                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                                        <Bed className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                        <span className="block text-lg font-bold text-[#111]">{property.beds}</span>
                                        <span className="text-xs text-gray-500">Bedrooms</span>
                                    </div>
                                )}
                                {property.baths > 0 && (
                                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                                        <Bath className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                        <span className="block text-lg font-bold text-[#111]">{property.baths}</span>
                                        <span className="text-xs text-gray-500">Bathrooms</span>
                                    </div>
                                )}
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <Maximize className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                    <span className="block text-lg font-bold text-[#111]">{property.area}</span>
                                    <span className="text-xs text-gray-500">Sq. Ft.</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100"
                        >
                            <h2 className="text-lg font-bold text-[#111] mb-3">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{property.description}</p>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100"
                        >
                            <h2 className="text-lg font-bold text-[#111] mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {property.amenities.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700"
                                    >
                                        <span className="w-2 h-2 bg-[#E53935] rounded-full" />
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100"
                        >
                            <h2 className="text-lg font-bold text-[#111] mb-4">Location</h2>
                            <div className="h-64 rounded-xl overflow-hidden">
                                <MapView
                                    properties={[property]}
                                    center={[property.lat, property.lng]}
                                    zoom={14}
                                    className="h-full"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-40"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                    {property.ownerName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#111]">{property.ownerName}</h3>
                                    <p className="text-sm text-gray-500">Property Owner</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowContact(!showContact)}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                                >
                                    <Phone className="w-4 h-4" />
                                    Contact Owner
                                </button>

                                {showContact && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="p-3 bg-green-50 rounded-xl text-center"
                                    >
                                        <p className="text-sm text-gray-600">Phone Number</p>
                                        <p className="text-lg font-bold text-[#111]">{property.ownerPhone}</p>
                                    </motion.div>
                                )}

                                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111] text-white font-semibold rounded-xl hover:bg-[#222] transition-colors">
                                    <Calendar className="w-4 h-4" />
                                    Schedule Visit
                                </button>

                                <button
                                    onClick={() => setSaved(!saved)}
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${saved
                                            ? 'bg-red-50 text-[#E53935] border border-[#E53935]'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                                    {saved ? 'Saved' : 'Save Property'}
                                </button>
                            </div>

                            {/* Quick Info */}
                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Property Type</span>
                                    <span className="font-medium text-[#111]">{property.propertyType}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Furnishing</span>
                                    <span className="font-medium text-[#111]">{property.furnishing}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Listed On</span>
                                    <span className="font-medium text-[#111]">{property.createdAt}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-[#111] mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                            Similar Properties in {property.city}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarProperties.map((p, i) => (
                                <PropertyCard key={p.id} property={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
