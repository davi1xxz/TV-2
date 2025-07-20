import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3 mt-auto">
      <div className="container mx-auto px-4">
        {/* MOBILE: Layout vertical */}
        {isMobile && (
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-3">
              <a href="https://www.youtube.com/tvokminas" target="_blank" rel="noopener noreferrer" aria-label="Seguir TV OK no YouTube">
                <img src="/imagens/icones/you.ico" alt="YouTube" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.instagram.com/tvokpassos" target="_blank" rel="noopener noreferrer" aria-label="Seguir TV OK no Instagram">
                <img src="/imagens/icones/insta.ico" alt="Instagram" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.facebook.com/tvokpassos" target="_blank" rel="noopener noreferrer" aria-label="Seguir TV OK no Facebook">
                <img src="/imagens/icones/face.ico" alt="Facebook" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://wa.me/553599799988" target="_blank" rel="noopener noreferrer" aria-label="Enviar mensagem no WhatsApp">
                <img src="/imagens/icones/whats.ico" alt="WhatsApp" className="w-6 h-6 object-contain"/>
              </a>
            </div>
            <div className="overflow-x-auto">
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
                ©2025 TV OK. Todos os direitos reservados | design by <a href="https://instagram.com/davy.flow" target="_blank" rel="noopener noreferrer" className="text-purple-500 dark:text-purple-400 hover:underline cursor-pointer">DΛVY Flow</a>
              </p>
            </div>
          </div>
        )}
        {/* DESKTOP: Layout horizontal */}
        {!isMobile && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              ©2025 TV OK. Todos os direitos reservados | design by <a href="https://instagram.com/davy.flow" target="_blank" rel="noopener noreferrer" className="text-purple-500 dark:text-purple-400 hover:underline cursor-pointer">DΛVY Flow</a>
            </p>
            <div className="flex space-x-6">
              <a href="https://www.youtube.com/tvokminas" target="_blank" rel="noopener noreferrer" aria-label="Seguir TV OK no YouTube">
                <img src="/imagens/icones/you.ico" alt="YouTube" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.instagram.com/tvokpassos" target="_blank" rel="noopener noreferrer" aria-label="Seguir TV OK no Instagram">
                <img src="/imagens/icones/insta.ico" alt="Instagram" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.facebook.com/tvokpassos" target="_blank" rel="noopener noreferrer" aria-label="Seguir TV OK no Facebook">
                <img src="/imagens/icones/face.ico" alt="Facebook" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://wa.me/553599799988" target="_blank" rel="noopener noreferrer" aria-label="Enviar mensagem no WhatsApp">
                <img src="/imagens/icones/whats.ico" alt="WhatsApp" className="w-6 h-6 object-contain"/>
              </a>
            </div>
        </div>
        )}
      </div>
    </footer>
  );
};

export default Footer; 