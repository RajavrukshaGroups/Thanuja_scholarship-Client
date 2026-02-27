import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export const SearchPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-edufin-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-edufin-deep mb-4">Find Your Scholarship</h1>
          <p className="text-slate-500">Search through thousands of verified opportunities tailored to your profile.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-edufin-deep flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
                <button className="text-xs text-edufin-royal font-bold">Clear All</button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Field of Study</label>
                  <div className="space-y-2">
                    {['Engineering', 'Medicine', 'Arts', 'Science', 'Commerce'].map(item => (
                      <label key={item} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-edufin-royal focus:ring-edufin-royal" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Degree Level</label>
                  <div className="space-y-2">
                    {['School', 'Undergraduate', 'Postgraduate', 'PhD'].map(item => (
                      <label key={item} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-edufin-royal focus:ring-edufin-royal" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Scholarship Type</label>
                  <div className="space-y-2">
                    {['Government', 'Private', 'MNC Sponsored', 'Study Abroad'].map(item => (
                      <label key={item} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-edufin-royal focus:ring-edufin-royal" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center gap-4">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-slate-400 mr-3" size={20} />
                <input 
                  type="text" 
                  placeholder="Search scholarships by name, provider or keyword..." 
                  className="w-full py-2 text-slate-700 focus:outline-none font-medium"
                />
              </div>
              <button className="bg-edufin-deep text-white px-6 py-2.5 rounded-xl font-bold hover:bg-edufin-royal transition-all">
                Search
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500 text-sm font-medium">Showing results for your search</span>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <SlidersHorizontal size={16} />
                <span>Sort by: <span className="font-bold text-edufin-deep cursor-pointer">Latest</span></span>
              </div>
            </div>

            {/* Empty State / Placeholder for results */}
            <div className="grid gap-6">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse"
                >
                  <div className="h-6 bg-slate-100 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-slate-50 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-50 rounded w-1/2 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-slate-100 rounded w-24"></div>
                    <div className="h-10 bg-slate-200 rounded w-32"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
