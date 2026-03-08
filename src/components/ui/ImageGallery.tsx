'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            {/* Main Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                <Swiper
                    modules={[Navigation, Pagination, Thumbs]}
                    navigation={{
                        nextEl: '.gallery-next',
                        prevEl: '.gallery-prev',
                    }}
                    pagination={{ clickable: true }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="aspect-[16/9] md:aspect-[2/1]"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={img}
                                alt={`${title} - Image ${i + 1}`}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => setFullscreen(true)}
                            />
                        </SwiperSlide>
                    ))}

                    {/* Custom Nav Buttons */}
                    <button className="gallery-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-lg transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="gallery-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-lg transition-all">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </Swiper>

                {/* Counter */}
                <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="mt-3">
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        slidesPerView={Math.min(images.length, 5)}
                        spaceBetween={8}
                        watchSlidesProgress
                        className="thumbs-gallery"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={img}
                                    alt={`Thumbnail ${i + 1}`}
                                    className={`w-full aspect-[4/3] object-cover rounded-xl cursor-pointer border-2 transition-all ${activeIndex === i ? 'border-[#E53935] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* Fullscreen Modal */}
            {fullscreen && (
                <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
                    <button
                        onClick={() => setFullscreen(false)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        initialSlide={activeIndex}
                        className="w-full max-w-5xl"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex items-center justify-center h-[80vh]">
                                    <img
                                        src={img}
                                        alt={`${title} - Image ${i + 1}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
