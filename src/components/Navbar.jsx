import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ScholarshipEnquiryModal from "./ScholarshipEnquiryModal";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* ===============================
     SCROLL EFFECT
  =============================== */

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     CHECK LOGIN STATE
  =============================== */

  useEffect(() => {
    const token = localStorage.getItem("scholarToken");
    setIsLoggedIn(!!token);
  }, [location.pathname]);
  /* ===============================
     LOGOUT
  =============================== */

  const handleLogout = () => {
    localStorage.removeItem("scholarToken");
    localStorage.removeItem("scholarUser");

    setIsLoggedIn(false);
    navigate("/");
  };

  /* ===============================
     NAV ITEMS
  =============================== */

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Scholarships", path: "/search" },
    { name: "Services", path: "/services" },
    { name: "Success Stories", path: "/success-stories" },
  ];

  const enquiry = useSelector((state) => state.application.enquiryDetails);

  const handleScholarshipClick = () => {
    // If user already logged in → go directly
    if (isLoggedIn) {
      navigate("/search");
      return;
    }

    // If enquiry already submitted
    if (enquiry) {
      navigate("/search");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0  left-0 right-0 z-50 transition-all duration-300  bg-white/90 backdrop-blur-md py-3 
       
        `}
         //    ${
        //   isScrolled
        //     ? "bg-white/90 backdrop-blur-md py-3 shadow-sm"
        //     : "bg-transparent py-5"
        // }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex flex-col items-center ">
            <img
              src="/assets/edufin-logo.png"
              alt="Edufin Logo"
              className="h-20 w-auto"
            />

            {/* <div className="flex flex-col leading-none text-center">
              <span
                className="text-edufin-deep text-xl tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Edufin
              </span>

              <span
                className="text-[8px] text-edufin-gold uppercase -mt-1"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.3em",
                }}
              >
                Scholarships
              </span>
            </div> */}
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.name === "Scholarships" ? (
                <button
                  key={item.name}
                  onClick={handleScholarshipClick}
                  className="font-medium text-slate-600 hover:text-edufin-royal"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-edufin-royal"
                      : "text-slate-600 hover:text-edufin-royal"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}

            {/* DASHBOARD */}
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="font-medium text-slate-600 hover:text-edufin-royal"
              >
                Dashboard
              </Link>
            )}

            {/* LOGIN / LOGOUT BUTTON */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-edufin-deep text-white px-6 py-2.5 rounded-full font-semibold hover:bg-edufin-royal transition shadow-lg"
              >
                login
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-edufin-deep"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
            >
              {navItems.map((item) =>
                item.name === "Scholarships" ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleScholarshipClick();
                    }}
                    className="text-slate-600 font-medium py-2 text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-slate-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ),
              )}

              {/* DASHBOARD */}
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className="text-slate-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {/* LOGIN / LOGOUT */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-500 font-medium py-2 text-left"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="text-edufin-deep font-medium py-2 text-left"
                >
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {!isLoggedIn && (
        <ScholarshipEnquiryModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};
