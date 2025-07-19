import React from 'react';
import { ScheduleItem } from '../lib/supabase';

interface ScheduleListProps {
  schedule: ScheduleItem[];
  loading: boolean;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedule, loading }) => {
  if (loading) {
    return (
      <div className="space-y-5 md:space-y-6">
        <div className="text-center py-8 text-gray-500">Carregando programação...</div>
      </div>
    );
  }

  return (
    <div className="space-y-5 md:space-y-6">
      {schedule.map((item) => (
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
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                <span>{item.autor}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
