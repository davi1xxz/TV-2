import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';
import { NewsItem } from '../lib/supabase';

interface MobileNewsCarouselProps {
  news: NewsItem[];
  onNewsClick: (news: NewsItem) => void;
}

const MobileNewsCarousel: React.FC<MobileNewsCarouselProps> = ({ news, onNewsClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000);
  }, [news.length]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  useEffect(() => {
    if (news.length > 0) {
      startAutoPlay();
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [news.length, startAutoPlay]);

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl pb-4">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {news.map((newsItem) => (
            <div key={newsItem.id} className="w-full flex-shrink-0 min-w-full">
              <div className="px-4 w-full h-full">
                <div className="h-full max-w-sm mx-auto">
                  <NewsCard
                    image={newsItem.tipo_midia === 'imagem' ? newsItem.url_midia : ''}
                    title={newsItem.titulo}
                    subtitulo={newsItem.subtitulo || ''}
                    date={new Date(newsItem.created_at).toLocaleDateString('pt-BR')}
                    onClick={() => onNewsClick(newsItem)}
                    isVideo={newsItem.tipo_midia === 'youtube'}
                    videoUrl={newsItem.tipo_midia === 'youtube' ? newsItem.url_midia : ''}
                    autor={newsItem.autor}
                    created_at={newsItem.created_at}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Botões de navegação */}
      <button
        onClick={() => {
          prevSlide();
          resetAutoPlay();
        }}
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 shadow-lg rounded-full w-10 h-10 p-0 flex items-center justify-center z-10 border border-gray-300 dark:border-gray-600"
        aria-label="Notícia anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      <button
        onClick={() => {
          nextSlide();
          resetAutoPlay();
        }}
        className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 shadow-lg rounded-full w-10 h-10 p-0 flex items-center justify-center z-10 border border-gray-300 dark:border-gray-600"
        aria-label="Próxima notícia"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default MobileNewsCarousel;
