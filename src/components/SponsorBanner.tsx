import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SponsorItem } from '../lib/supabase';

interface SponsorBannerProps {
  sponsors: SponsorItem[];
  loading: boolean;
}

const SponsorBanner: React.FC<SponsorBannerProps> = ({ sponsors, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsors.length);
    }, 4000);
  }, [sponsors.length]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  useEffect(() => {
    if (sponsors.length > 0) {
      startAutoPlay();
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [sponsors.length, startAutoPlay]);

  const bannerHeights = sponsors.map(() => ({ 
    aspectRatio: '800/100', 
    maxHeight: `calc(100vw * 0.1)`, 
    minHeight: '40px' 
  }));

  if (loading) {
    return (
      <div className="w-full h-[40px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm">
        Carregando patrocinadores...
      </div>
    );
  }

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <div 
      className="flex transition-transform duration-500"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      onMouseEnter={resetAutoPlay}
    >
      {sponsors.map((sponsor, index) => (
        sponsor.url_link ? (
          <a
            key={sponsor.id}
            href={sponsor.url_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex-shrink-0"
            style={bannerHeights[index]}
          >
            <img
              src={sponsor.url_imagem}
              alt={sponsor.nome}
              className="w-full object-cover"
              style={bannerHeights[index]}
            />
          </a>
        ) : (
          <img
            key={sponsor.id}
            src={sponsor.url_imagem}
            alt={sponsor.nome}
            className="w-full flex-shrink-0 object-cover"
            style={bannerHeights[index]}
          />
        )
      ))}
    </div>
  );
};

export default SponsorBanner;