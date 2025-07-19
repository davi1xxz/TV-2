import React from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, className = "" }) => {
  return (
    <div className={`w-full aspect-video overflow-hidden mb-0 ${className}`}>
      <video controls className="w-full h-full object-cover bg-[#222]">
        <source src={videoSrc} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
};

export default VideoPlayer;
