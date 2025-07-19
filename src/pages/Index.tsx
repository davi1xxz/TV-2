
import React, { useState, useEffect } from 'react';
import NewsModal from '../components/NewsModal';
import { useNews } from '../hooks/use-news';
import { useSchedule } from '../hooks/use-schedule';
import { useSponsors } from '../hooks/use-sponsors';
import { useCurrentProgram } from '../hooks/use-current-program';
import { useResponsive } from '../hooks/use-responsive';
import { NewsItem } from '../lib/supabase';

// Componentes refatorados
import HeroSection from '../components/HeroSection';
import SponsorBanner from '../components/SponsorBanner';
import CurrentProgram from '../components/CurrentProgram';
import VideoPlayer from '../components/VideoPlayer';
import FeaturedNewsSection from '../components/FeaturedNewsSection';
import FeaturesSection from '../components/FeaturesSection';
import RecadoForm from '../components/RecadoForm';

const Index = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const { news, loading, loadHomeNews } = useNews();
  const { schedule } = useSchedule();
  const { sponsors, loading: sponsorsLoading, loadSponsors } = useSponsors();
  const currentProgram = useCurrentProgram(schedule);
  const { isMobile } = useResponsive();

  useEffect(() => {
    loadHomeNews();
    loadSponsors();
    // eslint-disable-next-line
  }, []);

  // Mostrar apenas notícias com destaque_ordem definido (1, 2 ou 3), na ordem correta
  const ultimasNoticias = [1, 2, 3]
    .map(ordem => news.find(n => n.destaque_ordem === ordem))
    .filter(Boolean);

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-300 relative">
      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection 
            title="Sua TV Online"
            subtitle="Conectando você com o melhor conteudo que há na região."
          />

          {/* Video Player com borda vermelha e RecadoForm dentro */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-5xl md:max-w-3xl rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 p-2 md:p-4 flex flex-col items-center">
              {/* Banner acima do player - agora dinâmico */}
              <div className="w-full rounded-t-lg overflow-hidden relative">
                <SponsorBanner sponsors={sponsors} loading={sponsorsLoading} />
              </div>
              
              <VideoPlayer videoSrc="/sample.mp4" />
              
              {/* Faixa do programa atual */}
              <CurrentProgram currentProgram={currentProgram} />
              
              <div className="w-full mt-4">
                <RecadoForm />
              </div>
            </div>
          </div>

          {/* Últimas Notícias */}
          <FeaturedNewsSection 
            news={ultimasNoticias}
            loading={loading}
            isMobile={isMobile}
            onNewsClick={handleNewsClick}
          />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Modal de Notícias */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;
