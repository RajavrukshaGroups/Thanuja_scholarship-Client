
import { Globe, Headphones, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Link
                to="/"
                className="flex justify-center  flex-col items-center  "
              >
                <img
                  src="/assets/edufin-logo.png"
                  alt="Edufin Logo"
                  className="h-14 w-auto "
                />
                {/* <br />
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
                  letterSpacing: '0.3em',
                }}
              >
                Scholarships
              </span>
            </div> */}
              </Link>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering Indian students to achieve their academic dreams
              through verified scholarship discovery and expert guidance.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-edufin-deep mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              {/* <li>
                <Link
                  to="/search"
                  className="hover:text-edufin-royal transition-colors"
                >
                  Search Scholarships
                </Link>
              </li> */}
              <li>
                <Link
                  to="/membership"
                  className="hover:text-edufin-royal transition-colors"
                >
                  Premium Membership
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-edufin-royal transition-colors"
                >
                  Scholarship Advisors
                </Link>
              </li>
              {/* <li><Link to="/success-stories" className="hover:text-edufin-royal transition-colors">Success Stories</Link></li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-edufin-deep mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              {/* <li><a href="#" className="hover:text-edufin-royal transition-colors">Help Center</a></li> */}
              <li>
                <a
                  href="/contact"
                  className="hover:text-edufin-royal transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-edufin-royal transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-edufin-royal transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-edufin-deep mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Globe size={16} />
                <span>www.edufinscholarships.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Headphones size={16} />
                <span>edufinscholarships@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} />
                <span>+91 6366836187</span>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">© 2026 Edufin Scholarships. All rights reserved.</p>
          <div className="flex gap-6">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-edufin-royal hover:text-white transition-all cursor-pointer">
              <span className="text-xs font-bold">In</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-edufin-royal hover:text-white transition-all cursor-pointer">
              <span className="text-xs font-bold">Tw</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-edufin-royal hover:text-white transition-all cursor-pointer">
              <span className="text-xs font-bold">Ig</span>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};
