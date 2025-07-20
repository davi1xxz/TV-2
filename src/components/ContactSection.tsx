import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContactCard {
  href: string;
  target?: string;
  rel?: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const ContactSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const contactCards: ContactCard[] = [
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

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Autoplay só no mobile
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % contactCards.length), 4000);
    return () => clearInterval(timer);
  }, [isMobile, contactCards.length]);

  const next = () => setCurrent((prev) => (prev + 1) % contactCards.length);
  const prev = () => setCurrent((prev) => (prev - 1 + contactCards.length) % contactCards.length);

  if (isMobile) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Entre em Contato
        </h2>
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
            {contactCards.map((card, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-gradient-to-r from-[#ad1917] via-[#f37335] to-[#fda63d] w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                aria-label={`Ir para ${card.title}`}
                aria-current={idx === current ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Grid padrão no desktop
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Entre em Contato
      </h2>
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
    </div>
  );
};

export default ContactSection;
