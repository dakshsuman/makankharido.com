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
            await import('leaflet.markercluster');

            // Load leaflet CSS via link tag
            if (!document.querySelector('link[href*="leaflet"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);

                const linkCluster = document.createElement('link');
                linkCluster.rel = 'stylesheet';
                linkCluster.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css';
                document.head.appendChild(linkCluster);

                const linkClusterDefault = document.createElement('link');
                linkClusterDefault.rel = 'stylesheet';
                linkClusterDefault.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css';
                document.head.appendChild(linkClusterDefault);
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

            const markersGroup = L.markerClusterGroup({
                chunkedLoading: true,
                showCoverageOnHover: false,
                iconCreateFunction: function (cluster) {
                    const count = cluster.getChildCount();
                    return L.divIcon({
                        className: 'custom-cluster-marker',
                        html: `<div style="
                background: linear-gradient(135deg, #111111, #333333);
                color: white;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-size: 14px;
                font-weight: 700;
                font-family: Inter, sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                border: 2px solid white;
              ">${count}</div>`,
                        iconSize: [36, 36],
                        iconAnchor: [18, 18],
                    });
                }
            });

            const markers: Array<[number, number]> = [];

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

                const coordinate: [number, number] = [prop.lat, prop.lng];
                markers.push(coordinate);

                const marker = L.marker(coordinate, { icon: priceIcon });

                marker.on('click', () => {
                    setSelectedProperty(prop);
                });

                markersGroup.addLayer(marker);
            });

            map.addLayer(markersGroup);

            // Dynamic Map Bounding: Fit map to visible properties
            if (markers.length > 0) {
                const bounds = L.latLngBounds(markers);
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
            }

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
