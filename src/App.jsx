import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { DetailsPage } from "./pages/DetailsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import CheckOutPage from "./components/CheckoutPage";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi%20Edufin%20Team,%20I%20want%20help%20finding%20scholarships%20for%20my%20education."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse-gold cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={32} fill="white" />
    </motion.a>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        duration={3000}
      />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/scholarship/:id" element={<DetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
          </Routes>
        </main>

        <Footer />
        {/* <WhatsAppButton /> */}
      </div>
    </Router>
  );
}
