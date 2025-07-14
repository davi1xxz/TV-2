
import React, { useState } from 'react';
import { Waves, Users, Radio, Headphones } from 'lucide-react';
import NewsSlider from '../components/NewsSlider';

const newsDetails = [
  {
    id: 1,
    title: "Nova programação da rádio estreia na próxima semana",
    summary: "Confira os novos programas que chegam para diversificar ainda mais nossa grade de programação.",
    date: "11/07/2025",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop",
    details: "A nova grade trará programas inéditos, com foco em música regional, entrevistas exclusivas e participação dos ouvintes. Fique ligado para não perder as novidades!"
  },
  {
    id: 2,
    title: "Festival de música local será transmitido ao vivo",
    summary: "Não perca a cobertura completa do maior festival de música da região, direto dos nossos estúdios.",
    date: "10/07/2025",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    details: "O festival contará com bandas locais, entrevistas ao vivo e sorteios para os ouvintes. Acompanhe nossa transmissão e participe dessa grande festa da música!"
  },
  {
    id: 3,
    title: "Entrevista exclusiva com artista local",
    summary: "O cantor João Silva fala sobre seu novo álbum e projetos futuros em entrevista exclusiva.",
    date: "09/07/2025",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=250&fit=crop",
    details: "João Silva compartilha curiosidades sobre o processo criativo do novo álbum e revela planos para shows e colaborações futuras. Não perca essa conversa inspiradora!"
  },
];

const Index = () => {
  const [selectedNews, setSelectedNews] = useState(null);
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

          {/* Últimas Notícias - Carrossel */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-8">
              Últimas Notícias
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {newsDetails.map((news) => (
                <div
                  key={news.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  onClick={() => setSelectedNews(news)}
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
                      {news.summary}
                    </p>
                    <div className="mt-auto text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {news.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal de detalhes da notícia */}
            {selectedNews && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-0 relative animate-fade-in overflow-hidden">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl font-bold z-10"
                    onClick={() => setSelectedNews(null)}
                    aria-label="Fechar"
                  >
                    &times;
                  </button>
                  <div className="flex flex-col items-center p-8 md:p-12">
                    <img
                      src={selectedNews.image}
                      alt={selectedNews.title}
                      className="w-full max-w-2xl h-80 object-cover object-center rounded-2xl mb-10 shadow-2xl border border-gray-200 dark:border-gray-800"
                    />
                    <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white leading-tight text-center">
                      {selectedNews.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center max-w-xl">
                      {selectedNews.summary}
                    </p>
                    <div className="w-full max-w-xl">
                      <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-left bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        {selectedNews.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
