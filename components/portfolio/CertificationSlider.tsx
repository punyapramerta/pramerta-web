"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CertificationSliderProps {
  images: string[];
}

export default function CertificationSlider({ images }: CertificationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 3) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1300);
    
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  // Duplicate images for infinite sliding effect
  const sliderImages = [...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden relative py-4">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * (100 / 3)}%)`,
        }}
      >
        {sliderImages.map((src, idx) => (
          <div 
            key={`${idx}`}
            className="flex-none w-1/3 px-3"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm bg-white hover:shadow-lg transition-shadow">
              <Image
                src={src}
                alt={`Certification`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
