
import React from 'react';
import { useTeam } from '../hooks/use-team';
import { useResponsive } from '../hooks/use-responsive';

// Componentes refatorados
import AboutHeader from '../components/AboutHeader';
import MissionSection from '../components/MissionSection';
import TeamSection from '../components/TeamSection';
import ValuesSection from '../components/ValuesSection';
import ContactSection from '../components/ContactSection';
import PageContainer from '../components/PageContainer';

const Sobre = () => {
  const { team, loading: teamLoading, loadTeam } = useTeam();
  const { isMobile } = useResponsive();

  React.useEffect(() => { 
    loadTeam(); 
  }, [loadTeam]);

  return (
    <PageContainer className="pt-0">
      <AboutHeader 
        title="Sobre a TV OK"
        subtitle="Aanos levando música, informação e entretenimento para toda a região com qualidade e dedicação"
      />

      {/* Mission Section */}
      <MissionSection />

      {/* Team Section */}
      <TeamSection team={team} loading={teamLoading} />

      {/* Values Section */}
      <ValuesSection isMobile={isMobile} />

      {/* Contact Section */}
      <ContactSection />
    </PageContainer>
  );
};

export default Sobre;
