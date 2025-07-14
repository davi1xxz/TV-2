
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { newsData } from '../data/news';

const Noticias = () => {
  const [selectedNews, setSelectedNews] = useState<null | typeof newsData[0]>(null);

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

            {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsData.map((news) => (
              <NewsCard
                key={news.id}
                image={news.image}
                title={news.title}
                summary={news.summary}
                date={news.date}
                onClick={() => setSelectedNews(news)}
              />
            ))}
          </div>
          {/* Modal de detalhes da notícia */}
          <NewsModal
            open={!!selectedNews}
            onClose={() => setSelectedNews(null)}
            image={selectedNews?.image || ''}
            title={selectedNews?.title || ''}
            summary={selectedNews?.summary || ''}
            details={selectedNews?.details || ''}
            date={selectedNews?.date || ''}
          />
          </div>
        </section>
      </div>
  );
};

export default Noticias;
