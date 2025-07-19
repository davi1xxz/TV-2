import { useMemo } from 'react';
import { ScheduleItem } from '../lib/supabase';

export const useCurrentProgram = (schedule: ScheduleItem[]) => {
  const currentProgram = useMemo(() => {
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
  }, [schedule]);

  return currentProgram;
};