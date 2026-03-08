'use client';
import { motion } from 'framer-motion';
import {
  Building2, Home, Warehouse, HandCoins,
  BadgeCheck, Phone, MapPinned,
  ArrowRight, TrendingUp, Shield, Users
} from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import PropertyCard from '@/components/ui/PropertyCard';
import { dummyProperties } from '@/lib/dummy-data';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const categories = [
  {
    title: 'Buy Property',
    description: 'Explore verified homes, apartments, and villas across India',
    icon: Building2,
    href: '/search?type=buy',
    gradient: 'from-red-500 to-rose-600',
    bgLight: 'bg-red-50',
  },
  {
    title: 'Rent Property',
    description: 'Find furnished and semi-furnished rentals near you',
    icon: Home,
    href: '/search?type=rent',
    gradient: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
  },
  {
    title: 'Lease Commercial',
    description: 'Premium office spaces and commercial properties',
    icon: Warehouse,
    href: '/search?type=lease',
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
  },
  {
    title: 'Sell Property',
    description: 'List your property and reach thousands of buyers',
    icon: HandCoins,
    href: '/sell',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Homebuyer in Mumbai',
    quote: 'Found my dream apartment in Bandra within a week. The verified listings gave me so much peace of mind.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    name: 'Rahul Desai',
    role: 'Property Investor',
    quote: 'The direct owner contact feature saved me lakhs in brokerage fees. Easily the best platform out there.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    name: 'Anita Patel',
    role: 'Rented in Bangalore',
    quote: 'The smart map search helped me find a place exactly 5 minutes from my new office. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
];

const stats = [
  { value: '50,000+', label: 'Properties Listed', icon: Building2 },
  { value: '1,00,000+', label: 'Happy Customers', icon: Users },
  { value: '99.5%', label: 'Verified Listings', icon: Shield },
  { value: '25%', label: 'Avg. Savings', icon: TrendingUp },
];

export default function HomePage() {
  const featuredProperties = dummyProperties.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="bg-[#F8F9FA]">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Welcoming modern home"
            className="w-full h-full object-cover"
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center mb-10">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Find Your
              <span className="block bg-gradient-to-r from-[#E53935] to-[#FF8A80] bg-clip-text text-transparent">
                Dream Home
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8"
            >
              Buy, sell, rent, or lease properties across India. Trusted by over 1 lakh happy homeowners.
            </motion.p>
          </div>

          <SearchBar />

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 65C840 70 960 65 1080 55C1200 45 1320 30 1380 22.5L1440 15V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F9FA" />
          </svg>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E53935] text-sm font-semibold rounded-full mb-4">
            🔥 Trending Now
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Featured Properties
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Hand-picked premium properties from across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111] text-white font-semibold rounded-xl hover:bg-[#222] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E53935] text-sm font-semibold rounded-full mb-4">
            🏠 Browse by Category
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
            What Are You Looking For?
          </h2>
        </motion.div>

        <motion.div {...staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={cat.href}
                  className="group block p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`w-14 h-14 ${cat.bgLight} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 bg-gradient-to-r ${cat.gradient} bg-clip-text`} style={{ color: 'inherit' }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#111] mb-2 group-hover:text-[#E53935] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-[#E53935] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS (SOCIAL PROOF) ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E53935] text-sm font-semibold rounded-full mb-4">
              ✨ Trusted by Homeowners
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
              Hear From Our Customers
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Real stories from people who found their perfect property with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
              >
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-[#111] leading-tight">{testimonial.name}</h4>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          {...fadeInUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E53935] to-[#C62828] p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/3" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Join 1 lakh+ happy homeowners who found their perfect property on Makan Kharido
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/search"
                className="px-8 py-3.5 bg-white text-[#E53935] font-semibold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Browse Properties
              </Link>
              <Link
                href="/sell"
                className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
