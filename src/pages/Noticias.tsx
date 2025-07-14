
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const Noticias = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Nova programação musical estreia na próxima semana",
      excerpt: "A WebRadio apresenta um novo programa dedicado aos sucessos nacionais e internacionais...",
      date: "2025-01-11",
      author: "Redação WebRadio",
      category: "Programação"
    },
    {
      id: 2,
      title: "Entrevista exclusiva com artista local",
      excerpt: "Conversamos com o cantor João Silva sobre seu novo álbum e próximos projetos...",
      date: "2025-01-10",
      author: "Maria Santos",
      category: "Entrevistas"
    },
    {
      id: 3,
      title: "WebRadio completa 15 anos no ar",
      excerpt: "Celebramos mais um ano levando música e informação para toda a região...",
      date: "2025-01-09",
      author: "Redação WebRadio",
      category: "Institucional"
    }
  ];

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
              Fique por dentro das últimas novidades da WebRadio e da região
            </p>
          </div>

          {/* Featured News Slider */}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <button className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200">
                    Ler mais →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Noticias;
