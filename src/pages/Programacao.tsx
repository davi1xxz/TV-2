
import React, { useMemo } from 'react';
import { useSchedule } from '../hooks/use-schedule';
import { useCurrentProgram } from '../hooks/use-current-program';
import NewsHeader from '../components/NewsHeader';
import CurrentProgramHighlight from '../components/CurrentProgramHighlight';
import ScheduleList from '../components/ScheduleList';
import PageContainer from '../components/PageContainer';

const Programacao = () => {
  const { schedule, loading } = useSchedule();
  
  // Ordena pelo horário inicial
  const sortedSchedule = useMemo(() => schedule.slice().sort((a, b) => {
    const getMinutes = (h: string) => {
      const [start] = h.split(' - ');
      const [hh, mm] = start.split(':').map(Number);
      return hh * 60 + mm;
    };
    return getMinutes(a.horario) - getMinutes(b.horario);
  }), [schedule]);
  
  const current = useCurrentProgram(sortedSchedule);

  return (
    <PageContainer className="pt-[10px]">
      <NewsHeader 
        title="Programação"
        subtitle="Confira nossa programação completa."
      />

      {/* Current Program Highlight */}
      <CurrentProgramHighlight currentProgram={current} />

      {/* Schedule Grid */}
      <ScheduleList schedule={sortedSchedule} loading={loading} />
    </PageContainer>
  );
};

export default Programacao;
