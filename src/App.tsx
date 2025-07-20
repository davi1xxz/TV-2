
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Index = lazy(() => import('./pages/Index'));
const Noticias = lazy(() => import('./pages/Noticias'));
const Programacao = lazy(() => import('./pages/Programacao'));
const Sobre = lazy(() => import('./pages/Sobre'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Painel17342 = lazy(() => import('./pages/17342'));
const Login17342 = lazy(() => import('./pages/Login17342'));

const queryClient = new QueryClient();

// Componente para rolar para o topo
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            {/* Overlay global para menu mobile */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fechar menu mobile ao clicar fora"
              />
            )}
            <Suspense
              fallback={
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  width: '100vw',
                  background: 'rgba(255,255,255,0.85)',
                  zIndex: 9999,
                  position: 'fixed',
                  top: 0,
                  left: 0
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="#ad1917" strokeWidth="4" strokeDasharray="31.4 31.4" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" from="0 24 24" to="360 24 24"/>
                    </circle>
                  </svg>
                  <span style={{marginTop: 16, fontSize: '1.2rem', color: '#ad1917'}}>Carregando...</span>
                </div>
              }
            >
              <Routes>
                {/* Public routes - with navbar/footer */}
                <Route path="/" element={
                  <>
                    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <Index />
                    <Footer />
                  </>
                } />
                <Route path="/noticias" element={
                  <>
                    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <Noticias />
                    <Footer />
                  </>
                } />
                <Route path="/programacao" element={
                  <>
                    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <Programacao />
                    <Footer />
                  </>
                } />
                <Route path="/sobre" element={
                  <>
                    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <Sobre />
                    <Footer />
                  </>
                } />
                <Route path="*" element={
                  <>
                    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <NotFound />
                    <Footer />
                  </>
                } />
                {/* Rotas de admin */}
                <Route path="/17342" element={<Painel17342 />} />
                <Route path="/17342/login" element={<Login17342 />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
