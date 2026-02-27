import { ArrowLeft, Calendar, MapPin, GraduationCap, Share2, Bookmark, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const DetailsPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/search" className="inline-flex items-center gap-2 text-slate-500 hover:text-edufin-royal font-medium mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Search
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">Government</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">Merit Based</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-edufin-deep mb-6 leading-tight">
                Scholarship Title Placeholder
              </h1>

              <div className="flex flex-wrap gap-6 mb-10 text-slate-500 border-b border-slate-100 pb-10">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-edufin-gold" />
                  <span>Deadline: <span className="font-bold text-slate-700">Oct 15, 2025</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-edufin-gold" />
                  <span>Location: <span className="font-bold text-slate-700">Pan India</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-edufin-gold" />
                  <span>Level: <span className="font-bold text-slate-700">Undergraduate</span></span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-display font-bold text-edufin-deep mb-4">Description</h3>
                <div className="space-y-4 text-slate-600 leading-relaxed mb-10">
                  <p className="bg-slate-50 h-4 w-full rounded animate-pulse"></p>
                  <p className="bg-slate-50 h-4 w-full rounded animate-pulse"></p>
                  <p className="bg-slate-50 h-4 w-3/4 rounded animate-pulse"></p>
                </div>

                <h3 className="text-xl font-display font-bold text-edufin-deep mb-4">Eligibility Criteria</h3>
                <ul className="space-y-4 mb-10">
                  {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-emerald-500 mt-0.5" />
                      <span className="bg-slate-50 h-4 w-2/3 rounded animate-pulse"></span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-display font-bold text-edufin-deep mb-4">Benefits</h3>
                <div className="bg-edufin-bg p-6 rounded-2xl border border-slate-100 mb-10">
                  <div className="h-12 bg-white rounded-xl w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-white rounded w-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-8 rounded-3xl premium-shadow border border-slate-100">
                <div className="text-center mb-8">
                  <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">Scholarship Amount</div>
                  <div className="text-4xl font-display font-bold text-edufin-deep">₹50,000 <span className="text-sm text-slate-400">/year</span></div>
                </div>

                <div className="space-y-4">
                  <button className="w-full py-4 bg-edufin-deep text-white rounded-2xl font-bold hover:bg-edufin-royal transition-all shadow-lg shadow-edufin-deep/20">
                    Apply Now
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                      <Bookmark size={18} /> Save
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                      <Share2 size={18} /> Share
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-4 rounded-xl text-sm">
                    <AlertCircle size={20} />
                    <p>Applications close in <span className="font-bold">12 days</span>. Apply soon!</p>
                  </div>
                </div>
              </div>

              <div className="bg-edufin-deep p-8 rounded-3xl text-white">
                <h4 className="font-display font-bold text-xl mb-4">Need help applying?</h4>
                <p className="text-slate-300 text-sm mb-6">Our experts can review your application and increase your chances of success.</p>
                <Link to="/#premium" className="block w-full py-3 bg-edufin-gold text-white text-center rounded-xl font-bold hover:scale-105 transition-all">
                  Get Expert Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
