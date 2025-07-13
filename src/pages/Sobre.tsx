
import React from 'react';
import { Award, Heart, Radio, Users, Headphones, Music, MapPin, Phone, Mail } from 'lucide-react';

const Sobre = () => {
  const team = [
    {
      name: "Maria Santos",
      role: "Apresentadora",
      program: "Bom Dia WebRadio",
      image: "/placeholder.svg"
    },
    {
      name: "João Silva",
      role: "Apresentador",
      program: "Sucessos da Manhã",
      image: "/placeholder.svg"
    },
    {
      name: "Ana Costa",
      role: "Apresentadora",
      program: "Hora do Almoço",
      image: "/placeholder.svg"
    },
    {
      name: "Carlos Oliveira",
      role: "Apresentador",
      program: "Tarde Musical",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Sobre a WebRadio
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Há mais de 15 anos levando música, informação e entretenimento para toda a região com qualidade e dedicação
            </p>
          </div>

            {/* Mission Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Nossa Missão
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  A WebRadio nasceu com o objetivo de conectar pessoas através da música e da informação. 
                  Acreditamos no poder da comunicação para transformar comunidades e aproximar corações.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nossa programação é cuidadosamente planejada para atender todos os gostos musicais, 
                  sempre com qualidade de som cristalina e apresentadores apaixonados pelo que fazem.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Radio className="w-32 h-32 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-red-500 font-medium">
                      {member.program}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-20">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Award className="w-12 h-12 text-red-500" />
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
                    <Heart className="w-12 h-12 text-red-500" />
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
                    <Users className="w-12 h-12 text-red-500" />
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
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Endereço</h3>
                  <p className="text-gray-600 dark:text-gray-300">Rua da Rádio, 123<br />Centro, Cidade</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-300">(11) 9999-9999</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">contato@webradio.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Sobre;
