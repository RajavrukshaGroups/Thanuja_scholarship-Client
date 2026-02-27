import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter = ({ value, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-edufin-deep mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-edufin-royal/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-edufin-gold/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-edufin-royal/5 blur-[120px] rounded-full" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-edufin-deep leading-[1.1] mb-6">
            India’s Most Trusted <br />
            <span className="text-edufin-royal">Scholarship Discovery</span> Platform
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover verified government, private & global scholarships tailored to your academic journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white p-2 rounded-2xl shadow-2xl premium-shadow border border-slate-100 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center px-4 w-full">
              <Search className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search by field, degree or category..." 
                className="w-full py-4 text-slate-700 focus:outline-none focus:ring-0 placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="h-10 w-px bg-slate-100 hidden md:block" />
            <div className="flex items-center px-4 gap-2 cursor-pointer group w-full md:w-auto py-4 md:py-0">
              <GraduationCap className="text-edufin-gold" size={20} />
              <span className="text-slate-600 font-medium whitespace-nowrap">Degree Level</span>
              <ChevronDown size={16} className="text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <Link to="/search" className="w-full md:w-auto bg-edufin-deep text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-edufin-royal hover:scale-[1.03] transition-all active:scale-95 shadow-lg shadow-edufin-deep/20">
              Search Scholarships <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-slate-100 pt-12">
          <Counter value={2500} label="Students Guided" />
          <Counter value={100} label="Verified Scholarships" />
          <Counter value={95} label="Success Rate" suffix="%" />
          <Counter value={50} label="Partner MNCs" suffix="+" />
        </div>
      </div>
    </section>
  );
};

