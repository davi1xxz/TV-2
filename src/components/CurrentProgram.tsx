import React from 'react';

const CurrentProgram = ({ currentProgram }) => {
  if (!currentProgram) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] text-white py-2 px-3 rounded-b-lg shadow-lg border-t-2 border-white/20 animate-fade-in"
      style={{
        background: 'linear-gradient(90deg, #ad1917 0%, #f37335 50%, #fda63d 100%)',
        boxShadow: '0 4px 24px 0 rgba(173,25,23,0.15), 0 1.5px 0 0 #fff2',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        borderBottomLeftRadius: '0.75rem',
        borderBottomRightRadius: '0.75rem',
        minHeight: '38px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.5s cubic-bezier(.4,0,.2,1)'
      }}
    >
      <div className="flex items-center justify-between w-full text-sm px-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold drop-shadow">NO AR:</span>
          <span className="font-bold drop-shadow-lg">{currentProgram.titulo}</span>
        </div>
        <span className="opacity-90 font-medium tracking-wide drop-shadow">{currentProgram.horario}</span>
      </div>
    </div>
  );
};

export default CurrentProgram;
