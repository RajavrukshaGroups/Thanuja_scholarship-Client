import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Scholarships", path: "/search" },
    { name: "Scholorship Details", path: "/#premium" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* <Link to="/" className="flex items-center gap-3">
      <img 
        src="/assets/edufin-logo.png" 
        alt="Edufin Logo" 
        className="h-15 w-auto"
      />
      
      <div className="flex flex-col leading-none">
        <span className="text-edufin-deep font-display font-bold text-2xl tracking-tight">
          Edufin
        </span>
        
        <span className="text-sm text-edufin-gold font-sansCustom tracking-[0.3em] uppercase -mt-1">
          Scholarships
        </span>
      </div>
    </Link> */}

        <Link
          to="/"
          className="flex justify-center  flex-col items-center  ml-12 "
        >
          <img
            src="/assets/edufin-logo.png"
            alt="Edufin Logo"
            className="h-14 w-auto "
          />
          <br />
          <div className="flex flex-col leading-none text-center -mt-6">
            <span
              className="text-edufin-deep  text-xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              E d u f i n
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
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-colors ${location.pathname === item.path ? "text-edufin-royal" : "text-slate-600 hover:text-edufin-royal"}`}
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-edufin-deep text-white px-6 py-2.5 rounded-full font-semibold hover:bg-edufin-royal transition-all shadow-lg shadow-edufin-deep/20">
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-edufin-deep"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-slate-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-edufin-deep text-white px-6 py-3 rounded-xl font-semibold w-full mt-2">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { Menu, X } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Scholarships Search', path: '/search' },
//     { name: 'About Us', path: '/#about' },
//     { name: 'Scholarship Details', path: '/#premium' },
//     { name: 'Dashboard', path: '/dashboard' },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white/90 backdrop-blur-md py-8 shadow-sm'
//           : 'bg-transparent py-7'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 flex items-center relative">

//         {/* LEFT MENU (Desktop) */}
//         <div className="hidden md:flex items-center  gap-12 flex-1">
//           {navItems.slice(0, 3).map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`font-medium text-[18px]  transition-colors ${
//                 location.pathname === item.path
//                   ? 'text-edufin-royal'
//                   : 'text-slate-600 hover:text-edufin-royal'
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>

//         {/* CENTER LOGO */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 md:-ml-10 xl:-ml-12 p-8">
//           <Link to="/" className="flex justify-center  flex-col items-center ">
//             <img
//               src="/assets/edufin-logo.png"
//               alt="Edufin Logo"
//               className="h-14 w-auto mt-2"
//             />
//               <br />
//             <div className="flex flex-col leading-none text-center -mt-6">
//               <span
//                 className="text-edufin-deep  text-xl tracking-tight"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 E d u f i n
//               </span>

//               <span
//                 className="text-[8px] text-edufin-gold uppercase -mt-1"
//                 style={{
//                   fontFamily: "'Montserrat', sans-serif",
//                   letterSpacing: '0.3em',
//                 }}
//               >
//                 Scholarships
//               </span>
//             </div>
//           </Link>
//         </div>

//         {/* RIGHT MENU (Desktop) */}
//         <div className="hidden md:flex items-center justify-end gap-12 flex-1">
//           {navItems.slice(3, 5).map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`font-medium text-[18px] transition-colors ${
//                 location.pathname === item.path
//                   ? 'text-edufin-royal'
//                   : 'text-slate-600 hover:text-edufin-royal'
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}

//           <button className="bg-edufin-deep text-white px-6 py-2.5 rounded-full font-semibold hover:bg-edufin-royal transition-all shadow-lg shadow-edufin-deep/20">
//             Get Started
//           </button>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <div className="md:hidden ml-auto">
//           <button
//             className="text-edufin-deep"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU DROPDOWN */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.25 }}
//             className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
//           >
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className="text-slate-600 font-medium py-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             <button className="bg-edufin-deep text-white px-6 py-3 rounded-xl font-semibold w-full mt-2">
//               Get Started
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };
