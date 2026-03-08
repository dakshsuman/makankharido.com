'use client';
import { useEffect, useRef, useState } from 'react';
import { Property } from '@/lib/dummy-data';
import Link from 'next/link';

interface MapViewProps {
    properties: Property[];
    center?: [number, number];
    zoom?: number;
    className?: string;
}

export default function MapView({ properties, center = [20.5937, 78.9629], zoom = 5, className = '' }: MapViewProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const mapInstanceRef = useRef<unknown>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return;

        const initMap = async () => {
            const L = (await import('leaflet')).default;

            // Load leaflet CSS via link tag
            if (!document.querySelector('link[href*="leaflet"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
            }

            if (mapInstanceRef.current) {
                (mapInstanceRef.current as { remove: () => void }).remove();
            }

            const map = L.map(mapRef.current!, {
                scrollWheelZoom: false,
            }).setView(center, zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            properties.forEach((prop) => {
                const priceIcon = L.divIcon({
                    className: 'custom-price-marker',
                    html: `<div style="
            background: linear-gradient(135deg, #E53935, #C62828);
            color: white;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            font-family: Inter, sans-serif;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(229,57,53,0.4);
            cursor: pointer;
            border: 2px solid white;
          ">${prop.priceLabel}</div>`,
                    iconSize: [80, 30],
                    iconAnchor: [40, 15],
                });

                const marker = L.marker([prop.lat, prop.lng], { icon: priceIcon }).addTo(map);

                marker.on('click', () => {
                    setSelectedProperty(prop);
                });
            });

            mapInstanceRef.current = map;

            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                (mapInstanceRef.current as { remove: () => void }).remove();
                mapInstanceRef.current = null;
            }
        };
    }, [properties, center, zoom]);

    return (
        <div className={`relative ${className}`}>
            <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden" />

            {/* Property Preview Popup */}
            {selectedProperty && (
                <div className="absolute bottom-4 left-4 right-4 z-[1000]">
                    <div className="bg-white rounded-2xl shadow-2xl p-3 border border-gray-100">
                        <button
                            onClick={() => setSelectedProperty(null)}
                            className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 text-xs"
                        >
                            ✕
                        </button>
                        <Link href={`/property/${selectedProperty.id}`} className="flex gap-3">
                            <img
                                src={selectedProperty.images[0]}
                                alt={selectedProperty.title}
                                className="w-20 h-20 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-[#111] line-clamp-1">{selectedProperty.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{selectedProperty.address}</p>
                                <p className="text-base font-bold text-[#E53935] mt-1">{selectedProperty.priceLabel}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
