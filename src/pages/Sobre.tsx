
import React, { useState, useEffect, useRef } from 'react';
import { Award, Heart, Radio, Users, Headphones, Music, MapPin, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTeam } from '@/hooks/use-team'
import { supabase } from '@/lib/supabase'


const Sobre = () => {
  const [currentValueSlide, setCurrentValueSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const { team, loading: teamLoading, loadTeam } = useTeam();

  useEffect(() => { loadTeam(); }, []);

  const values = [
    {
      icon: Award,
      title: "Qualidade",
      description: "Oferecemos sempre a melhor qualidade de som e conteúdo para nossos ouvintes"
    },
    {
      icon: Heart,
      title: "Paixão",
      description: "Fazemos nosso trabalho com amor e dedicação, transmitindo essa energia"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Valorizamos nossa conexão com a comunidade e ouvimos nossos ouvintes"
    }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextValueSlide = () => {
    setCurrentValueSlide((prev) => (prev + 1) % values.length);
  };

  const prevValueSlide = () => {
    setCurrentValueSlide((prev) => (prev - 1 + values.length) % values.length);
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(nextValueSlide, 4000);
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  // Autoplay do carrossel de valores
  useEffect(() => {
    if (isMobile && values.length > 0) {
      startAutoPlay();
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isMobile, values.length]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-300 pt-0">
        {/* Header Section */}
      <section className="pt-16 pb-8 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 mt-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] bg-clip-text text-transparent">
                Sobre a TV OK
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Aanos levando música, informação e entretenimento para toda a região com qualidade e dedicação
              </p>
            </div>

            {/* Mission Section */}
            <div className="grid lg:grid-cols-2 gap-6 items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">
                  Nossa Missão
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  A TV OK nasceu com o objetivo de conectar pessoas através da música e da informação. 
                  Acreditamos no poder da comunicação para transformar comunidades e aproximar corações.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nossa programação é cuidadosamente planejada para atender todos os gostos musicais, 
                  sempre com qualidade de som cristalina e apresentadores apaixonados pelo que fazem.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 flex items-center justify-center">
                    <img src="/imagens/logo.png" alt="Logo TV OK" className="w-56 h-56 object-contain" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#f37335] to-[#fda63d] rounded-full flex items-center justify-center animate-pulse">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Nossa Equipe
              </h2>
              {teamLoading ? (
                <div className="text-center py-8 text-muted-foreground">Carregando equipe...</div>
              ) : team.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">Nenhum membro cadastrado.</div>
              ) : (
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
              )}
            </div>

            {/* Values Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-10 md:bg-transparent md:dark:bg-transparent md:shadow-none md:rounded-none">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Nossos Valores
              </h2>
              {/* MOBILE: Carrossel */}
              {isMobile && (
                <div className="relative w-full">
                  <div className="overflow-hidden rounded-xl pb-4">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentValueSlide * 100}%)` }}
                    >
                      {values.map((value, index) => (
                        <div key={index} className="w-full flex-shrink-0 min-w-full">
                          <div className="px-4 w-full h-full">
                            <div className="h-full max-w-sm mx-auto">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                                  <value.icon className="w-12 h-12 text-[#ad1917]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                  {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                                  {value.description}
                  </p>
                </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Indicadores */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {values.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentValueSlide(index);
                          resetAutoPlay();
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentValueSlide
                            ? 'bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] w-6'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* DESKTOP: Grid */}
              {!isMobile && (
                <div className="grid md:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                        <value.icon className="w-12 h-12 text-[#ad1917]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                        {value.description}
                  </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Section - Carrossel 3D */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Entre em Contato
              </h2>
              <ContactCarousel3D />
            </div>

          </div>
        </section>
      </div>
  );
};

export default Sobre;

const contactCards = [
  {
    href: "https://maps.google.com",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: <div className="w-12 h-12 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center mb-4"><MapPin className="w-6 h-6 text-white" /></div>,
    title: "Endereço",
    desc: <span>Rua da Rádio, 123<br/>Centro, Cidade</span>,
  },
  {
    href: "tel:3599799988",
    icon: <div className="w-12 h-12 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center mb-4"><Phone className="w-6 h-6 text-white" /></div>,
    title: "Telefone",
    desc: <span>(35) 9979-9988</span>,
  },
  {
    href: "mailto:lopeshow@hotmail.com",
    icon: <div className="w-12 h-12 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center mb-4"><Mail className="w-6 h-6 text-white" /></div>,
    title: "Email",
    desc: <span>lopeshow@hotmail.com</span>,
  },
];

function ContactCarousel3D() {
  const [current, setCurrent] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // Sempre declarar hooks no topo!
  React.useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Autoplay só no mobile
  React.useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % contactCards.length), 4000);
    return () => clearInterval(timer);
  }, [isMobile]);

  if (isMobile) {
    const next = () => setCurrent((prev) => (prev + 1) % contactCards.length);
    const prev = () => setCurrent((prev) => (prev - 1 + contactCards.length) % contactCards.length);
    return (
      <div className="relative flex flex-col items-center">
        <div className="flex items-center justify-center w-full">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 shadow hover:scale-110 transition-all absolute left-0 z-10 top-1/2 -translate-y-1/2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
          </button>
          <div className="w-full flex justify-center">
            {contactCards.map((card, idx) =>
              idx === current ? (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.target}
                  rel={card.rel}
                  className="bg-white dark:bg-gray-800 rounded-2xl w-[260px] h-[200px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-center min-h-[48px]">{card.icon}</div>
                  <div className="flex items-center justify-center min-h-[28px]">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg text-center">{card.title}</h3>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200 text-sm text-center min-h-[40px] flex items-center justify-center">{card.desc}</div>
                </a>
              ) : null
            )}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 shadow hover:scale-110 transition-all absolute right-0 z-10 top-1/2 -translate-y-1/2"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 text-black dark:text-white" />
          </button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {contactCards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Grid padrão no desktop
  return (
    <div className="flex justify-center gap-8">
      {contactCards.map((card) => (
        <a
          key={card.title}
          href={card.href}
          target={card.target}
          rel={card.rel}
          className="bg-white dark:bg-gray-800 rounded-2xl w-[260px] h-[200px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 space-y-3 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="flex items-center justify-center min-h-[48px]">{card.icon}</div>
          <div className="flex items-center justify-center min-h-[28px]">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg text-center">{card.title}</h3>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-sm text-center min-h-[40px] flex items-center justify-center">{card.desc}</div>
        </a>
      ))}
    </div>
  );
}
