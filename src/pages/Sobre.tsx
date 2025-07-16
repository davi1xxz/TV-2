
import React from 'react';
import { Award, Heart, Radio, Users, Headphones, Music, MapPin, Phone, Mail } from 'lucide-react';

const Sobre = () => {
  const team = [
    {
      name: "Marcos Lopes",
      role: "Presidente",
      image: "/placeholder.svg"
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-300 pt-[10px]">
        {/* Header Section */}
      <section className="pt-16 pb-8 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
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
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
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
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Nossa Equipe
              </h2>
              <div className="flex justify-center">
                <div className="text-center group">
                    <div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
                      <img
                      src={team[0].image}
                      alt={team[0].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {team[0].name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {team[0].role}
                    </p>
                  </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-20 md:bg-transparent md:dark:bg-transparent md:shadow-none md:rounded-none">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Award className="w-12 h-12 text-[#ad1917]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Qualidade
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Oferecemos sempre a melhor qualidade de som e conteúdo para nossos ouvintes
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Heart className="w-12 h-12 text-[#ad1917]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Paixão
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fazemos nosso trabalho com amor e dedicação, transmitindo essa energia
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Users className="w-12 h-12 text-[#ad1917]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Comunidade
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Valorizamos nossa conexão com a comunidade e ouvimos nossos ouvintes
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Entre em Contato
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Endereço</h3>
                  <p className="text-gray-600 dark:text-gray-300">Rua da Rádio, 123<br />Centro, Cidade</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-300">(11) 9999-9999</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">contato@tvok.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    {/* Ícone WhatsApp */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                      <path d="M12.04 2.003a9.97 9.97 0 0 0-8.89 14.36l-1.08 3.14a1.25 1.25 0 0 0 1.58 1.59l3.14-1.08A9.97 9.97 0 1 0 12.04 2.003zm0 1.5a8.47 8.47 0 0 1 7.5 12.5.75.75 0 0 0-.07.56l1.18 3.44-3.44-1.18a.75.75 0 0 0-.56.07A8.47 8.47 0 1 1 12.04 3.503zm-3.1 5.22c-.18-.4-.37-.41-.54-.42-.14-.01-.3-.01-.46-.01a.89.89 0 0 0-.64.3c-.2.22-.84.82-.84 2.01 0 1.19.86 2.34.98 2.5.12.16 1.7 2.7 4.2 3.68.59.23 1.05.37 1.41.47.59.16 1.13.14 1.56.09.48-.06 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.46-.28-.24-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.24-.66.81-.81.98-.15.17-.3.19-.54.07-.24-.12-.99-.37-1.89-1.18-.7-.62-1.18-1.38-1.32-1.62-.14-.24-.01-.37.11-.49.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.62-1.54-.88-2.19z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:underline">(11) 9999-9999</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Sobre;