const ScholarshipCard = ({ scholarship, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[20px] p-6 border-t-4 border-t-edufin-gold premium-shadow group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-edufin-royal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          scholarship.category === 'Government' ? 'bg-emerald-50 text-emerald-600' :
          scholarship.category === 'Abroad' ? 'bg-blue-50 text-blue-600' :
          'bg-amber-50 text-amber-600'
        }`}>
          {scholarship.category}
        </span>
        <div className="text-slate-400 group-hover:text-edufin-royal transition-colors">
          <Award size={20} />
        </div>
      </div>
      <h3 className="text-xl font-display font-bold text-edufin-deep mb-3 group-hover:text-edufin-royal transition-colors relative z-10">
        {scholarship.name}
      </h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2 relative z-10">
        {scholarship.description}
      </p>
      <div className="space-y-2 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CheckCircle2 size={16} className="text-edufin-gold" />
          <span>{scholarship.eligibility}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="font-medium">Deadline:</span>
          <span>{scholarship.deadline}</span>
        </div>
      </div>
      <Link to={`/scholarship/${scholarship.id}`} className="block w-full py-3 rounded-xl border-2 border-slate-100 text-edufin-deep font-bold text-center group-hover:bg-edufin-deep group-hover:text-white group-hover:border-edufin-deep transition-all relative z-10">
        Apply Now
      </Link>
    </motion.div>
  );
};

const FeaturedScholarships = () => {
  const scholarships = [
    { id: 1, name: "Reliance Foundation Undergraduate Scholarship", category: "Private", description: "Supporting meritorious students from all streams for their undergraduate education in India.", eligibility: "Class 12 pass, Family income < 15L", deadline: "Oct 15, 2025" },
    { id: 2, name: "National Overseas Scholarship Scheme", category: "Government", description: "Financial assistance to selected students for pursuing Master's level courses and Ph.D. abroad.", eligibility: "SC/ST candidates, Age < 35", deadline: "Aug 30, 2025" },
    { id: 3, name: "Tata Scholarship at Cornell University", category: "Abroad", description: "Full-tuition scholarship for Indian citizens who have been admitted to Cornell for undergraduate study.", eligibility: "Indian Citizen, Financial Need", deadline: "Jan 02, 2026" },
  ];

  return (
    <section id="scholarships" className="py-24 bg-edufin-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-edufin-deep mb-4">Featured Scholarships</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Carefully curated high-value opportunities for ambitious students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((s, idx) => (
            <div key={s.id}>
              <ScholarshipCard scholarship={s} index={idx} />
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/search" className="inline-flex items-center gap-2 text-edufin-royal font-bold hover:gap-4 transition-all">
            View All 2,500+ Scholarships <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { title: "Expert Scholarship Advisors", desc: "Get 1:1 guidance from experts who have helped thousands of students secure funding.", icon: <Users className="text-edufin-gold" /> },
    { title: "100% Verified Listings", desc: "Every scholarship on our platform is manually verified to ensure legitimacy and accuracy.", icon: <ShieldCheck className="text-edufin-gold" /> },
    { title: "Personalized Guidance", desc: "Receive tailored recommendations based on your academic profile and career goals.", icon: <CheckCircle2 className="text-edufin-gold" /> },
    { title: "Premium Benefits", desc: "Unlock early access, application reviews, and exclusive MNC sponsored opportunities.", icon: <Award className="text-edufin-gold" /> }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-edufin-deep mb-8 leading-tight">
              Why Indian Students <br />
              <span className="text-edufin-royal text-3xl md:text-4xl">Choose Edufin Scholarships</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 premium-shadow group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h4 className="font-display font-bold text-edufin-deep mb-2">{f.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-square rounded-[40px] overflow-hidden premium-shadow">
              <img src="/assets/students.jpg" alt="Students studying" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Membership = () => {
  return (
    <section id="premium" className="py-24 bg-edufin-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Unlock Premium Scholarship Support</h2>
          <p className="text-slate-300 max-w-xl mx-auto">Invest in your future with our expert-led premium plans.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 flex flex-col">
            <h3 className="text-2xl font-display font-bold text-white mb-2">🥇 Gold Plan</h3>
            <div className="text-4xl font-bold text-white mb-8">₹299</div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Basic scholarship alerts', 'Priority support', 'Access to curated list'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300"><CheckCircle2 size={18} className="text-edufin-gold" /><span>{item}</span></li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-edufin-deep transition-all">Upgrade to Gold</button>
          </div>
          <div className="bg-white rounded-3xl p-8 flex flex-col relative gold-glow border-2 border-edufin-gold scale-105">
            <h3 className="text-2xl font-display font-bold text-edufin-deep mb-2">👑 Platinum Plan</h3>
            <div className="text-4xl font-bold text-edufin-deep mb-8">₹499</div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Everything in Gold', '1:1 expert consultation', 'Application review', 'Early access', 'WhatsApp support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600"><CheckCircle2 size={18} className="text-edufin-gold" /><span>{item}</span></li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-edufin-deep text-white font-bold hover:bg-edufin-royal transition-all">Upgrade to Platinum</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Ananya Sharma", course: "B.Tech, IIT Delhi", text: "Edufin helped me find the Reliance Foundation scholarship which I didn't even know existed.", rating: 5 },
    { name: "Rahul Verma", course: "MBBS, KGMU Lucknow", text: "The Platinum plan is worth every penny. The 1:1 consultation helped me perfect my essay.", rating: 5 },
    { name: "Sneha Patel", course: "MS in CS, Stanford", text: "Securing an overseas scholarship seemed impossible until I found Edufin.", rating: 5 }
  ];

  return (
    <section id="success-stories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-edufin-deep mb-4">What Our Students Say</h2>
          <p className="text-slate-500">Join thousands of successful students who found their future with us.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-edufin-bg p-8 rounded-3xl border border-slate-100">
              <div className="flex gap-1 mb-4">{[...Array(r.rating)].map((_, i) => <Star key={i} size={16} className="fill-edufin-gold text-edufin-gold" />)}</div>
              <p className="text-slate-600 italic mb-6">"{r.text}"</p>
              <div><div className="font-bold text-edufin-deep">{r.name}</div><div className="text-sm text-slate-400">{r.course}</div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-edufin-bg rounded-[40px] p-12 md:p-20 border border-slate-100 premium-shadow">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-edufin-deep mb-6">Your Scholarship Journey Starts Here.</h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">Join thousands of Indian students building their academic future with Edufin.</p>
          <Link to="/search" className="inline-block bg-edufin-deep text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-edufin-royal hover:scale-105 transition-all shadow-xl shadow-edufin-deep/20">Start Searching Now →</Link>
        </motion.div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedScholarships />
      <WhyChooseUs />
      <Membership />
      <Testimonials />
      <FinalCTA />
    </>
  );
};
