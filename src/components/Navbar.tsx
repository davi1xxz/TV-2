
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Phone, Mail } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ContactDropdown from './ContactDropdown';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [showContact, setShowContact] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Notícias', href: '/noticias' },
    { name: 'Programação', href: '/programacao' },
    { name: 'Sobre', href: '/sobre' },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70
        px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/imagens/logo.png" alt="Logo TV OK" className="w-16 h-16 object-contain" />
            </Link>
          </div>

          {/* Navigation Links - Centered (Desktop Only) */}
          <div className="show-on-desktop absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center h-12 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.href)
                      ? 'text-[#ad1917]'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#ad1917]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#ad1917] transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* ContactDropdown à esquerda do botão de tema */}
            <ContactDropdown />
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              tabIndex={-1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 focus:outline-none focus:ring-0 active:bg-transparent shadow-none ring-0 outline-none"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </Button>

            {/* Mobile menu button (Mobile Only) */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                aria-label="Abrir menu mobile"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-fade-in fixed left-0 right-0 top-[70px] z-50"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                style={{ borderTop: '1px solid #eee', marginTop: 8, paddingTop: 12 }}
                onClick={() => setShowContact((v) => !v)}
              >
                Contato
              </button>
              {showContact && (
                <div className="pl-6 pb-2 space-y-1">
                  <a href="tel:11999999999" className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <Phone className="h-4 w-4" />
                    <span>(35) 9979-9988</span>
                  </a>
                  <a href="mailto:lopeshow@hotmail.com" className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <Mail className="h-4 w-4" />
                    <span>lopeshow@hotmail.com</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
