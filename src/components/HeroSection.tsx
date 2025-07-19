import React from 'react';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
