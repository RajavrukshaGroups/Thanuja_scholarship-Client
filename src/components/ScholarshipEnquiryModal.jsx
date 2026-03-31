import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEnquiryDetails } from "../../store/applicationSlice";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { FiX, FiUser, FiMail, FiPhone, FiChevronRight } from "react-icons/fi";
import { MdOutlineSchool, MdOutlineEmojiEvents } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

const ScholarshipEnquiryModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    educationLevel: "",
    degreeLevel: "",
  });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone); // Indian 10-digit
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = async () => {
    try {
      const payload = { ...form };

      // ✅ Clean payload
      // if (payload.educationLevel === "Pre Metric") {
      //   delete payload.degreeLevel;
      // }
      if (payload.educationLevel === "Pre Matric") {
        delete payload.degreeLevel;
      }

      const res = await api.post("/scholar/enquiry", payload);

      // ✅ ONLY Redux (no manual localStorage)
      dispatch(
        setEnquiryDetails({
          ...payload,
          enquiryId: res.data.data._id,
        }),
      );

      // ✅ Navigate
      navigate("/search");

      // ✅ Close modal
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const isFormValid = () => {
    if (!form.fullName || !form.email || !form.phone || !form.educationLevel)
      return false;
    if (!isValidEmail(form.email)) return false;
    if (!isValidPhone(form.phone)) return false;

    // if (form.educationLevel === "Post Metric" && !form.degreeLevel)
    if (form.educationLevel === "Post Matric" && !form.degreeLevel)
      return false;
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#0a1929]/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl w-[460px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* HEADER - Blue and gold theme */}
            <div className="p-8 pb-6 relative bg-gradient-to-br from-blue-50/30 to-amber-50/30">
              {/* Dual accent line - blue and gold */}
              <div className="absolute top-0 left-0 w-full h-1 flex">
                <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-blue-600" />
                <div className="w-1/2 h-full bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <MdOutlineEmojiEvents className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#0a1929] tracking-tight">
                      Find Scholarships
                    </h2>
                    <p className="text-sm text-[#1e3a5f] mt-1">
                      Enter your details to get started
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-white/80 flex items-center justify-center transition-colors group"
                >
                  <FiX className="text-[#1e3a5f] group-hover:text-[#0a1929] text-xl" />
                </button>
              </div>
            </div>

            {/* BODY - Form fields with blue and gold accents */}
            <div className="px-8 pb-6 overflow-y-auto flex-1 space-y-5">
              {/* FULL NAME */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0a1929]">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="text-[#64748b] group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-[#0a1929] placeholder-[#94a3b8] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0a1929]">
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="text-[#64748b] group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    placeholder="john@example.com"
                    type="email"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-[#0a1929] placeholder-[#94a3b8] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0a1929]">
                  Phone Number <span className="text-amber-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiPhone className="text-[#64748b] group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  {/* <input
                    placeholder="+1 234 567 8900"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-[#0a1929] placeholder-[#94a3b8] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  /> */}
                  <input
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-[#0a1929] placeholder-[#94a3b8] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={form.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // only numbers
                      handleChange("phone", value);
                    }}
                  />
                </div>
              </div>

              {/* EDUCATION LEVEL */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0a1929]">
                  Education Level <span className="text-amber-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MdOutlineSchool className="text-[#64748b] group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <select
                    className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-[#0a1929] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                    value={form.educationLevel}
                    onChange={(e) =>
                      handleChange("educationLevel", e.target.value)
                    }
                  >
                    <option value="" className="text-[#64748b]">
                      Select education level
                    </option>
                    <option value="Pre Matric" className="text-[#0a1929]">
                      Pre Matric
                    </option>
                    {/* <option value="Post Metric" className="text-[#0a1929]">
                      Post Metric
                    </option> */}
                    <option value="Post Matric" className="text-[#0a1929]">
                      Post Matric
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[#64748b]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* DEGREE - CONDITIONAL with animation */}
              <AnimatePresence>
                {/* {form.educationLevel === "Post Metric" && ( */}
                {form.educationLevel === "Post Matric" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="block text-sm font-medium text-[#0a1929]">
                      Degree Level <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <GiGraduateCap className="text-[#64748b] group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <select
                        className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-[#0a1929] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                        value={form.degreeLevel}
                        onChange={(e) =>
                          handleChange("degreeLevel", e.target.value)
                        }
                      >
                        <option value="" className="text-[#64748b]">
                          Select degree level
                        </option>
                        <option
                          value="Undergraduate"
                          className="text-[#0a1929]"
                        >
                          Undergraduate
                        </option>
                        <option value="Postgraduate" className="text-[#0a1929]">
                          Postgraduate
                        </option>
                        <option value="PhD" className="text-[#0a1929]">
                          PhD
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-[#64748b]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Required fields note */}
              <p className="text-xs text-[#64748b] pt-2">
                Fields marked with <span className="text-amber-500">*</span> are
                required
              </p>
            </div>

            {/* FOOTER - Blue and gold buttons */}
            <div className="px-8 py-6 bg-white border-t border-[#e2e8f0]">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 text-[#0a1929] font-medium rounded-2xl hover:bg-[#f1f5f9] transition-all border border-[#e2e8f0]"
                >
                  Cancel
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isFormValid()}
                  className={`px-8 py-3.5 rounded-2xl font-medium flex items-center gap-2 transition-all ${
                    isFormValid()
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]"
                      : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                  }`}
                >
                  <span>Next</span>
                  <FiChevronRight className="text-lg" />
                </button>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 left-0 w-full h-1 flex">
              <div className="w-1/2 h-full bg-gradient-to-r from-blue-500/20 to-blue-600/20" />
              <div className="w-1/2 h-full bg-gradient-to-r from-amber-400/20 to-amber-500/20" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScholarshipEnquiryModal;
