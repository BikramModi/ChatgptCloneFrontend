import { useEffect, useState } from "react";
import ImageCarouselCard from "../common/ImageCarouselCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
];

const ImageCarouselList = ({ interval = 3500 }) => {
  const [current, setCurrent] = useState(0);

  // 🔁 Auto slide
  useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-6">
      {/* 🌈 Outer Frame */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl group">

        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <ImageCarouselCard key={index} src={img} index={index} />
          ))}
        </div>

        {/* 🌫️ Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* ⬅️ Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition hover:scale-110"
        >
          <ChevronLeft className="text-gray-800" size={24} />
        </button>

        {/* ➡️ Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition hover:scale-110"
        >
          <ChevronRight className="text-gray-800" size={24} />
        </button>

        {/* ⚪ Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur px-4 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarouselList;
