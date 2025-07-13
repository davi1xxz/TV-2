import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer component rendered');
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          © 2024 Rádio Web Vibe Central. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 