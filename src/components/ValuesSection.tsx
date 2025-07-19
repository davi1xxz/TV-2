import React from 'react';
import ValuesCarousel from './ValuesCarousel';

interface ValuesSectionProps {
  isMobile: boolean;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ isMobile }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-10 md:bg-transparent md:dark:bg-transparent md:shadow-none md:rounded-none">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Nossos Valores
      </h2>
      <ValuesCarousel isMobile={isMobile} />
    </div>
  );
};

export default ValuesSection;