import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Award, Heart, Users } from 'lucide-react';

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ValuesCarouselProps {
  isMobile: boolean;
}

const ValuesCarousel: React.FC<ValuesCarouselProps> = ({ isMobile }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const values: Value[] = [
    {
      icon: Award,
      title: "Qualidade",
      description: "Oferecemos sempre a melhor qualidade de som e conteúdo para nossos ouvintes"
    },
    {
      icon: Heart,
      title: "Paixão",
      description: "Fazemos nosso trabalho com amor e dedicação, transmitindo essa energia"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Valorizamos nossa conexão com a comunidade e ouvimos nossos ouvintes"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % values.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + values.length) % values.length);
  };

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }, 4000);
  }, [values.length]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  useEffect(() => {
    if (isMobile && values.length > 0) {
      startAutoPlay();
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isMobile, values.length, startAutoPlay]);

  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">
              <value.icon className="w-12 h-12 text-[#ad1917]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {value.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl pb-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {values.map((value, index) => (
            <div key={index} className="w-full flex-shrink-0 min-w-full">
              <div className="px-4 w-full h-full">
                <div className="h-full max-w-sm mx-auto">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <value.icon className="w-12 h-12 text-[#ad1917]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicadores */}
      <div className="flex justify-center space-x-2 mt-4">
        {values.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              resetAutoPlay();
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] w-6'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ValuesCarousel;
