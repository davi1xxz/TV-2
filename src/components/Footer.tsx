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
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/you.png" alt="YouTube" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/insta.png" alt="Instagram" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/face.png" alt="Facebook" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://wa.me/553599799988" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/whats.png" alt="WhatsApp" className="w-6 h-6 object-contain"/>
              </a>
            </div>
            <div className="overflow-x-auto">
              <p
                className="text-xs text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:underline whitespace-nowrap"
                onClick={() => navigate('/admin/login')}
                title="Acessar painel admin"
              >
                ©2025 TV OK. Todos os direitos reservados | @flash.grafico
              </p>
            </div>
          </div>
        )}
        {/* DESKTOP: Layout horizontal */}
        {!isMobile && (
          <div className="flex justify-between items-center">
            <p
              className="text-sm text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:underline"
              onClick={() => navigate('/admin/login')}
              title="Acessar painel admin"
            >
              ©2025 TV OK. Todos os direitos reservados | @flash.grafico
            </p>
            <div className="flex space-x-6">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/you.png" alt="YouTube" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/insta.png" alt="Instagram" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/face.png" alt="Facebook" className="w-6 h-6 object-contain"/>
              </a>
              <a href="https://wa.me/553599799988" target="_blank" rel="noopener noreferrer">
                <img src="/imagens/icones/whats.png" alt="WhatsApp" className="w-6 h-6 object-contain"/>
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer; 