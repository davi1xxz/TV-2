import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p
          className="text-sm text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:underline"
          onClick={() => navigate('/admin/login')}
          title="Acessar painel admin"
        >
          © 2025 Todos os direitos reservados.
        </p>
        
        {/* Ícones de redes sociais */}
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
    </footer>
  );
};

export default Footer; 