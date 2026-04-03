import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiGlobe } from "react-icons/fi";

const ContactUs = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { fullName, phone, email, message } = form;

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(fullName)) {
      toast.error("Full name should contain only letters");
      return false;
    }

    if (!phone) {
      toast.error("Contact number is required");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Contact number must be 10 digits");
      return false;
    }

    if (!email) {
      toast.error("Email is required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return false;
    }

    if (message.length < 10) {
      toast.error("Message should be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION FIRST
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await api.post("/scholar/contact", form);

      toast.success(res.data?.message || "Message sent successfully!");

      setForm({
        fullName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 pt-28 pb-16">
      {/* LEFT SIDE - FORM */}
      <div className="flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-gray-500 mt-2">
              We’re here to help you with scholarships
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  handleChange(e);
                }
              }}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Contact Number"
              value={form.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleChange(e);
                }
              }}
              required
              maxLength={10}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - INFO PANEL */}
      <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-14 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold mb-4">Get in Touch 📩</h2>

          <p className="text-gray-300 mb-6">
            Have questions about scholarships, applications, or plans? Our
            expert team is here to guide you at every step.
          </p>

          {/* 🔥 RESPONSE BADGE */}
          <div className="mb-6 inline-block bg-white/10 px-4 py-2 rounded-full text-sm">
            ⚡ Response within 24 hours
          </div>

          {/* 🔥 FEATURES */}
          <div className="space-y-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">🎓</div>
              <div>
                <p className="font-semibold">Scholarship Guidance</p>
                <p className="text-gray-300 text-sm">
                  Get expert help in choosing the right scholarships.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">📄</div>
              <div>
                <p className="font-semibold">Application Support</p>
                <p className="text-gray-300 text-sm">
                  Assistance with documents and application process.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">🚀</div>
              <div>
                <p className="font-semibold">Faster Approvals</p>
                <p className="text-gray-300 text-sm">
                  Improve your chances with our expert guidance.
                </p>
              </div>
            </div>
          </div>

          {/* 🔥 CONTACT INFO */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <FiGlobe size={20} />
              </div>
              <div>
                <p className="font-semibold">Website</p>
                <p className="text-gray-300 text-sm">
                  www.edufinscholarships.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <FiMail size={20} />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-300 text-sm">
                  edufinscholarships@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <FiPhone size={20} />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-300 text-sm">+91 8618308471</p>
              </div>
            </div>
          </div>

          {/* 🔥 CTA */}
          <div className="mt-8">
            <button className="bg-white text-blue-900 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Talk to Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
