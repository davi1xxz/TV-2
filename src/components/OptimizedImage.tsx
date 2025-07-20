import React from 'react';
import { useImageCache } from '../hooks/use-image-cache';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallback = '/imagens/placeholder.svg',
  priority = false,
  loading = 'lazy'
}) => {
  const { imageSrc, isLoading, error } = useImageCache({
    src,
    fallback
  });

  return (
    <img
      src={imageSrc || src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchpriority={priority ? 'high' : 'auto'}
      crossOrigin="anonymous"
      style={{
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
};

export default OptimizedImage; 