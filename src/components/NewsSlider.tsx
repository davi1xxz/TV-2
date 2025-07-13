
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  time: string;
  image: string;
  category: string;
}

const NewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Dados de exemplo - em produção viriam do painel admin
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Nova programação da rádio estreia na próxima semana",
      summary: "Confira os novos programas que chegam para diversificar ainda mais nossa grade de programação.",
      date: "11/07/2025",
      time: "14:30",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop",
      category: "Programação"
    },
    {
      id: 2,
      title: "Festival de música local será transmitido ao vivo",
      summary: "Não perca a cobertura completa do maior festival de música da região, direto dos nossos estúdios.",
      date: "10/07/2025",
      time: "16:45",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      category: "Eventos"
    },
    {
      id: 3,
      title: "Entrevista exclusiva com artista local",
      summary: "O cantor João Silva fala sobre seu novo álbum e projetos futuros em entrevista exclusiva.",
      date: "09/07/2025",
      time: "10:15",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=250&fit=crop",
      category: "Entrevistas"
    },
    {
      id: 4,
      title: "Campanha solidária arrecada doações para comunidade",
      summary: "Nossa campanha beneficente já arrecadou mais de 500 cestas básicas para famílias necessitadas.",
      date: "08/07/2025",
      time: "09:20",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      category: "Social"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  }, [newsItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  }, [newsItems.length]);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, nextSlide]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Últimas Notícias
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-sm"
          >
            {isAutoPlay ? 'Pausar' : 'Reproduzir'}
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Main Slider */}
        <div className="overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {newsItems.map((news) => (
              <div key={news.id} className="w-full flex-shrink-0">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {news.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{news.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{news.time}</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {news.summary}
                        </p>
                        <Button 
                          className="self-start bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
                        >
                          Ler mais
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
