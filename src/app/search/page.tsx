'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, Map, X } from 'lucide-react';
import PropertyCard from '@/components/ui/PropertyCard';
import FilterBar from '@/components/ui/FilterBar';
import { dummyProperties } from '@/lib/dummy-data';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

function SearchPageContent() {
    const searchParams = useSearchParams();
    const [showMap, setShowMap] = useState(true);
    const [showFilters, setShowFilters] = useState(true);

    const [filters, setFilters] = useState({
        type: searchParams.get('type') || '',
        propertyType: searchParams.get('propertyType') || '',
        beds: searchParams.get('beds') || '',
        furnishing: '',
        priceRange: searchParams.get('budget') || '',
        city: searchParams.get('city') || '',
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ type: '', propertyType: '', beds: '', furnishing: '', priceRange: '', city: '' });
    };

    const filteredProperties = useMemo(() => {
        return dummyProperties.filter((p) => {
            if (filters.type && p.type !== filters.type) return false;
            if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
            if (filters.beds) {
                const bedCount = parseInt(filters.beds);
                if (bedCount === 4) {
                    if (p.beds < 4) return false;
                } else {
                    if (p.beds !== bedCount) return false;
                }
            }
            if (filters.furnishing && p.furnishing !== filters.furnishing) return false;
            if (filters.priceRange) {
                const [min, max] = filters.priceRange.split('-').map(Number);
                if (p.price < min || p.price > max) return false;
            }
            if (filters.city && p.city !== filters.city) return false;
            return true;
        });
    }, [filters]);

    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
                                Properties
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {filteredProperties.length} properties found
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${showFilters ? 'bg-[#E53935] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                            <button
                                onClick={() => setShowMap(!showMap)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${showMap ? 'bg-[#111] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {showMap ? <Grid3X3 className="w-4 h-4" /> : <Map className="w-4 h-4" />}
                                {showMap ? 'Hide Map' : 'Show Map'}
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                        >
                            <FilterBar filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
                <div className={`flex gap-6 ${showMap ? '' : ''}`}>
                    {/* Property Grid */}
                    <div className={`${showMap ? 'flex-1 min-w-0' : 'w-full'}`}>
                        {filteredProperties.length > 0 ? (
                            <div className={`grid gap-6 ${showMap
                                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                }`}>
                                {filteredProperties.map((property, i) => (
                                    <PropertyCard key={property.id} property={property} index={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🏠</div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters to find more properties</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2.5 bg-[#E53935] text-white font-medium rounded-xl hover:bg-[#C62828] transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Map */}
                    {showMap && (
                        <div className="hidden lg:block w-[40%] max-w-[600px] sticky top-40 h-[calc(100vh-200px)]">
                            <MapView properties={filteredProperties} className="h-full" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SearchSkeleton() {
    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-24">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                <div className="flex gap-6">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-4 animate-pulse">
                                <div className="aspect-[4/3] bg-gray-200 rounded-xl w-full"></div>
                                <div className="space-y-3">
                                    <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                                </div>
                                <div className="mt-auto flex gap-4 border-t border-gray-50 pt-3">
                                    <div className="h-4 bg-gray-200 rounded-md w-10"></div>
                                    <div className="h-4 bg-gray-200 rounded-md w-10"></div>
                                    <div className="h-4 bg-gray-200 rounded-md w-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:block w-[40%] max-w-[600px] bg-gray-200 rounded-2xl animate-pulse h-[800px]"></div>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchSkeleton />}>
            <SearchPageContent />
        </Suspense>
    );
}
