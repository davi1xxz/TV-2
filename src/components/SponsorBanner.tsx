import React from 'react';

const SponsorBanner = ({ sponsors, sponsorsLoading, currentBannerSlide, bannerHeights }) => {
  if (sponsorsLoading) {
    return (
      <div className="w-full h-[40px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
        Carregando patrocinadores...
      </div>
    );
  }

  if (sponsors.length === 0) return null;

  return (
    <div 
      className="flex transition-transform duration-500"
      style={{ transform: `translateX(-${currentBannerSlide * 100}%)` }}
    >
      {sponsors.map((sponsor, index) => (
        sponsor.url_link ? (
          <a
            key={sponsor.id}
            href={sponsor.url_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex-shrink-0"
            style={bannerHeights[index]}
          >
            <img
              src={sponsor.url_imagem}
              alt={sponsor.nome}
              className="w-full object-cover"
              style={bannerHeights[index]}
            />
          </a>
        ) : (
          <img
            key={sponsor.id}
            src={sponsor.url_imagem}
            alt={sponsor.nome}
            className="w-full flex-shrink-0 object-cover"
            style={bannerHeights[index]}
          />
        )
      ))}
    </div>
  );
};

export default SponsorBanner;
