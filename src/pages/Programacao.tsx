
import React from 'react';
// Removido importação de ícones

function getCurrentProgram(schedule: any[]) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < schedule.length; i++) {
    const [start, end] = schedule[i].time.split(' - ');
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;
    // Se o horário final for menor que o inicial, cruza a meia-noite
    if (endMinutes <= startMinutes) endMinutes += 24 * 60;
    let nowMinutes = currentMinutes;
    if (endMinutes > 24 * 60) {
      // Ajuste para faixas que cruzam a meia-noite
      if (nowMinutes < startMinutes) nowMinutes += 24 * 60;
    }
    if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
      return schedule[i];
    }
  }
  return null;
}

const Programacao = () => {
  const schedule = [
    { time: "06:00 - 09:00", program: "Bom Dia TV OK", host: "Marcos Lopes", description: "Comece o dia com as melhores músicas e informações", type: "morning" },
    { time: "09:00 - 12:00", program: "Sucessos da Manhã", host: "Marcos Lopes", description: "Os maiores hits nacionais e internacionais", type: "music" },
    { time: "12:00 - 14:00", program: "Hora do Almoço", host: "Marcos Lopes", description: "Música popular brasileira e sertanejo", type: "lunch" },
    { time: "14:00 - 17:00", program: "Tarde Musical", host: "Marcos Lopes", description: "Rock, pop e indie para sua tarde", type: "afternoon" },
    { time: "17:00 - 19:00", program: "Drive Time", host: "Marcos Lopes", description: "As melhores para o caminho de casa", type: "drive" },
    { time: "19:00 - 22:00", program: "Noite TV OK", host: "Marcos Lopes", description: "Música romântica e smooth jazz", type: "night" },
    { time: "22:00 - 06:00", program: "Madrugada Musical", host: "Programação Automática", description: "As melhores músicas 24 horas", type: "overnight" }
  ];

  const current = getCurrentProgram(schedule);

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
          {current && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-white mb-12 text-center">
              <div className="mb-4">
                <span className="text-lg font-semibold">NO AR AGORA</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{current.program}</h2>
              <p className="text-xl opacity-90 mb-2">com {current.host}</p>
              <p className="opacity-80">{current.time} • {current.description}</p>
            </div>
          )}

          {/* Schedule Grid */}
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-6">
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
                      <span>{item.host}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programacao;
