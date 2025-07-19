
import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import NewsHeader from '../components/NewsHeader';
import PageContainer from '../components/PageContainer';
import { useNews } from '../hooks/use-news';
import { NewsItem } from '../lib/supabase';

const Noticias = () => {
  const { news, loading, loadNews } = useNews();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line
  }, []);

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const getThumbnailUrl = (newsItem: NewsItem) => {
    if (newsItem.tipo_midia === 'imagem') {
      return newsItem.url_midia;
    }
    if (newsItem.tipo_midia === 'youtube') {
      const videoId = (newsItem.url_midia?.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) || [])[1] || '';
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '';
  };

  return (
    <PageContainer className="pt-[10px]">
      <NewsHeader 
        title="Notícias"
        subtitle="Fique por dentro das últimas novidades."
      />

      {/* News Grid */}
      {loading ? (
        <div className="text-center py-16 text-muted-foreground">Carregando notícias...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 transition-all duration-300">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              image={getThumbnailUrl(item)}
              title={item.titulo}
              subtitulo={item.subtitulo}
              date={new Date(item.created_at).toLocaleDateString('pt-BR')}
              onClick={() => handleNewsClick(item)}
              isVideo={item.tipo_midia === 'youtube'}
              videoUrl={item.tipo_midia === 'youtube' ? item.url_midia : undefined}
              autor={item.autor}
              created_at={item.created_at}
            />
          ))}
        </div>
      )}

      {/* Modal de detalhes da notícia */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={handleCloseModal}
        />
      )}
    </PageContainer>
  );
};

export default Noticias;
