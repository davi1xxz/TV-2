import React from 'react';
import NewsCard from './NewsCard';
import MobileNewsCarousel from './MobileNewsCarousel';
import { NewsItem } from '../lib/supabase';

interface FeaturedNewsSectionProps {
  news: NewsItem[];
  loading: boolean;
  isMobile: boolean;
  onNewsClick: (news: NewsItem) => void;
}

const FeaturedNewsSection: React.FC<FeaturedNewsSectionProps> = ({ 
  news, 
  loading, 
  isMobile, 
  onNewsClick 
}) => {
  if (loading) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left px-4">
          <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
            Notícias em Destaque
          </span>
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-700 dark:text-gray-300">Carregando notícias...</div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left px-4">
          <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
            Notícias em Destaque
          </span>
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-700 dark:text-gray-300">Nenhuma notícia em destaque no momento.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left px-4">
        <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
          Notícias em Destaque
        </span>
      </h2>
      
      {isMobile ? (
        <MobileNewsCarousel news={news} onNewsClick={onNewsClick} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {news.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedNewsSection;
