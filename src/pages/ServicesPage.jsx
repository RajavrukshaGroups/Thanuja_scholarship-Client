import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  FileText,
  Bell,
  Crown,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🎨 Brand Colors (from your logo)
// Primary Blue: #0B3C8C
// Secondary Blue: #1E6BB8
// Gold Accent: #D4AF37

const services = [
  {
    title: "Verified Scholarship Listings",
    icon: GraduationCap,
    description:
      "Access a structured and regularly updated database of national and international scholarships with accurate and verified information.",
    points: [
      "Fully Funded Scholarships",
      "Partial Scholarships",
      "Government Scholarships",
      "University-Based Scholarships",
      "Merit-Based Scholarships",
    ],
  },
  {
    title: "1:1 Expert Consultation",
    icon: Users,
    description:
      "Get personalized guidance from experts to choose the right scholarships and build a winning strategy.",
    points: [
      "Profile Evaluation",
      "Scholarship Shortlisting",
      "Application Strategy",
      //   "Country & Course Guidance",
    ],
  },
  {
    title: "Application Support",
    icon: FileText,
    description:
      "Simplifying your application journey with structured and step-by-step guidance.",
    points: [
      "Application Process Guidance",
      "Documentation Checklist",
      "Statement of Purpose (SOP) & Essay Direction",
      "Deadline Tracking",
    ],
  },
  {
    title: "Alerts & Notifications",
    icon: Bell,
    description:
      "Stay updated with real-time alerts so you never miss an opportunity.",
    points: [
      "Instant Notifications",
      "Deadline Reminders",
      "New Scholarship Alerts",
      "Personalized Updates",
    ],
  },
  {
    title: "Premium Membership",
    icon: Crown,
    description:
      "Unlock exclusive tools and advanced features for serious applicants.",
    points: [
      "Priority Updates",
      "Exclusive Opportunities",
      "Advanced Filters",
      "Personalized Recommendations",
    ],
  },
  {
    title: "Trusted & Reliable Data",
    icon: ShieldCheck,
    description:
      "We ensure accuracy and transparency in all the information we provide.",
    points: [
      "Verified Sources",
      "Regular Updates",
      "Structured Information",
      "Clear Guidance",
    ],
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0B3C8C] via-[#1E6BB8] to-[#0B3C8C] text-white pt-42 pb-12 px-6 text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#D4AF37,_transparent_60%)]" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Empowering your global education journey with expert guidance,
          verified scholarships, and strategic support.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#D4AF37]/10 mb-6">
                  <Icon className="text-[#D4AF37]" size={28} />
                </div>

                <h2 className="text-xl font-semibold mb-3 text-[#0B3C8C]">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-5">{service.description}</p>

                <ul className="space-y-2">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-[#D4AF37] to-[#e6c65c] py-20 text-center px-6 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Start Your Scholarship Journey Today
        </motion.h2>
        <p className="mb-8 max-w-xl mx-auto text-white/90">
          Join thousands of students who trust Edufin Scholarships to achieve
          their academic dreams without financial barriers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* <button onClick={()=>navigate("/scholarships")} className="bg-[#0B3C8C] text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition">
            Explore Scholarships
          </button> */}
          <button
            onClick={() => navigate("/contact")}
            className="border border-[#0B3C8C] text-[#0B3C8C] px-8 py-3 rounded-xl font-semibold hover:bg-[#0B3C8C] hover:text-white transition"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
