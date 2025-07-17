import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ContactDropdown = () => {
  const [isDesktop, setIsDesktop] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 focus:outline-none focus:ring-0"
            aria-label="Abrir contato"
          >
            <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem className="cursor-pointer">
            <Phone className="mr-2 h-4 w-4" />
            <span>(35) 9979-9988</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            <span>lopeshow@hotmail.com</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContactDropdown; 