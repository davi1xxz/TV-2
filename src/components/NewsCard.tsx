import React from 'react';

interface NewsCardProps {
  image: string;
  title: string;
  summary: string;
  date: string;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, summary, date, onClick }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    onClick={onClick}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="flex-1 flex flex-col p-6">
      <h3 className="text-[21px] font-bold mb-2 text-gray-900 dark:text-white leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
        {summary}
      </p>
      <div className="mt-auto flex items-center justify-start text-sm text-gray-500 dark:text-gray-400 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        {date}
      </div>
    </div>
  </div>
);

export default NewsCard; 