
import React, { useState } from 'react';
import { Waves, Users, Radio, Headphones } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { newsData } from '../data/news';

const Index = () => {
  const [selectedNews, setSelectedNews] = useState<null | typeof newsData[0]>(null);
  const ultimasNoticias = newsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 relative">
      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Sua Rádio Online
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Conectando você com o que há de melhor na região.
            </p>
          </div>

          {/* Video Player */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
              <video controls className="w-full h-full object-cover bg-[#222] rounded-xl">
                <source src="/sample.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </div>

          {/* Últimas Notícias */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-8">
              Últimas Notícias
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {ultimasNoticias.map((news) => (
                <NewsCard
                  key={news.id}
                  image={news.image}
                  title={news.title}
                  summary={news.summary}
                  date={news.date}
                  onClick={() => setSelectedNews(news)}
                />
              ))}
            </div>
          </div>
          {/* Modal de detalhes da notícia */}
          <NewsModal
            open={!!selectedNews}
            onClose={() => setSelectedNews(null)}
            image={selectedNews?.image || ''}
            title={selectedNews?.title || ''}
            summary={selectedNews?.summary || ''}
            details={selectedNews?.details || ''}
            date={selectedNews?.date || ''}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
