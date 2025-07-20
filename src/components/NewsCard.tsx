import React from 'react';
import { Play, Image } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface NewsCardProps {
  image: string;
  title: string;
  subtitulo: string; // subtítulo
  date: string;
  onClick?: () => void;
  isVideo?: boolean;
  videoUrl?: string;
  autor?: string;
  created_at?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  image, 
  title, 
  subtitulo, 
  date, 
  onClick, 
  isVideo = false, 
  videoUrl,
  autor,
  created_at
}) => {
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const renderMedia = () => {
    if (isVideo && videoUrl) {
      const videoId = extractYouTubeId(videoUrl)
      if (videoId) {
        const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        
        return (
          <div className="relative w-full h-40">
            <OptimizedImage
              src={youtubeThumbnail}
              alt={title}
              className="w-full h-full object-cover"
              width={400}
              height={160}
              priority={true}
              loading="eager"
              fallback={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors"
                role="button"
                aria-label={`Reproduzir vídeo: ${title}`}
              >
                <Play className="w-6 h-6 ml-1" />
              </div>
            </div>
          </div>
        )
      }
    }
    
    return (
      <div className="relative w-full h-40">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          width={400}
          height={160}
          priority={true}
          loading="eager"
          fallback="/imagens/placeholder.svg"
        />
        {isVideo && (
          <div 
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
            role="button"
            aria-label={`Reproduzir vídeo: ${title}`}
          >
            <Play className="w-4 h-4" />
          </div>
        )}
      </div>
    )
  }

  return (
  <div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full min-h-[320px] transition-transform duration-300 ease-out md:hover:scale-105 md:hover:-translate-y-1 md:hover:shadow-2xl cursor-pointer"
    onClick={onClick}
  >
      {renderMedia()}
    <div className="flex-1 flex flex-col px-5 py-4">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white leading-tight line-clamp-2 break-normal">
        {title}
      </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed flex-1 break-normal line-clamp-3 text-sm">
          {subtitulo || ''}
      </p>
              <div className="mt-auto flex items-center justify-start text-sm text-gray-700 dark:text-gray-300 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        {date}
      </div>
    </div>
  </div>
);
};

export default NewsCard; 