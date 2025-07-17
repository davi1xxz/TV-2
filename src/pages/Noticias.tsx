
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { useNews } from '../hooks/use-news';
import { NewsItem } from '../lib/supabase';


const Noticias = () => {
  const { news, loading, loadNews } = useNews();
  const [selectedNews, setSelectedNews] = useState<any>(null);

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-300 pt-[10px]">
        {/* Header Section */}
      <section className="pt-16 pb-8 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
                  Notícias
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-2 md:mb-0">
                Fique por dentro das últimas novidades.
              </p>
            </div>

            {/* News Grid */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Carregando notícias...</div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 transition-all duration-300">
              {news.map((item) => (
              <NewsCard
                  key={item.id}
                  image={item.tipo_midia === 'imagem' ? item.url_midia : `https://img.youtube.com/vi/${(item.url_midia?.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) || [])[1] || ''}/maxresdefault.jpg`}
                  title={item.titulo}
                  subtitulo={item.subtitulo}
                  date={new Date(item.created_at).toLocaleDateString('pt-BR')}
                  onClick={() => setSelectedNews(item)}
                  isVideo={item.tipo_midia === 'youtube'}
                  videoUrl={item.tipo_midia === 'youtube' ? item.url_midia : undefined}
                  autor={item.autor}
                  created_at={item.created_at}
              />
            ))}
          </div>
          )}
          {/* Modal de detalhes da notícia */}
          <NewsModal
            open={!!selectedNews}
            onClose={() => setSelectedNews(null)}
            image={selectedNews?.tipo_midia === 'imagem' ? selectedNews?.url_midia : selectedNews?.tipo_midia === 'youtube' ? `https://img.youtube.com/vi/${(selectedNews?.url_midia?.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) || [])[1] || ''}/maxresdefault.jpg` : ''}
            title={selectedNews?.titulo || ''}
            subtitulo={selectedNews?.subtitulo || ''}
            details={selectedNews?.descricao || ''}
            date={selectedNews ? new Date(selectedNews.created_at).toLocaleDateString('pt-BR') : ''}
            autor={selectedNews?.autor || ''}
            created_at={selectedNews?.created_at || ''}
            isVideo={selectedNews?.tipo_midia === 'youtube'}
            videoUrl={selectedNews?.tipo_midia === 'youtube' ? selectedNews?.url_midia : ''}
          />
        </div>
      </section>
    </div>
  );
};

export default Noticias;
