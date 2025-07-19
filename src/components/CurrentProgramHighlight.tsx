import React from 'react';
import { ScheduleItem } from '../lib/supabase';

interface CurrentProgramHighlightProps {
  currentProgram: ScheduleItem | null;
}

const CurrentProgramHighlight: React.FC<CurrentProgramHighlightProps> = ({ currentProgram }) => {
  if (!currentProgram) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#ad1917] via-[#f37335] to-[#fda63d] rounded-2xl p-5 md:p-8 text-white mb-8 text-center shadow-lg">
      <div className="mb-2 md:mb-4">
        <span className="text-base md:text-lg font-semibold tracking-wide">NO AR AGORA</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 break-words leading-tight">
        {currentProgram.titulo}
      </h2>
      <p className="text-base md:text-xl opacity-90 mb-1 md:mb-2">
        com {currentProgram.autor}
      </p>
      <p className="opacity-90 text-sm md:text-base">
        {currentProgram.horario} • {currentProgram.subtitulo}
      </p>
    </div>
  );
};

export default CurrentProgramHighlight;
import { ScheduleItem } from '../lib/supabase';

interface CurrentProgramHighlightProps {
  currentProgram: ScheduleItem | null;
}

const CurrentProgramHighlight: React.FC<CurrentProgramHighlightProps> = ({ currentProgram }) => {
  if (!currentProgram) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#ad1917] via-[#f37335] to-[#fda63d] rounded-2xl p-5 md:p-8 text-white mb-8 text-center shadow-lg">
      <div className="mb-2 md:mb-4">
        <span className="text-base md:text-lg font-semibold tracking-wide">NO AR AGORA</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 break-words leading-tight">
        {currentProgram.titulo}
      </h2>
      <p className="text-base md:text-xl opacity-90 mb-1 md:mb-2">
        com {currentProgram.autor}
      </p>
      <p className="opacity-90 text-sm md:text-base">
        {currentProgram.horario} • {currentProgram.subtitulo}
      </p>
    </div>
  );
};

export default CurrentProgramHighlight;
