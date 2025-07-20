import React from 'react';
import { Phone, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactDropdown = () => {
  const [isDesktop, setIsDesktop] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Fechar o popup quando clicar fora
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.contact-popup')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isDesktop) return null;

  return (
    <div className="relative contact-popup">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 focus:outline-none focus:ring-0"
            aria-label={isOpen ? 'Fechar menu de contato' : 'Abrir menu de contato'}
        onClick={() => setIsOpen(!isOpen)}
          >
            <Phone className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contato</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Fechar menu de contato"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <a 
                href="tel:3599799988" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Ligar para (35) 9979-9988"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Telefone</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">(35) 9979-9988</p>
                </div>
              </a>
              
              <a 
                href="mailto:lopeshow@hotmail.com" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Enviar email para lopeshow@hotmail.com"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#ad1917] to-[#fda63d] rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Email</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">lopeshow@hotmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDropdown; 