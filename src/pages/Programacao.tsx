
import React from 'react';
import { Clock, Mic, Music, Radio } from 'lucide-react';

const Programacao = () => {
  const schedule = [
    {
      time: "06:00 - 09:00",
      program: "Bom Dia WebRadio",
      host: "Maria Santos",
      description: "Comece o dia com as melhores músicas e informações",
      type: "morning"
    },
    {
      time: "09:00 - 12:00",
      program: "Sucessos da Manhã",
      host: "João Silva",
      description: "Os maiores hits nacionais e internacionais",
      type: "music"
    },
    {
      time: "12:00 - 14:00",
      program: "Hora do Almoço",
      host: "Ana Costa",
      description: "Música popular brasileira e sertanejo",
      type: "lunch"
    },
    {
      time: "14:00 - 17:00",
      program: "Tarde Musical",
      host: "Carlos Oliveira",
      description: "Rock, pop e indie para sua tarde",
      type: "afternoon"
    },
    {
      time: "17:00 - 19:00",
      program: "Drive Time",
      host: "Fernanda Lima",
      description: "As melhores para o caminho de casa",
      type: "drive"
    },
    {
      time: "19:00 - 22:00",
      program: "Noite WebRadio",
      host: "Ricardo Ferreira",
      description: "Música romântica e smooth jazz",
      type: "night"
    },
    {
      time: "22:00 - 06:00",
      program: "Madrugada Musical",
      host: "Programação Automática",
      description: "As melhores músicas 24 horas",
      type: "overnight"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'morning':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'music':
        return <Music className="w-6 h-6 text-blue-500" />;
      case 'lunch':
        return <Mic className="w-6 h-6 text-green-500" />;
      case 'afternoon':
        return <Radio className="w-6 h-6 text-orange-500" />;
      case 'drive':
        return <Music className="w-6 h-6 text-purple-500" />;
      case 'night':
        return <Mic className="w-6 h-6 text-indigo-500" />;
      default:
        return <Radio className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Programação
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Confira nossa programação completa com os melhores programas e apresentadores
            </p>
          </div>

            {/* Current Program Highlight */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-white mb-12 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Radio className="w-8 h-8" />
                <span className="text-lg font-semibold">NO AR AGORA</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Tarde Musical</h2>
              <p className="text-xl opacity-90 mb-2">com Carlos Oliveira</p>
              <p className="opacity-80">14:00 - 17:00 • Rock, pop e indie para sua tarde</p>
            </div>

            {/* Schedule Grid */}
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    
                    <div className="flex-shrink-0 text-right">
                      <div className="text-lg font-bold text-red-500">{item.time}</div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.program}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Mic className="w-4 h-4" />
                        <span>{item.host}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Programs */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Programas Especiais
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Sábado Musical
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Sábados das 10:00 às 14:00 - Os melhores sucessos dos anos 80, 90 e 2000
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                    Fins de Semana
                  </span>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Domingo Sertanejo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Domingos das 14:00 às 18:00 - O melhor do sertanejo universitário e raiz
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                    Domingos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Programacao;
