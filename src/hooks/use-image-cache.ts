import { useState, useEffect } from 'react';

interface UseImageCacheOptions {
  src: string;
  fallback?: string;
  cacheTime?: number;
}

export const useImageCache = ({ src, fallback, cacheTime = 31536000 }: UseImageCacheOptions) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const loadImage = async () => {
      setIsLoading(true);
      setError(false);

      try {
        // Verifica se a imagem já está em cache
        const cachedImage = sessionStorage.getItem(`img_${src}`);
        if (cachedImage) {
          setImageSrc(cachedImage);
          setIsLoading(false);
          return;
        }

        // Carrega a imagem com cache otimizado
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          // Salva no cache da sessão
          sessionStorage.setItem(`img_${src}`, src);
          setImageSrc(src);
          setIsLoading(false);
        };

        img.onerror = () => {
          if (fallback) {
            setImageSrc(fallback);
          } else {
            setError(true);
          }
          setIsLoading(false);
        };

        // Adiciona timestamp para cache busting se necessário
        const url = new URL(src);
        if (!url.searchParams.has('v')) {
          url.searchParams.set('v', Date.now().toString());
        }
        
        img.src = url.toString();
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src, fallback]);

  return { imageSrc, isLoading, error };
}; 