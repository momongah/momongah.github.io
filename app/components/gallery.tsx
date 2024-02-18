// components/ImageGallery.tsx
import { useEffect, useRef, useState } from 'react';

const ImageGallery = ({ images }: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.scrollBehavior = 'smooth'; // Enable smooth scrolling behavior
      const width = container.offsetWidth;
      
      // Define the auto-scrolling interval
      const scrollInterval = setInterval(() => {
        setScrollPosition(prevPosition => (prevPosition + width >= width * images.length ? 0 : prevPosition + width));
      }, 3000); // Change this value to adjust auto-scroll speed (in milliseconds)
  
      // Clear the interval on component unmount
      return () => clearInterval(scrollInterval);
    }
  }, [images]); // Re-run effect when images chan

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={`${image}`} alt={`Image ${index}`} className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
