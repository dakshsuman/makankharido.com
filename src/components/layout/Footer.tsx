import Link from 'next/link';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

const footerSections = [
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Buy',
        links: [
            { label: 'Apartments', href: '/search?type=buy&propertyType=Apartment' },
            { label: 'Villas', href: '/search?type=buy&propertyType=Villa' },
            { label: 'Plots', href: '/search?type=buy&propertyType=Plot' },
            { label: 'Houses', href: '/search?type=buy&propertyType=House' },
        ],
    },
    {
        title: 'Rent',
        links: [
            { label: 'Apartments', href: '/search?type=rent&propertyType=Apartment' },
            { label: 'Offices', href: '/search?type=lease&propertyType=Office' },
            { label: 'PG / Co-Living', href: '/search?type=rent' },
            { label: 'Short Stay', href: '/search?type=rent' },
        ],
    },
    {
        title: 'Sell',
        links: [
            { label: 'Post Property', href: '/sell' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Owner Dashboard', href: '/dashboard' },
            { label: 'Tips & Guides', href: '/guides' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Help Center', href: '/help' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-gray-300">
            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-xl flex items-center justify-center">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                Makan Kharido
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-4 max-w-xs">
                            India&apos;s most trusted platform for buying, selling, and renting properties.
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#E53935]" />
                                <span>hello@makankharido.in</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#E53935]" />
                                <span>+91 1800-123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#E53935]" />
                                <span>Mumbai, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-[#E53935] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © 2026 Makan Kharido. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-[#E53935] transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-[#E53935] transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-[#E53935] transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
