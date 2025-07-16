
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { useNews } from '../hooks/use-news';

const Noticias = () => {
  const { news, loading, loadNews } = useNews();
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [mobileCols, setMobileCols] = useState(2); // 2 colunas por padrão

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 pt-[10px]">
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
              {/* Botão de alternância de visualização (apenas mobile) */}
              <div className="flex justify-center md:hidden mt-[-4px] mb-2">
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#ad1917] to-[#fda63d] text-white shadow transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#f37335]/50 focus:ring-offset-2 ${mobileCols === 2 ? 'hover:from-[#b81a18] hover:to-[#ffb14d]' : 'hover:from-[#f37335] hover:to-[#ad1917]'}`}
                  style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
                  onClick={() => setMobileCols(cols => cols === 2 ? 1 : 2)}
                >
                  {mobileCols === 2 ? 'Ver em lista' : 'Ver em grade'}
                </button>
              </div>
            </div>

            {/* News Grid */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Carregando notícias...</div>
          ) : (
          <div className={`grid ${mobileCols === 2 ? 'grid-cols-2' : 'grid-cols-1'} md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 transition-all duration-300`}>
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
