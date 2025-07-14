
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Admin routes - without navbar/footer */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Public routes - with navbar/footer */}
            <Route path="/" element={
              <>
                <Navbar />
                <Index />
                <Footer />
              </>
            } />
            <Route path="/noticias" element={
              <>
                <Navbar />
                <Noticias />
                <Footer />
              </>
            } />
            <Route path="/programacao" element={
              <>
                <Navbar />
                <Programacao />
                <Footer />
              </>
            } />
            <Route path="/sobre" element={
              <>
                <Navbar />
                <Sobre />
                <Footer />
              </>
            } />
            <Route path="*" element={
              <>
                <Navbar />
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

export default App;
