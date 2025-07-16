
import React, { useMemo } from 'react';
import { useSchedule } from '@/hooks/use-schedule';
// Removido importação de ícones

function getCurrentProgram(schedule) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < schedule.length; i++) {
    const [start, end] = schedule[i].horario.split(' - ');
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;
    if (endMinutes <= startMinutes) endMinutes += 24 * 60;
    let nowMinutes = currentMinutes;
    if (endMinutes > 24 * 60) {
      if (nowMinutes < startMinutes) nowMinutes += 24 * 60;
    }
    if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
      return schedule[i];
    }
  }
  return null;
}

const Programacao = () => {
  const { schedule, loading } = useSchedule();
  // Ordena pelo horário inicial
  const sortedSchedule = useMemo(() => schedule.slice().sort((a, b) => {
    const getMinutes = (h) => {
      const [start] = h.split(' - ');
      const [hh, mm] = start.split(':').map(Number);
      return hh * 60 + mm;
    };
    return getMinutes(a.horario) - getMinutes(b.horario);
  }), [schedule]);
  const current = getCurrentProgram(sortedSchedule);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
        {/* Header Section */}
      <section className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
                  Programação
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Confira nossa programação completa com os melhores programas e apresentadores
              </p>
            </div>

            {/* Current Program Highlight */}
          {current && (
            <div className="bg-gradient-to-br from-[#ad1917] via-[#f37335] to-[#fda63d] rounded-lg p-8 text-white mb-12 text-center">
              <div className="mb-4">
                <span className="text-lg font-semibold">NO AR AGORA</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{current.titulo}</h2>
              <p className="text-xl opacity-90 mb-2">com {current.autor}</p>
              <p className="opacity-80">{current.horario} • {current.subtitulo}</p>
            </div>
          )}

            {/* Schedule Grid */}
            <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Carregando programação...</div>
            ) : (
              sortedSchedule.map((item, index) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 text-right">
                      <div className="text-lg font-bold" style={{ color: '#ad1917' }}>{item.horario}</div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.titulo}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {item.subtitulo}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.autor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>
        </section>
      </div>
  );
};

export default Programacao;
