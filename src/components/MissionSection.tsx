import React from 'react';
import { Heart } from 'lucide-react';

const MissionSection: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">
          Nossa Missão
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          A TV OK nasceu com o objetivo de conectar pessoas através da música e da informação. 
          Acreditamos no poder da comunicação para transformar comunidades e aproximar corações.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Nossa programação é cuidadosamente planejada para atender todos os gostos musicais, 
          sempre com qualidade de som cristalina e apresentadores apaixonados pelo que fazem.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-64 h-64 flex items-center justify-center">
            <img src="/imagens/logo.png" alt="Logo TV OK" className="w-56 h-56 object-contain" />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#f37335] to-[#fda63d] rounded-full flex items-center justify-center animate-pulse">
            <Heart className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
