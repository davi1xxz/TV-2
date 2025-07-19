import React from 'react';

interface NewsHeaderProps {
  title: string;
  subtitle: string;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6 md:mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
        <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-2 md:mb-0">
        {subtitle}
      </p>
    </div>
  );
};

export default NewsHeader;
