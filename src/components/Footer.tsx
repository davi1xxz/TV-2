import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer component rendered');
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4 text-center">
        {/* Removido o formulário de recado, será componente separado */}
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          © 2025 TV OK. Todos os direitos reservados. | @flow.grafico
        </p>
        <div className="mt-2">
          <Link 
            to="/admin/login" 
            className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <Settings className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 