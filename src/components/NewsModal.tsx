import React, { useEffect } from 'react';
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
  autor?: string;
  created_at?: string;
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
  videoUrl,
  autor,
  created_at
}) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

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
        className="w-full max-w-2xl aspect-video object-cover object-center rounded-2xl mb-10 shadow-2xl border border-gray-200 dark:border-gray-800"
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
        className="overflow-hidden rounded-2xl max-w-4xl w-full p-0 relative animate-fade-in outline-none border-none"
        style={{ background: 'transparent' }}
      >
        <div
          className="bg-white dark:bg-gray-900 max-h-[90vh] overflow-y-auto hide-scrollbar outline-none border-none rounded-2xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', padding: 0, margin: 0 }}
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          <style>{`
            @media (max-width: 768px) {
              .hide-scrollbar {
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                background: transparent !important;
              }
            }
            @media (min-width: 769px) {
              .hide-scrollbar {
                scrollbar-width: auto !important;
                -ms-overflow-style: auto !important;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: block !important;
                width: 10px !important;
                background: #f3f3f3 !important;
              }
              .hide-scrollbar::-webkit-scrollbar-thumb {
                background: #bbb !important;
                border-radius: 8px !important;
              }
              .dark .hide-scrollbar::-webkit-scrollbar {
                background: #232936 !important;
              }
              .dark .hide-scrollbar::-webkit-scrollbar-thumb {
                background: #444 !important;
              }
            }
          `}</style>
          <div className="sticky top-0 z-10 bg-transparent">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
              onClick={onClose}
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col items-center p-8 md:p-12">
            {renderMedia()}
            
            {/* Título */}
            <div className="w-full max-w-3xl mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4 text-center md:text-left">
                {title}
              </h3>
              
              {/* Subtítulo */}
              {subtitulo && (
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-justify max-w-2xl mx-auto">
                  {subtitulo}
                </p>
              )}
            </div>

            {/* Conteúdo principal */}
            <div className="w-full max-w-3xl">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-100">
                  <div 
                    className="leading-relaxed text-left px-2 text-base md:text-justify md:text-lg whitespace-pre-wrap break-words"
                    style={{
                      lineHeight: '1.8',
                      fontFamily: 'inherit'
                    }}
                  >
                    {details}
                  </div>
                </div>
              </div>
            </div>

            {/* Metadados */}
            <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-center md:space-x-4 text-sm text-gray-700 dark:text-gray-300 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-row items-center space-x-2 mb-1 md:mb-0">
                {created_at && (
                  <div className="flex items-center space-x-1">
                    <span>às {new Date(created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                {autor && (
                  <div className="flex items-center space-x-1">
                    <span>Por {autor}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal; 