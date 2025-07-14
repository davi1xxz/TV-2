import React from 'react';
import { X, Play } from 'lucide-react';

interface NewsModalProps {
  open: boolean;
  onClose: () => void;
  image: string;
  title: string;
  subtitulo: string; // subtítulo
  details: string;
  date: string;
  isVideo?: boolean;
  videoUrl?: string;
}

const NewsModal: React.FC<NewsModalProps> = ({ 
  open, 
  onClose, 
  image, 
  title, 
  subtitulo, 
  details, 
  date, 
  isVideo = false, 
  videoUrl 
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
          <div className="w-full max-w-2xl aspect-video rounded-2xl mb-10 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )
      }
    }
    
    return (
      <img
        src={image}
        alt={title}
        className="w-full max-w-2xl h-80 object-cover object-center rounded-2xl mb-10 shadow-2xl border border-gray-200 dark:border-gray-800"
      />
    )
  }

  if (!open) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full p-0 relative animate-fade-in overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center p-8 md:p-12">
          {renderMedia()}
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white leading-tight text-center">
            {title}
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-4 leading-relaxed text-center max-w-xl">
            {subtitulo || ''}
          </p>
          <div className="w-full max-w-xl">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-left bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              {details}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal; 