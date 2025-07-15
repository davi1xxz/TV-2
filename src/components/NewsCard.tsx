import React from 'react';
import { Play, Image } from 'lucide-react';

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
        return (
          <div className="relative w-full h-48 bg-gray-900">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors">
                <Play className="w-6 h-6 ml-1" />
              </div>
            </div>
          </div>
        )
      }
    }
    
    return (
      <div className="relative w-full h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isVideo && (
          <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">
            <Play className="w-4 h-4" />
          </div>
        )}
      </div>
    )
  }

  return (
  <div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    onClick={onClick}
  >
      {renderMedia()}
    <div className="flex-1 flex flex-col p-6">
      <h3 className="text-[21px] font-bold mb-2 text-gray-900 dark:text-white leading-tight">
        {title}
      </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed flex-1 break-words line-clamp-2">
          {subtitulo || ''}
      </p>
      <div className="mt-auto flex items-center justify-start text-sm text-gray-500 dark:text-gray-400 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        {date}
      </div>
    </div>
  </div>
);
};

export default NewsCard; 