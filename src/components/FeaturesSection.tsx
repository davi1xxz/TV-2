import React from 'react';
import { Waves, Users, Radio, Headphones } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Radio,
      title: 'Programação Variada',
      description: 'Conteúdo diversificado para todos os gostos e idades.'
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Conectamos pessoas através do melhor conteúdo regional.'
    },
    {
      icon: Headphones,
      title: 'Qualidade de Áudio',
      description: 'Transmissão com a melhor qualidade de áudio e vídeo.'
    },
    {
      icon: Waves,
      title: 'Sinal Estável',
      description: 'Conexão confiável para você não perder nada.'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
              Por que escolher nossa TV?
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Oferecemos a melhor experiência de entretenimento com qualidade e confiabilidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
