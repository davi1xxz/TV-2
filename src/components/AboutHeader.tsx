import React from 'react';

interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16 mt-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default AboutHeader;