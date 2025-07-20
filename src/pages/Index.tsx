
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Waves, Users, Radio, Headphones, ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { useNews } from '../hooks/use-news';
import { useSchedule } from '../hooks/use-schedule';
import { NewsItem } from '../lib/supabase';
import RecadoForm from '../components/RecadoForm';
import { useSponsors } from '../hooks/use-sponsors'

const Index = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { news, loading, loadHomeNews } = useNews();
  const { schedule, loadSchedule } = useSchedule();
  const { sponsors, loading: sponsorsLoading, loadSponsors } = useSponsors()

  // Função para obter o programa atual
  const getCurrentProgram = (schedule) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    for (let i = 0; i < schedule.length; i++) {
      const [start, end] = schedule[i].horario.split(' - ');
      const [startH, startM] = start.split(':').map(Number);
      const [endH, endM] = end.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      let endMinutes = endH * 60 + endM;
      if (endMinutes <= startMinutes) endMinutes += 24 * 60;
      let nowMinutes = currentMinutes;
      if (endMinutes > 24 * 60) {
        if (nowMinutes < startMinutes) nowMinutes += 24 * 60;
      }
      if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
        return schedule[i];
      }
    }
    return null;
  };

  const currentProgram = getCurrentProgram(schedule);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const bannerAutoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadHomeNews();
    loadSchedule();
    loadSponsors();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mostrar apenas notícias com destaque_ordem definido (1, 2 ou 3), na ordem correta
  const ultimasNoticias = [1, 2, 3]
    .map(ordem => news.find(n => n.destaque_ordem === ordem))
    .filter(Boolean);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % ultimasNoticias.length);
  }, [ultimasNoticias.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + ultimasNoticias.length) % ultimasNoticias.length);
  }, [ultimasNoticias.length]);

  const nextBannerSlide = useCallback(() => {
    setCurrentBannerSlide((prev) => (prev + 1) % sponsors.length);
  }, [sponsors.length]);

  const prevBannerSlide = useCallback(() => {
    setCurrentBannerSlide((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  }, [sponsors.length]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  const startBannerAutoPlay = useCallback(() => {
    if (bannerAutoPlayRef.current) {
      clearInterval(bannerAutoPlayRef.current);
    }
    bannerAutoPlayRef.current = setInterval(nextBannerSlide, 4000);
  }, [nextBannerSlide]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  const resetBannerAutoPlay = () => {
    if (bannerAutoPlayRef.current) {
      clearInterval(bannerAutoPlayRef.current);
    }
    startBannerAutoPlay();
  };

  // Autoplay do carrossel
  useEffect(() => {
    if (isMobile && ultimasNoticias.length > 0) {
      startAutoPlay();
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isMobile, ultimasNoticias.length, startAutoPlay]);

  // Autoplay do carrossel de banners
  useEffect(() => {
    if (sponsors.length > 0) {
      startBannerAutoPlay();
      return () => {
        if (bannerAutoPlayRef.current) {
          clearInterval(bannerAutoPlayRef.current);
        }
      };
    }
  }, [sponsors.length, startBannerAutoPlay]);

  // Banner dinâmico de patrocinadores
  const banners = sponsors.map(s => s.url_imagem)
  const bannerLinks = sponsors.map(s => s.url_link)
  const bannerHeights = sponsors.map(() => ({ aspectRatio: '800/100', maxHeight: `calc(100vw * 0.1)`, minHeight: '40px' }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-300 relative">
      <section id="inicio" className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 px-4">
              <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
                Sua TV Online
              </span>
            </h1>
            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
              Conectando você com o melhor conteudo que há na região.
            </p>
          </div>

          {/* Video Player com borda vermelha e RecadoForm dentro */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-5xl md:max-w-3xl rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 p-2 md:p-4 flex flex-col items-center">
              {/* Banner acima do player - agora dinâmico */}
              <div className="w-full rounded-t-lg overflow-hidden relative">
                {sponsorsLoading ? (
                  <div className="w-full h-[40px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">Carregando patrocinadores...</div>
                ) : sponsors.length > 0 ? (
                  <div 
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentBannerSlide * 100}%)` }}
                  >
                    {sponsors.map((sponsor, index) => (
                      sponsor.url_link ? (
                        <a
                          key={sponsor.id}
                          href={sponsor.url_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex-shrink-0"
                          style={bannerHeights[index]}
                        >
                          <img
                            src={sponsor.url_imagem}
                            alt={sponsor.nome}
                            className="w-full object-cover"
                            style={bannerHeights[index]}
                            fetchpriority="high"
                          />
                        </a>
                      ) : (
                        <img
                          key={sponsor.id}
                          src={sponsor.url_imagem}
                          alt={sponsor.nome}
                          className="w-full flex-shrink-0 object-cover"
                          style={bannerHeights[index]}
                          fetchpriority="high"
                        />
                      )
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="w-full aspect-video overflow-hidden mb-0">
                <video controls className="w-full h-full object-cover bg-[#222]">
                  <source src="/sample.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
              
              {/* Faixa do programa atual */}
              {currentProgram && (
                <div className="w-full bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] text-white py-2 px-3 rounded-b-lg shadow-lg border-t-2 border-white/20 animate-fade-in"
                  style={{
                    background: 'linear-gradient(90deg, #ad1917 0%, #f37335 50%, #fda63d 100%)',
                    boxShadow: '0 4px 24px 0 rgba(173,25,23,0.15), 0 1.5px 0 0 #fff2',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    borderBottomLeftRadius: '0.75rem',
                    borderBottomRightRadius: '0.75rem',
                    minHeight: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.5s cubic-bezier(.4,0,.2,1)'
                  }}
                >
                  <div className="flex items-center justify-between w-full text-sm px-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold drop-shadow">NO AR:</span>
                      <span className="font-bold drop-shadow-lg">{currentProgram.titulo}</span>
                    </div>
                    <span className="opacity-90 font-medium tracking-wide drop-shadow">{currentProgram.horario}</span>
                  </div>
                </div>
              )}
              
              <div className="w-full mt-4">
                <RecadoForm />
              </div>
            </div>
          </div>

          {/* Últimas Notícias */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left px-4">
              <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
                Notícias em Destaque
              </span>
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-700 dark:text-gray-300">Carregando notícias...</div>
              </div>
            ) : ultimasNoticias.length > 0 ? (
              <>
                {/* MOBILE: Carrossel */}
                {isMobile && (
                  <div className="relative w-full">
                    <div className="overflow-hidden rounded-xl pb-4">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {ultimasNoticias.map((news) => (
                          <div key={news.id} className="w-full flex-shrink-0 min-w-full">
                            <div className="px-4 w-full h-full">
                              <div className="h-full max-w-sm mx-auto">
                                <NewsCard
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
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                    </button>
                    <button
                      onClick={() => {
                        nextSlide();
                        resetAutoPlay();
                      }}
                      className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 shadow-lg rounded-full w-10 h-10 p-0 flex items-center justify-center z-10 border border-gray-300 dark:border-gray-600"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
                    </button>

                    {/* Indicadores */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {ultimasNoticias.map((_, index) => (
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
                )}

                {/* DESKTOP: Grid */}
                {!isMobile && (
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
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-700 dark:text-gray-300">Nenhuma notícia em destaque encontrada.</div>
              </div>
            )}
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
        </div>
      </section>
    </div>
  );
};

export default Index;
