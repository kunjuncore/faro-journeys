import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const LazyImage = ({ src, alt, className, placeholderClassName }: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "50px",
        }
      );

      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse",
            placeholderClassName
          )} 
        />
      )}
      <img
        ref={imgRef}
        src={imageSrc || undefined}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
