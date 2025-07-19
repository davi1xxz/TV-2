import React from 'react';
import { supabase } from '../lib/supabase';

interface TeamMember {
  id: string;
  nome: string;
  funcao: string;
  url_foto: string;
}

interface TeamSectionProps {
  team: TeamMember[];
  loading: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team, loading }) => {
  if (loading) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Nossa Equipe
        </h2>
        <div className="text-center py-8 text-muted-foreground">Carregando equipe...</div>
      </div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Nossa Equipe
        </h2>
        <div className="text-center py-8 text-muted-foreground">Nenhum membro cadastrado.</div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Nossa Equipe
      </h2>
      <div className="grid grid-cols-3 gap-4 md:flex md:flex-wrap md:justify-center md:gap-8">
        {team.map((membro) => (
          <div key={membro.id} className="text-center group">
            <div className="relative mb-2 md:mb-4 overflow-hidden rounded-full w-16 h-16 md:w-32 md:h-32 mx-auto">
              <img
                src={supabase.storage.from('equipe').getPublicUrl(membro.url_foto).data.publicUrl}
                alt={membro.nome}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xs md:text-xl font-bold text-gray-900 dark:text-white mb-0 md:mb-1">
              {membro.nome}
            </h3>
            <p className="text-xs md:text-gray-600 md:dark:text-gray-300 md:mb-2">
              {membro.funcao}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;