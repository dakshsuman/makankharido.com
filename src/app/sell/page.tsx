'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, IndianRupee, ImagePlus, User, ArrowLeft, ArrowRight,
    Check, Upload, X, Home, MapPin
} from 'lucide-react';
import { propertyTypes, cities } from '@/lib/dummy-data';

const steps = [
    { title: 'Property Details', icon: Building2 },
    { title: 'Pricing', icon: IndianRupee },
    { title: 'Upload Images', icon: ImagePlus },
    { title: 'Contact Info', icon: User },
];

export default function SellPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        propertyType: '',
        listingType: 'sell',
        city: '',
        address: '',
        beds: '',
        baths: '',
        area: '',
        furnishing: '',
        description: '',
        price: '',
        priceNegotiable: false,
        maintenanceCharges: '',
        images: [] as string[],
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
    });

    const updateField = (field: string, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

    const handleSubmit = () => {
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-xl"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#111] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                        Property Listed Successfully!
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Your property has been submitted for review. It will be live within 24 hours.
                    </p>
                    <div className="flex gap-3">
                        <a
                            href="/dashboard"
                            className="flex-1 px-6 py-3 bg-[#111] text-white font-semibold rounded-xl hover:bg-[#222] transition-colors text-center"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/"
                            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-center"
                        >
                            Home
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] py-10 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#111]" style={{ fontFamily: 'var(--font-poppins)' }}>
                        List Your Property
                    </h1>
                    <p className="text-gray-500 mt-2">Reach thousands of potential buyers and tenants</p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-10 px-4">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const isActive = i === currentStep;
                        const isCompleted = i < currentStep;
                        return (
                            <div key={step.title} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isCompleted
                                                ? 'bg-emerald-500 text-white'
                                                : isActive
                                                    ? 'bg-gradient-to-r from-[#E53935] to-[#C62828] text-white shadow-lg shadow-red-200'
                                                    : 'bg-gray-100 text-gray-400'
                                            }`}
                                    >
                                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium hidden sm:block ${isActive ? 'text-[#E53935]' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-0.5 w-12 sm:w-20 mx-2 rounded ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <h2 className="text-xl font-bold text-[#111] mb-4">Property Details</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                        placeholder="e.g., Spacious 3BHK Apartment in Bandra"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Listing Type</label>
                                        <select
                                            value={formData.listingType}
                                            onChange={(e) => updateField('listingType', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none cursor-pointer"
                                        >
                                            <option value="sell">Sell</option>
                                            <option value="rent">Rent</option>
                                            <option value="lease">Lease</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Type</label>
                                        <select
                                            value={formData.propertyType}
                                            onChange={(e) => updateField('propertyType', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none cursor-pointer"
                                        >
                                            <option value="">Select Type</option>
                                            {propertyTypes.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                                        <select
                                            value={formData.city}
                                            onChange={(e) => updateField('city', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none cursor-pointer"
                                        >
                                            <option value="">Select City</option>
                                            {cities.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Address</label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => updateField('address', e.target.value)}
                                            placeholder="Full property address"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
                                        <select
                                            value={formData.beds}
                                            onChange={(e) => updateField('beds', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none cursor-pointer"
                                        >
                                            <option value="">Select</option>
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <option key={n} value={n}>{n} BHK</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms</label>
                                        <select
                                            value={formData.baths}
                                            onChange={(e) => updateField('baths', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none cursor-pointer"
                                        >
                                            <option value="">Select</option>
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Area (sqft)</label>
                                        <input
                                            type="number"
                                            value={formData.area}
                                            onChange={(e) => updateField('area', e.target.value)}
                                            placeholder="1200"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Furnishing</label>
                                    <div className="flex gap-3">
                                        {['Furnished', 'Semi-Furnished', 'Unfurnished'].map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => updateField('furnishing', f)}
                                                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${formData.furnishing === f
                                                        ? 'bg-[#E53935] text-white'
                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => updateField('description', e.target.value)}
                                        rows={4}
                                        placeholder="Describe key features, nearby locations, and highlights..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all resize-none"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 1 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <h2 className="text-xl font-bold text-[#111] mb-4">Pricing</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        {formData.listingType === 'rent' || formData.listingType === 'lease' ? 'Monthly Rent (₹)' : 'Price (₹)'}
                                    </label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => updateField('price', e.target.value)}
                                            placeholder="Enter amount"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.priceNegotiable}
                                        onChange={(e) => updateField('priceNegotiable', e.target.checked)}
                                        className="w-4 h-4 accent-[#E53935]"
                                    />
                                    <span className="text-sm text-gray-700">Price is negotiable</span>
                                </label>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Maintenance Charges (₹/month)</label>
                                    <input
                                        type="number"
                                        value={formData.maintenanceCharges}
                                        onChange={(e) => updateField('maintenanceCharges', e.target.value)}
                                        placeholder="Optional"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <h2 className="text-xl font-bold text-[#111] mb-4">Upload Images</h2>
                                <p className="text-sm text-gray-500">Add photos of your property. Good images attract more buyers.</p>

                                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-[#E53935] transition-colors cursor-pointer">
                                    <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-sm font-medium text-gray-600 mb-1">Drag and drop images here</p>
                                    <p className="text-xs text-gray-400">or click to browse files</p>
                                    <p className="text-xs text-gray-400 mt-2">JPG, PNG up to 5MB each. Maximum 10 images.</p>
                                </div>

                                {/* Placeholder uploaded images */}
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={`https://images.unsplash.com/photo-160058515434${i}-be6161a56a0c?w=200`}
                                                alt={`Upload ${i}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <h2 className="text-xl font-bold text-[#111] mb-4">Owner Contact</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.ownerName}
                                        onChange={(e) => updateField('ownerName', e.target.value)}
                                        placeholder="Your full name"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.ownerPhone}
                                        onChange={(e) => updateField('ownerPhone', e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.ownerEmail}
                                        onChange={(e) => updateField('ownerEmail', e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#E53935] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${currentStep === 0
                                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {currentStep < 3 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300"
                            >
                                <Check className="w-4 h-4" />
                                Publish Listing
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
