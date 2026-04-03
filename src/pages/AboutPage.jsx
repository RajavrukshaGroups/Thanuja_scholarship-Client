import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, Target, CheckCircle2, Quote, GraduationCap, Globe, ShieldCheck, Trophy, Users, Bell,ArrowRight } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import aboutStudents from '../../public/assets/about-students.png'
import aboutStudentsImage from '../../public/assets/aboutStudentsImage.jpg'

const offers = [
  { icon: GraduationCap, title: "Fully Funded Scholarships", desc: "Comprehensive coverage including tuition, living expenses, and travel." },
  { icon: Globe, title: "Global Opportunities", desc: "Access to prestigious scholarships across Europe, North America, and Asia." },
  { icon: ShieldCheck, title: "Government Scholarships", desc: "Verified listings from national and international government bodies." },
  { icon: Trophy, title: "Merit-Based Awards", desc: "Recognition for academic excellence, leadership, and specialized talents." },
  { icon: Users, title: "1:1 Consultant Support", desc: "Strategic guidance from experts to optimize your application success." },
  { icon: Bell, title: "Timely Updates & Alerts", desc: "Never miss a deadline with our automated tracking and notification system." }
];
const steps = [
  { icon: LayoutGrid, title: "Structured Intelligence", desc: "We categorize and structure complex scholarship data into actionable insights." },
  { icon: ShieldCheck, title: "Verified Database", desc: "Every opportunity on our platform undergoes a rigorous verification process for authenticity." },
  { icon: Target, title: "Strategic Application", desc: "We help students identify the opportunities where they have the highest probability of success." }
];
const commitments = [
  { title: "Accuracy & Transparency", desc: "We provide clear, honest, and verified information about every opportunity." },
  { title: "Timely Updates", desc: "Real-time alerts to ensure you are always ahead of critical deadlines." },
  { title: "Structured Information", desc: "Complex data simplified into easy-to-understand formats for better decision making." },
  { title: "Strategic Guidance", desc: "More than just data—we provide the strategy to help you win." }
];

