'use client';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Maximize, Star, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { Property } from '@/lib/dummy-data';

interface PropertyCardProps {
    property: Property;
    onSave?: (id: string) => void;
    isSaved?: boolean;
    index?: number;
}

export default function PropertyCard({ property, onSave, isSaved = false, index = 0 }: PropertyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
        >
            <Link href={`/property/${property.id}`}>
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                            {property.type === 'buy' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : property.type === 'lease' ? 'Lease' : 'Sell'}
                        </span>
                        {property.verified && (
                            <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                                <BadgeCheck className="w-3 h-3" /> Verified
                            </span>
                        )}
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 left-3">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[#111] text-lg font-bold rounded-xl shadow-lg">
                            {property.priceLabel}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/property/${property.id}`} className="flex-1">
                        <h3 className="font-semibold text-[#111] text-base line-clamp-1 group-hover:text-[#E53935] transition-colors">
                            {property.title}
                        </h3>
                    </Link>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onSave?.(property.id);
                        }}
                        className={`p-2 rounded-full transition-all duration-300 ${isSaved
                                ? 'bg-red-50 text-[#E53935]'
                                : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-[#E53935]'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                </div>

                <div className="flex items-center gap-1 mt-1.5 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                    <span className="text-sm truncate">{property.address}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    {property.beds > 0 && (
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <Bed className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium">{property.beds}</span>
                        </div>
                    )}
                    {property.baths > 0 && (
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <Bath className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium">{property.baths}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <Maximize className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{property.area} sqft</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-gray-700">{property.rating}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
