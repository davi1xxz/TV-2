
import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const Noticias = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Nova programação da rádio estreia na próxima semana",
      summary: "Confira os novos programas que chegam para diversificar ainda mais nossa grade de programação.",
      details: "A partir da próxima semana, ouvintes poderão acompanhar atrações inéditas, quadros interativos e muita música de qualidade. Não perca as novidades e participe ao vivo! A nova grade trará programas inéditos, com foco em música regional, entrevistas exclusivas e participação dos ouvintes. Fique ligado para não perder as novidades!",
      date: "2025-07-11",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=350&fit=crop",
      category: "Programação"
    },
    {
      id: 2,
      title: "Festival de música local será transmitido ao vivo",
      summary: "Não perca a cobertura completa do maior festival de música da região, direto dos nossos estúdios.",
      details: "O evento contará com apresentações de bandas locais, entrevistas exclusivas e sorteios para os ouvintes. Fique ligado para acompanhar tudo em tempo real! O festival contará com bandas locais, entrevistas ao vivo e sorteios para os ouvintes. Acompanhe nossa transmissão e participe dessa grande festa da música!",
      date: "2025-07-10",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=350&fit=crop",
      category: "Eventos"
    },
    {
      id: 3,
      title: "Entrevista exclusiva com artista local",
      summary: "O cantor João Silva fala sobre seu novo álbum e projetos futuros em entrevista exclusiva.",
      details: "Ele compartilha detalhes do processo criativo, inspirações e planos para shows na região. Uma conversa imperdível para quem gosta de música nacional! João Silva compartilha curiosidades sobre o processo criativo do novo álbum e revela planos para shows e colaborações futuras. Não perca essa conversa inspiradora!",
      date: "2025-07-09",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=350&fit=crop",
      category: "Entrevistas"
    },
    {
      id: 4,
      title: "Campanha solidária arrecada doações para comunidade",
      summary: "Nossa campanha beneficente já arrecadou mais de 500 cestas básicas para famílias necessitadas.",
      details: "A mobilização contou com o apoio de ouvintes, parceiros e voluntários da comunidade. A entrega das doações será realizada no próximo sábado, com cobertura ao vivo da rádio. A TV OK agradece a todos os ouvintes que participaram da campanha solidária. As doações serão entregues a famílias em situação de vulnerabilidade da região.",
      date: "2025-07-08",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=350&fit=crop",
      category: "Social"
    },
    {
      id: 5,
      title: "Novo estúdio da TV OK é inaugurado",
      summary: "A TV OK agora conta com um estúdio moderno para transmissões ao vivo e gravações.",
      details: "O novo espaço oferece tecnologia de ponta, isolamento acústico e mais conforto para convidados e equipe. Venha conhecer e participar das nossas transmissões especiais! O novo espaço oferece tecnologia de ponta e mais conforto para convidados e equipe. Venha conhecer e participar das nossas transmissões!",
      date: "2025-07-07",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=350&fit=crop",
      category: "Infraestrutura"
    },
    {
      id: 6,
      title: "Podcast semanal estreia com convidados especiais",
      summary: "Toda semana um novo episódio com temas variados e participação de especialistas.",
      details: "O podcast traz debates, entrevistas e dicas culturais para os ouvintes. Não perca o episódio de estreia, já disponível nas principais plataformas! O podcast da TV OK traz debates, entrevistas e muita informação para os ouvintes. Não perca o episódio de estreia!",
      date: "2025-07-06",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=350&fit=crop",
      category: "Podcast"
    },
  ];

  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Notícias
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Fique por dentro das últimas novidades da TV OK e da região
            </p>
          </div>

          {/* Featured News Slider */}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedNews(article)}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full max-w-lg h-64 object-cover object-center rounded-xl mb-6 shadow-md border border-gray-200 dark:border-gray-800"
                />
                <h3 className="text-[21px] font-bold mb-4 text-gray-900 dark:text-white leading-tight text-center">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center max-w-xl">
                  {article.summary}
                </p>
                <div className="flex-1" />
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-6">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
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
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-6">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedNews.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Noticias;