export const AboutPage = () => {
  const navigate = useNavigate();
  return(
    
  <>
    
  <section className="relative pt-32 pb-20 md:pt-32 md:pb-12 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E6D] via-[#0B1E6D] to-[#1F6FB2] -z-10" />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 -z-10" />
    
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block text-[#D4AF37] font-sans font-semibold uppercase tracking-[0.3em] text-xs mb-4">
          Empowering Ambition, Enabling Access
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
          Redefining Access to <span className="text-[#D4AF37] italic">Global Scholarships</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-lg leading-relaxed font-[#F5F7FA]">
          We bridge the gap between ambitious students and world-class education through strategic intelligence and verified opportunities.
        </p>
        {/* <div className="flex flex-wrap gap-4">
          <button  onClick={() => navigate("/scholarship")} className="bg-[#D4AF37] text-[#0B1E6D] px-8 py-4 rounded-sm font-semibold hover:bg-white transition-all duration-300 flex items-center gap-2 group">
            Explore Opportunities
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-white/30 text-white px-8 py-4 rounded-sm font-semibold hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div> */}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative hidden md:block"
      >
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img 
            src={aboutStudents} 
            alt="Student Graduation" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0B1E6D]/20 mix-blend-multiply" />
        </div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1F6FB2]/30 rounded-full blur-3xl" />
      </motion.div>
    </div>
  </section>

  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold uppercase tracking-widest text-xs">
            <div className="w-8 h-px bg-[#D4AF37]" />
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1E6D] leading-tight">
            Bridging the Gap Between <span className="text-[#D4AF37]">Potential</span> and <span className="text-[#D4AF37]">Opportunity</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Edufin Scholarships, we believe that talent is universal, but opportunity is not. Our mission is to democratize access to global education by providing a premium, intelligence-driven platform that connects ambitious students with verified scholarship opportunities.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We move beyond simple listings. We provide structured, verified information and strategic guidance to ensure that financial barriers never stand in the way of academic excellence.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <div className="text-3xl font-serif font-bold text-[#0B1E6D]">5000+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">Verified Scholarships</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-[#0B1E6D]">120+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">Partner Universities</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-4/5 rounded-sm overflow-hidden shadow-2xl">
            <img 
              src={aboutStudentsImage}
              alt="Students working" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-[#0B1E6D] p-8 text-white shadow-xl max-w-xs hidden lg:block">
            <Quote className="w-8 h-8 text-[#D4AF37] mb-4" />
            <p className="font-serif italic text-lg leading-relaxed">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>

  <section className="py-24 bg-bg-[#F5F7FA]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="A comprehensive ecosystem designed to support your academic journey from discovery to application.">
        What We <span className="text-[#D4AF37]">Offer</span>
      </SectionHeading>
      
      <div className="grid md:grid-cols-3 gap-8">
        {offers.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 border border-gray-100 hover:border-[#D4AF37]/30 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-bg-[#F5F7FA] rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#0B1E6D] transition-colors duration-300">
              <item.icon className="w-7 h-7 text-[#0B1E6D] group-hover:text-[#D4AF37] transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1E6D] mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  
   <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold uppercase tracking-widest text-xs mb-6">
            <div className="w-8 h-px bg-[#D4AF37]" />
            Strategic Intelligence
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1E6D] mb-8 leading-tight">
            Our <span className="text-[#D4AF37]">Approach</span> to Scholarship Success
          </h2>
          
          <div className="space-y-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bg-[#F5F7FA] flex items-center justify-center text-[#0B1E6D] font-bold">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#0B1E6D] mb-2">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 bg-[#0B1E6D] p-12 text-white rounded-sm shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-6 text-[#D4AF37]">Why Intelligence Matters</h3>
            <p className="text-blue-100 mb-8 leading-relaxed">
              In the world of global scholarships, information is abundant but clarity is rare. Our approach focuses on filtering the noise to provide students with the specific data points they need to succeed.
            </p>
            <ul className="space-y-4">
              {["Eligibility Mapping", "Deadline Tracking", "Success Rate Analysis", "Requirement Breakdown"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium tracking-wide">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute -top-10 -right-10 w-full h-full border-2 border-[#D4AF37]/20 -z-10" />
        </motion.div>
      </div>
    </div>
  </section>

  <section className="py-24 bg-[#0B1E6D] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1F6FB2] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </div>
    
    <div className="max-w-7xl mx-auto px-6 relative  text-[#F5F7FA] z-10">
      <SectionHeading isDarkBg subtitle="Our values define our platform and the trust we build with our global community of students.">
        Our <span className="text-[#D4AF37]">Commitment</span>
      </SectionHeading>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {commitments.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 rounded-sm hover:bg-white/10 transition-all duration-300"
          >
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mb-6" />
            <h3 className="text-xl font-serif font-bold text-white mb-4">{item.title}</h3>
            <p className="text-blue-100/80 leading-relaxed text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-32 bg-white text-center relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="w-20 h-20 bg-bg-[#F5F7FA] rounded-full flex items-center justify-center mx-auto mb-8">
          <Target className="w-10 h-10 text-[#0B1E6D]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#0B1E6D] leading-tight">
          “Talent deserves <span className="text-[#D4AF37] italic">access</span>—not obstacles.”
        </h2>
        <p className="text-xl text-gray-500 font-[#F5F7FA] max-w-2xl mx-auto">
          Our vision is a world where every ambitious student, regardless of their financial background, has the tools to reach their full potential.
        </p>
      </motion.div>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-bold text-gray-50 -z-10 select-none opacity-50">
      VISION
    </div>
  </section>

  <section className="py-24 bg-[#F5F7FA]">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-12 md:p-20 shadow-2xl border border-gray-100 rounded-sm"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1E6D] mb-6">
          Your Journey Starts <span className="text-[#D4AF37]">Here</span>
        </h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Join thousands of students who have transformed their academic futures through Edufin Scholarships. Trust our platform to be your strategic partner in navigating the complex landscape of global education funding.
        </p>
        {/* <button onClick={()=>navigate("/login")} className="bg-[#0B1E6D] text-white px-10 py-4 rounded-sm font-bold text-lg hover:bg-[#1F6FB2] transition-all duration-300 shadow-xl shadow-[#0B1E6D]/20 flex items-center gap-3 mx-auto group">
          Get Started Today
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button> */}
      </motion.div>
    </div>
  </section>
  </>
)};
