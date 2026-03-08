'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import PropertyCard from '@/components/ui/PropertyCard';
import { dummyProperties } from '@/lib/dummy-data';
import Link from 'next/link';

export default function SavedPage() {
    const [savedIds, setSavedIds] = useState<string[]>(
        dummyProperties.slice(0, 6).map((p) => p.id)
    );

    const savedProperties = dummyProperties.filter((p) => savedIds.includes(p.id));

    const handleToggleSave = (id: string) => {
        setSavedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
                            Saved Properties
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
                        </p>
                    </div>
                    {savedProperties.length > 0 && (
                        <button
                            onClick={() => setSavedIds([])}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-[#E53935] rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </button>
                    )}
                </div>

                {/* Content */}
                {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {savedProperties.map((property, i) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                isSaved={true}
                                onSave={handleToggleSave}
                                index={i}
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-[#E53935]" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700 mb-2">No Saved Properties</h2>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Start exploring and save properties you&apos;re interested in. They&apos;ll appear here for easy access.
                        </p>
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                        >
                            Browse Properties
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
