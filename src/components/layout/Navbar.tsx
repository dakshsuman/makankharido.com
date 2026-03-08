'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, Home, Search, PlusCircle, LayoutDashboard } from 'lucide-react';

const navLinks = [
    { label: 'Buy', href: '/search?type=buy', icon: Home },
    { label: 'Rent', href: '/search?type=rent', icon: Search },
    { label: 'Sell', href: '/sell', icon: PlusCircle },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-xl flex items-center justify-center shadow-lg shadow-red-200 group-hover:shadow-red-300 transition-shadow">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#E53935] to-[#111] bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-heading)' }}>
                            Makan Kharido
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#E53935] rounded-lg hover:bg-red-50 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/saved"
                            className="p-2.5 text-gray-500 hover:text-[#E53935] hover:bg-red-50 rounded-xl transition-all duration-200"
                        >
                            <Heart className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <User className="w-4 h-4" />
                            Login
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-[#E53935] rounded-xl hover:bg-red-50 transition-colors"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#E53935] hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                );
                            })}
                            <hr className="my-2 border-gray-100" />
                            <Link
                                href="/saved"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#E53935] hover:bg-red-50 rounded-xl transition-all"
                            >
                                <Heart className="w-5 h-5" />
                                <span className="font-medium">Saved</span>
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 mt-2 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white rounded-xl font-medium"
                            >
                                <User className="w-5 h-5" />
                                <span>Login / Sign Up</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
