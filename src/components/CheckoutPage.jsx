import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  updateEnquiryDetails,
  resetApplicationState,
  setSelectedPlan,
  addScholarship,
} from "../../store/applicationSlice";
import {
  FiArrowLeft,
  FiChevronRight,
  FiUser,
  FiMail,
  FiBookOpen,
  FiCheckCircle,
  FiCreditCard,
  FiAward,
  FiShoppingBag,
} from "react-icons/fi";
import { MdOutlineSchool, MdOutlineWorkspacePremium } from "react-icons/md";
import { FaUniversity, FaRegClock } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { AnimatePresence, motion } from "motion/react";
import api from "../utils/api";
import { Phone } from "lucide-react";
import { toast } from "sonner";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPaymentDone, setIsPaymentDone] = useState(false);

  useEffect(() => {
    const loadMemberData = async () => {
      try {
        const token = localStorage.getItem("scholarToken");

        if (!token) return;

        const res = await api.get("/scholar/user/profile");

        const plan = res.data.membershipPlan;
        const scholarships = res.data.selectedScholarships || [];

        if (plan) {
          dispatch(setSelectedPlan(plan));
        }

        scholarships.forEach((s) => {
          dispatch(addScholarship(s.scholarship));
        });
      } catch (err) {
        console.log("Failed to load member data", err);
      }
    };

    loadMemberData();
  }, []);

  const enquiry = useSelector((state) => state.application.enquiryDetails);
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedScholarships = useSelector(
    (state) => state.application.selectedScholarships,
  );
  const selectedPlan = useSelector((state) => state.application.selectedPlan);

  const [form, setForm] = useState({
    fullName: enquiry?.fullName || "",
    email: enquiry?.email || "",
    phone: enquiry?.phone || "",
    educationLevel: enquiry?.educationLevel || "",
    degreeLevel: enquiry?.degreeLevel || "",
  });

  const handleChange = (key, value) => {
    let updatedForm = { ...form, [key]: value };

    // Clear degreeLevel if switching to Pre Metric
    if (key === "educationLevel" && value === "Pre Metric") {
      updatedForm.degreeLevel = "";
    }

    setForm(updatedForm);

    dispatch(updateEnquiryDetails({ [key]: value }));
  };

  //   const isFormValid = form.fullName && form.email && form.educationLevel;
  const isFormValid =
    form.fullName &&
    form.email &&
    form.educationLevel &&
    (form.educationLevel !== "Post Metric" || form.degreeLevel);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  //   const handlePayment = async () => {
  //     try {
  //       if (isProcessing) return;
  //       setIsProcessing(true);
  //       const payload = {
  //         planId: selectedPlan._id,
  //         enquiryId: enquiry?._id,

  //         userData: {
  //           fullName: form.fullName,
  //           email: form.email,
  //           phone: form.phone,
  //           educationLevel: form.educationLevel,
  //           degreeLevel: form.degreeLevel,
  //         },

  //         scholarships: selectedScholarships,
  //       };

  //       const { data } = await api.post("/scholar/payment/create-order", payload);

  //       const order = data.order;

  //       const rzp = new window.Razorpay({
  //         key: data.key,
  //         amount: order.amount,
  //         currency: order.currency,
  //         order_id: order.id,
  //         name: "Edufin Scholarships",
  //         description: selectedPlan.planTitle,

  //         handler: async function (response) {
  //           await api.post("/scholar/payment/verify-payment", {
  //             ...response,
  //           });

  //           //   alert("Payment successful");
  //           toast.success("Payment Successful");
  //           dispatch(resetApplicationState());
  //           navigate("/dashboard");
  //         },
  //       });

  //       rzp.open();
  //     } catch (err) {
  //       if (err.response?.data?.message) {
  //         // alert(err.response.data.message);
  //         toast.error(err.response.data.message);
  //       } else {
  //         // alert("Something went wrong");
  //         toast.error("Something went wrong");
  //       }
  //     }
  //   };

  const handlePayment = async () => {
    try {
      if (isProcessing) return; // prevent double click

      setIsProcessing(true);

      const payload = {
        planId: selectedPlan._id,
        enquiryId: enquiry?._id,

        userData: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          educationLevel: form.educationLevel,
          degreeLevel: form.degreeLevel,
        },

        scholarships: selectedScholarships,
      };

      const { data } = await api.post("/scholar/payment/create-order", payload);

      const order = data.order;

      const rzp = new window.Razorpay({
        key: data.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Edufin Scholarships",
        description: selectedPlan.planTitle,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },

        handler: async function (response) {
          setIsPaymentDone(true);
          await api.post("/scholar/payment/verify-payment", {
            ...response,
          });

          dispatch(resetApplicationState());

          setTimeout(() => {
            navigate("/payment-success");
          }, 1200);
        },
      });

      rzp.open();
    } catch (err) {
      setIsProcessing(false);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-20">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-50/50 to-amber-50/50 -z-10" />
      <div className="fixed top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      <div className="pt-24 pb-32 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with progress indicator */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Checkout
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Complete your application
              </p>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FiCheckCircle className="text-white text-sm" />
              </div>
              <span className="text-sm font-medium text-gray-900">Details</span>
            </div>
            <div className="w-12 h-0.5 bg-blue-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">2</span>
              </div>
              <span className="text-sm font-medium text-gray-400">Payment</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - Form (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden"
            >
              {/* Card Header with gradient */}
              <div className="bg-gradient-to-r from-blue-50 to-amber-50/50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                    <FiUser className="text-white text-sm" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Applicant Details
                  </h2>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-10">
                  Please provide your personal information
                </p>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <FiUser className="text-blue-500" size={14} />
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      value={form.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    {form.fullName && (
                      <FiCheckCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                        size={18}
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <FiMail className="text-amber-500" size={14} />
                    Email Address <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    {form.email && form.email.includes("@") && (
                      <FiCheckCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                        size={18}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <FiUser className="text-blue-500" size={14} />
                    Phone <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    {form.phone && (
                      <FiCheckCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                        size={18}
                      />
                    )}
                  </div>
                </div>

                {/* Education Level */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <GiGraduateCap className="text-blue-500" size={14} />
                    Education Level <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative group">
                    <select
                      value={form.educationLevel}
                      onChange={(e) =>
                        handleChange("educationLevel", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                    >
                      <option value="" disabled>
                        Select education level
                      </option>
                      <option value="Pre Metric">Pre Metric</option>
                      <option value="Post Metric">Post Metric</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <FiChevronRight
                        className="text-gray-400 rotate-90"
                        size={18}
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {form.educationLevel === "Post Metric" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                        <GiGraduateCap className="text-blue-500" size={14} />
                        Degree Level <span className="text-amber-500">*</span>
                      </label>

                      <div className="relative">
                        <select
                          value={form.degreeLevel}
                          onChange={(e) =>
                            handleChange("degreeLevel", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                        >
                          <option value="">Select degree level</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                          <option value="PhD">PhD</option>
                        </select>

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <FiChevronRight
                            className="text-gray-400 rotate-90"
                            size={18}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form status */}
                <div className="mt-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <FiCheckCircle className="text-blue-500" size={14} />
                    <span>
                      All fields marked with{" "}
                      <span className="text-amber-500">*</span> are required
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Selected Scholarships Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-amber-50/50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                    <FaUniversity className="text-white text-sm" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Selected Scholarships
                  </h2>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-10">
                  {selectedScholarships.length} scholarship
                  {selectedScholarships.length !== 1 ? "s" : ""} selected
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {selectedScholarships.map((sch, index) => (
                    <motion.div
                      key={sch._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <MdOutlineSchool className="text-white text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {sch.name}
                        </p>
                        {sch.catchyPhrase && (
                          <p className="text-xs text-amber-600 italic">
                            {sch.catchyPhrase}
                          </p>
                        )}
                      </div>
                      <FiCheckCircle
                        className="text-green-500 flex-shrink-0"
                        size={18}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Summary (1 column) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden">
                {/* Summary Header */}
                <div className="bg-gradient-to-r from-blue-600 to-amber-600 px-6 py-5">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FiCreditCard className="text-white/90" />
                    Order Summary
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    Review your application before payment
                  </p>
                </div>

                {/* Membership Plan */}
                {selectedPlan && (
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <MdOutlineWorkspacePremium
                        className="text-amber-500"
                        size={18}
                      />
                      <h3 className="text-sm font-medium text-gray-700">
                        Membership Plan
                      </h3>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-xl p-4 border border-amber-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {selectedPlan.planTitle}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <FaRegClock className="text-amber-500" size={10} />
                            {selectedPlan.planDuration} days validity
                          </p>
                        </div>
                        <span className="text-xl font-bold text-amber-600">
                          {formatCurrency(selectedPlan.amount)}
                        </span>
                      </div>

                      {selectedPlan.benefits &&
                        selectedPlan.benefits.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-amber-200/50">
                            <p className="text-xs font-medium text-gray-600 mb-2">
                              Benefits included:
                            </p>
                            <ul className="space-y-1">
                              {selectedPlan.benefits
                                .slice(0, 2)
                                .map((benefit, i) => (
                                  <li
                                    key={i}
                                    className="text-xs text-gray-600 flex items-start gap-1.5"
                                  >
                                    <span className="text-amber-500 mt-0.5">
                                      •
                                    </span>
                                    {benefit}
                                  </li>
                                ))}
                              {selectedPlan.benefits.length > 2 && (
                                <li className="text-xs text-gray-400">
                                  +{selectedPlan.benefits.length - 2} more
                                  benefits
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Summary Items */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(selectedPlan?.amount || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Platform fee</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">Included</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                        {formatCurrency(selectedPlan?.amount || 0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      All prices are in INR (Indian Rupee)
                    </p>
                  </div>
                </div>

                {/* Secure Checkout Badge */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg py-3 px-4">
                    <FiCheckCircle className="text-green-500" />
                    <span>Secure SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-2xl py-4 px-6 z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* PREVIOUS BUTTON */}
          <motion.button
            onClick={() => navigate("/search")}
            disabled={isProcessing || isPaymentDone}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
          >
            <FiArrowLeft className="text-lg" />
            Previous
          </motion.button>

          {/* PROCEED BUTTON */}
          <motion.button
            onClick={handlePayment}
            whileHover={isFormValid && !isProcessing ? { scale: 1.02 } : {}}
            whileTap={isFormValid && !isProcessing ? { scale: 0.98 } : {}}
            disabled={!isFormValid || isProcessing || isPaymentDone}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              isFormValid && !isProcessing
                ? "bg-gradient-to-r from-blue-600 to-amber-500 text-white hover:shadow-xl hover:shadow-blue-500/25"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>{isProcessing ? "Processing..." : "Proceed to Payment"}</span>
            {!isProcessing && <FiChevronRight className="text-lg" />}
          </motion.button>
        </div>
      </motion.div>
      {(isProcessing || isPaymentDone) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-xl shadow-xl text-center">
            <p className="text-lg font-semibold text-gray-800">
              {isPaymentDone
                ? "Finalizing your payment..."
                : "Processing payment..."}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Please do not close or go back
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutPage;
