
import React, { useState, useEffect } from 'react';
import { Waves, Users, Radio, Headphones } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { useNews } from '../hooks/use-news';
import { NewsItem } from '../lib/supabase';
import RecadoForm from '../components/RecadoForm';

const Index = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const { news, loading, loadHomeNews } = useNews();

  useEffect(() => {
    loadHomeNews();
    // eslint-disable-next-line
  }, []);

  // Removido console.log

  const ultimasNoticias = news.slice(0, 3);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 relative">
        {/* Hero Section */}
        <section id="inicio" className="pt-24 pb-4">
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
          <div className="mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-8">
              Últimas Notícias
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-600 dark:text-gray-400">Carregando notícias...</div>
              </div>
            ) : ultimasNoticias.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-3">
                {ultimasNoticias.map((news) => (
                  <NewsCard
                    key={news.id}
                    image={news.tipo_midia === 'imagem' ? news.url_midia : ''}
                    title={news.titulo}
                    subtitulo={news.subtitulo || ''}
                    date={new Date(news.created_at).toLocaleDateString('pt-BR')}
                    onClick={() => setSelectedNews(news)}
                    isVideo={news.tipo_midia === 'youtube'}
                    videoUrl={news.tipo_midia === 'youtube' ? news.url_midia : ''}
                    autor={news.autor}
                    created_at={news.created_at}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-600 dark:text-gray-400">Nenhuma notícia em destaque encontrada.</div>
              </div>
            )}
          </div>
          {/* Modal de detalhes da notícia */}
          <NewsModal
            open={!!selectedNews}
            onClose={() => setSelectedNews(null)}
            image={selectedNews?.tipo_midia === 'imagem' ? selectedNews.url_midia : ''}
            title={selectedNews?.titulo || ''}
            subtitulo={selectedNews?.subtitulo || ''}
            details={selectedNews?.descricao || ''}
            date={selectedNews ? new Date(selectedNews.created_at).toLocaleDateString('pt-BR') : ''}
            autor={selectedNews?.autor || ''}
            created_at={selectedNews?.created_at || ''}
            isVideo={selectedNews?.tipo_midia === 'youtube'}
            videoUrl={selectedNews?.tipo_midia === 'youtube' ? selectedNews.url_midia : ''}
          />
          </div>
        </section>
      {/* Barra de patrocinadores */}
      <RecadoForm />
      <div className="w-full py-10 bg-gradient-to-r from-red-500 to-pink-500 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Patrocinadores</h2>
      </div>
    </div>
  );
};

export default Index;
