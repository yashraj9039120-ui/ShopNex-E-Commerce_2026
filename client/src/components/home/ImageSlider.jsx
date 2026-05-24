// import React, { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Play, Pause, Maximize } from "lucide-react";

// const images = [
//   "/images/banner4.png",
//   "/images/banner3.png"
// ];

// function ImageSlider({ autoPlay = true, interval = 5000, height = "400px" }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const sliderRef = useRef(null);
//   const timerRef = useRef(null);

  // Auto-play
  // useEffect(() => {
  //   if (!isPlaying) return;
  //   timerRef.current = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % images.length);
  //   }, interval);
  //   return () => clearInterval(timerRef.current);
  // }, [isPlaying, interval]);

  // // Fullscreen listener
  // useEffect(() => {
  //   const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
  //   document.addEventListener("fullscreenchange", handleFsChange);
  //   return () => document.removeEventListener("fullscreenchange", handleFsChange);
  // }, []);

  // const goToSlide = (index) => setCurrentIndex(index);
  // const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  // const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // const togglePlay = () => setIsPlaying((p) => !p);

  // const toggleFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     sliderRef.current.requestFullscreen().catch((err) => console.error(err));
  //   } else {
  //     document.exitFullscreen();
  //   }
  // };

  // return (
  //   <div
  //     ref={sliderRef}
  //     className={`relative w-full overflow-hidden rounded-3xl shadow-2xl group`}
  //     style={{ height: isFullscreen ? "100vh" : height }}
  //     onMouseEnter={() => setIsPlaying(false)}
  //     onMouseLeave={() => autoPlay && setIsPlaying(true)}
  //   >
      {/* Slides */}
      {/* <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-3xl"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence> */}

      {/* Overlay text */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl"></div>
      <div className="absolute bottom-10 left-6 md:left-16 text-white max-w-xs md:max-w-md space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">Exclusive Collection</h2>
        <p className="text-sm md:text-lg">Discover the latest products and amazing offers!</p>
      </div> */}

      {/* Navigation Arrows */}
      {/* <button
        onClick={goPrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight size={24} />
      </button> */}

      {/* Bottom Controls */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm">
        <button onClick={togglePlay} className="text-white hover:text-blue-400">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-gray-400 hover:bg-gray-200"
              }`}
            />
          ))}
        </div>
        <button onClick={toggleFullscreen} className="text-white hover:text-blue-400">
          <Maximize size={18} />
        </button>
      </div> */}

      {/* Thumbnails */}
      {/* <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto px-2 md:px-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-14 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 transition-all ${
              idx === currentIndex
                ? "border-white scale-110 shadow-lg"
                : "border-transparent hover:border-gray-300 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div> */}
//     </div>
//   );
// }

// export default ImageSlider;

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react";

const images = [
  "/images/banner4.png",
  "/images/banner3.png",
];

function ImageSlider({ height = "400px" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sliderRef = useRef(null);

  // Fullscreen listener
  useEffect(() => {
    const handleFsChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", handleFsChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFsChange
      );
    };
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      sliderRef.current
        .requestFullscreen()
        .catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl group"
      style={{ height: isFullscreen ? "100vh" : height }}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-3xl"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl"></div>

      {/* Text */}
      <div className="absolute bottom-10 left-6 md:left-16 text-white max-w-xs md:max-w-md space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          Exclusive Collection
        </h2>

        <p className="text-sm md:text-lg">
          Discover the latest products and amazing offers!
        </p>
      </div>

      {/* Previous Button */}
      <button
        onClick={goPrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm">
        {/* Dots */}
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="text-white hover:text-blue-400 transition"
        >
          <Maximize size={18} />
        </button>
      </div>

    </div>
  );
}

export default ImageSlider;

