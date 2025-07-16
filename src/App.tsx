
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Noticias from "./pages/Noticias";
import Programacao from "./pages/Programacao";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import React, { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {/* Overlay global para menu mobile */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fechar menu mobile ao clicar fora"
              />
            )}
            <Routes>
              {/* Admin routes - without navbar/footer */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
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
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
