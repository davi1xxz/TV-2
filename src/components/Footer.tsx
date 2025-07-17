import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-2">
      <div className="container mx-auto px-4 text-center">
        <p
          className="text-sm text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:underline"
          onClick={() => navigate('/admin/login')}
          title="Acessar painel admin"
        >
          © 2025 TV OK. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 