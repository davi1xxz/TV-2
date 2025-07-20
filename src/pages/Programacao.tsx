
import React, { useMemo, useEffect } from 'react';
import { useSchedule } from '@/hooks/use-schedule';
import { Calendar, Clock, Play, Pause } from 'lucide-react';

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
  const { schedule, loading, loadSchedule } = useSchedule();
  
  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);
  
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-300 pt-[10px]">
        {/* Header Section */}
      <section className="pt-16 pb-8 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
                  Programação
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Confira nossa programação completa.
              </p>
            </div>

            {/* Current Program Highlight */}
          {current && (
            <div className="bg-gradient-to-br from-[#ad1917] via-[#f37335] to-[#fda63d] rounded-2xl p-5 md:p-8 text-white mb-8 text-center shadow-lg">
              <div className="mb-2 md:mb-4">
                <span className="text-base md:text-lg font-semibold tracking-wide">NO AR AGORA</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 break-words leading-tight">{current.titulo}</h2>
              <p className="text-base md:text-xl opacity-90 mb-1 md:mb-2">com {current.autor}</p>
              <p className="opacity-90 text-sm md:text-base">{current.horario} • {current.subtitulo}</p>
            </div>
          )}

            {/* Schedule Grid */}
            <div className="space-y-5 md:space-y-6">
            {loading ? (
              <div className="text-center py-8 text-gray-700 dark:text-gray-300">Carregando programação...</div>
            ) : (
              sortedSchedule.map((item, index) => (
                <div key={item.id} className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-3 md:p-6 flex flex-col w-full min-h-[110px] justify-center">
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="flex-shrink-0 text-right">
                      <div className="text-base md:text-lg font-bold text-[#ad1917]">{item.horario}</div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                        {item.titulo}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1 md:mb-2 text-sm md:text-base">
                        {item.subtitulo}
                      </p>
                      <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
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
