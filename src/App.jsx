import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Membership, { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { SearchPage } from "./pages/SearchPage";
import { DetailsPage } from "./pages/DetailsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import CheckOutPage from "./components/CheckoutPage";
import LoginPage from "./pages/scholarPages/loginPage";
import ProtectedRoute from "./components/protectedRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import PaymentSuccess from "./components/PaymentSuccess";
import SuccessStories from "./pages/SuccessStories";

import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServicesPage from "./pages/ServicesPage";
import ContactUs from "./components/ContactUs";

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
      href="https://wa.me/916366836187?text=Hi%20Edufin%20Team,%20I%20want%20help%20finding%20scholarships%20for%20my%20education."
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
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/scholarship/:id" element={<DetailsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/membership" element={<Membership/>}/>
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
