import {
  User,
  Settings,
  Bell,
  Bookmark,
  FileText,
  Award,
  LogOut,
  ChevronRight,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  FiStar,
  // FiCrown,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiAward,
  FiCheckCircle as FiCheckCircleIcon,
} from "react-icons/fi";
import { MdOutlineSchool, MdOutlineEmojiEvents } from "react-icons/md";
import { FaUniversity, FaGraduationCap, FaRegClock } from "react-icons/fa";
import ScholarshipDetailsDrawer from "../components/ScholarshipDetailsDrawer";
import UpgradePlanModal from "./upgradePlanModal";
import UploadDocumentsModal from "../components/UploadDocumentsModal";

export const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [membershipPlans, setMembershipPlan] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const [upgradePlans, setUpgradePlans] = useState([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hasUpgradePlans, setHasUpgradePlans] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [requiredDocuments, setRequiredDocuments] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  const [applications, setApplications] = useState([]);
  console.log("required documents", applications);
  const navigate = useNavigate();

  console.log("user", user);
  console.log("membership plans", membershipPlans);
  console.log("upgraded plans", hasUpgradePlans);

  const sidebarItems = [
    { icon: <User size={20} />, label: "Profile Overview", key: "overview" },
    { icon: <Bookmark size={20} />, label: "Saved Scholarships", key: "saved" },
    { icon: <FileText size={20} />, label: "Check Status", key: "status" },
  ];

  /* ===============================
     FETCH USER PROFILE
  =============================== */

  const fetchApplications = async () => {
    try {
      const res = await api.get("/scholar/user/scholar/my-applications");
      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/scholar/user/profile");

        setUser(res.data?.user);
        setActivities(res.data?.selectedScholarships || []);
        setMembershipPlan(res.data?.membershipPlan || []);
        setRequiredDocuments(res.data.requiredDocuments || []);

        const upgradeRes = await api.get(
          "/scholar/user/scholar/membership/upgrade-options",
        );

        if (upgradeRes.data.upgradePlans.length > 0) {
          setHasUpgradePlans(true);
        }

        // ✅ IMPORTANT
        await fetchApplications();
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    setVisibleCount(5);
  }, [activeTab]);

  /* ===============================
     LOGOUT
  =============================== */
  const fetchUpgradePlans = async () => {
    try {
      const res = await api.get("/scholar/membership/upgrade-options");

      setUpgradePlans(res.data.upgradePlans);
      setShowUpgrade(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicationStatus = (scholarshipId) => {
    return applications.find(
      (app) => String(app.scholarshipId) === String(scholarshipId),
    );
  };

  // const app = getApplicationStatus(sch.scholarship?._id);

  const handleLogout = () => {
    localStorage.removeItem("scholarToken");
    localStorage.removeItem("scholarUser");

    navigate("/");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const savedScholarships = activities.filter((sch) => {
    const app = getApplicationStatus(sch?.scholarship?._id);
    return !app;
  });

  const statusScholarships = activities.filter((sch) => {
    const app = getApplicationStatus(sch?.scholarship?._id);
    return app;
  });

  const displayData =
    activeTab === "overview"
      ? activities
      : activeTab === "saved"
        ? savedScholarships
        : statusScholarships;

  const totalScholarships = activities.length;

  const underReviewCount = applications.filter(
    (app) => app.status === "under_review" || app.status === "submitted",
  ).length;

  const approvedCount = applications.filter(
    (app) => app.status === "approved",
  ).length;

  const totalApplications = applications.length || 1; // avoid divide by 0

  const underReviewPercent = (underReviewCount / totalApplications) * 100;
  const approvedPercent = (approvedCount / totalApplications) * 100;
  const totalPercent = 100; // full bar

  const statsData = [
    {
      label: "Total Scholarships",
      value: totalScholarships,
      percent: totalPercent,
      icon: <Bookmark className="text-white" size={20} />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Under Review",
      value: underReviewCount,
      percent: underReviewPercent,
      icon: <FileText className="text-white" size={20} />,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      label: "Approved",
      value: approvedCount,
      percent: approvedPercent,
      icon: <Award className="text-white" size={20} />,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-50/50 to-amber-50/50 -z-10" />
      <div className="fixed top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MdOutlineEmojiEvents className="text-white text-xl" />
            </div> */}
            <div className="mt-15">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  {user?.fullName || "Student"}
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Here's what's happening with your scholarship journey
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                <FaGraduationCap className="text-blue-500" size={16} />
                <span className="text-sm text-gray-600">
                  {user?.educationLevel || "Student"}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-amber-50 px-4 py-2 rounded-xl border border-blue-100">
                <FiMapPin className="text-amber-500" size={16} />
                <span className="text-sm font-medium text-gray-700">
                  {membershipPlans?.planTitle}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow hover:opacity-90"
            >
              Upload Documents
            </button>
          </div>
        </div>

        {hasUpgradePlans && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden mb-7"
          >
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* LEFT */}
              <div>
                <h3 className="text-lg font-semibold">🚀 Upgrade Your Plan</h3>

                <p className="text-sm text-white/90 mt-1">
                  Unlock more scholarships, faster approvals & premium support
                </p>

                <div className="mt-2 text-xs bg-white/20 inline-block px-3 py-1 rounded-full">
                  Current Plan: {membershipPlans?.planTitle || "Free Plan"}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-white text-blue-600 font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Upgrade Plans
                </button>

                {/* <button
                  onClick={fetchUpgradePlans}
                  className="bg-black/20 backdrop-blur px-5 py-2 rounded-lg hover:bg-black/30 transition"
                >
                  Upgrade Now
                </button> */}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden sticky top-24">
              {/* Profile Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-amber-600 px-6 py-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-300 rounded-full blur-3xl" />
                </div>

                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border-4 border-white/30 shadow-xl">
                    <User size={40} className="text-white" />
                  </div>

                  {/* USER DATA */}
                  <h3 className="font-bold text-xl text-white">
                    {user?.fullName || "Student Name"}
                  </h3>

                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/80 font-medium">
                      User ID: {user?.userId?.slice(-8) || "STU001"}
                    </p>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaGraduationCap className="text-white/90" size={12} />
                    <span className="text-xs text-white font-medium">
                      {user?.educationLevel || "Student"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              {/* <div className="p-4">
                {sidebarItems.map((item, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all mb-1 ${
                      item.active
                        ? "bg-gradient-to-r from-blue-50 to-amber-50 text-gray-900 border-l-4 border-amber-500 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          item.active ? "text-amber-500" : "text-gray-400"
                        }
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`font-medium text-sm ${item.active ? "text-gray-900" : "text-gray-600"}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.active ? (
                      <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <ChevronRight size={12} className="text-white" />
                      </div>
                    ) : (
                      <ChevronRight size={16} className="text-gray-300" />
                    )}
                  </motion.button>
                ))}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-rose-500 font-medium text-sm hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div> */}

              <div className="p-4">
                {sidebarItems.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveTab(item.key)}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl mb-1 transition-all
        ${
          activeTab === item.key
            ? "bg-gradient-to-r from-blue-50 to-amber-50 border-l-4 border-amber-500 shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          activeTab === item.key
                            ? "text-amber-500"
                            : "text-gray-400"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>

                    {activeTab === item.key ? (
                      <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <ChevronRight size={12} className="text-white" />
                      </div>
                    ) : (
                      <ChevronRight size={16} className="text-gray-300" />
                    )}
                  </motion.button>
                ))}

                {/* LOGOUT */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-rose-500 font-medium text-sm hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-5">
              {statsData.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-md`}
                      >
                        {stat.icon}
                      </div>
                      <span
                        className={`text-xs font-medium ${stat.bgLight} px-2 py-1 rounded-full text-gray-600`}
                      >
                        This month
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                    {/* <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full w-3/4 bg-gradient-to-r ${stat.gradient} rounded-full`}
                      />
                    </div> */}
                    {/* <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(stat.percent)}%</span>
                      </div>

                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.percent}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                        />
                      </div>
                    </div> */}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                    <Clock size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {displayData.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock size={24} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">No activity yet</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Start exploring scholarships to see activity here
                      </p>
                    </div>
                  ) : (
                    displayData.slice(0, visibleCount).map((sch, i) => {
                      const app = getApplicationStatus(sch?.scholarship?._id);

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group bg-gray-50 rounded-xl p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 transition-all border border-gray-200 hover:border-amber-200"
                        >
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                              <FaUniversity className="text-white text-lg" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-gray-900 mb-1">
                                    {sch.scholarship?.name || sch.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FaRegClock
                                      className="text-amber-500"
                                      size={10}
                                    />
                                    <span>{formatDate(sch.selectedAt)}</span>
                                  </div>
                                </div>

                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium
                      ${
                        !app
                          ? "bg-gray-100 text-gray-600"
                          : app.status === "submitted"
                            ? "bg-blue-100 text-blue-700"
                            : app.status === "under_review"
                              ? "bg-yellow-100 text-yellow-700"
                              : app.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                      }
                    `}
                                >
                                  {!app
                                    ? "Saved"
                                    : app.status === "submitted"
                                      ? "Submitted"
                                      : app.status === "under_review"
                                        ? "Under Review"
                                        : app.status === "approved"
                                          ? "Approved"
                                          : "Rejected"}
                                </span>
                              </div>

                              {/* Eligibility Preview */}
                              {sch.scholarship?.eligibilityCriteria && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {sch.scholarship.eligibilityCriteria
                                    .slice(0, 2)
                                    .map((item, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border border-gray-200"
                                      >
                                        {item.substring(0, 30)}...
                                      </span>
                                    ))}

                                  {sch.scholarship.eligibilityCriteria.length >
                                    2 && (
                                    <span className="text-xs text-gray-400">
                                      +
                                      {sch.scholarship.eligibilityCriteria
                                        .length - 2}{" "}
                                      more
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* <button
                                onClick={() => {
                                  setSelectedScholarship(sch.scholarship);
                                  setIsDrawerOpen(true);
                                }}
                                className="mt-3 text-xs font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                              >
                                View Details
                              </button>
                              {app &&
                                (app.status === "submitted" ||
                                  app.status === "under_review") && (
                                  <p className="mt-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                                    📄 Document verification is under process.
                                    Admin will get back to you.
                                  </p>
                                )}

                              {app && app.status === "approved" && (
                                <p className="mt-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                                  🎉 Congratulations! Your scholarship has been
                                  approved.
                                </p>
                              )} */}
                              <div className="mt-3 flex items-center justify-between gap-3">
                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedScholarship(sch.scholarship);
                                      setIsDrawerOpen(true);
                                    }}
                                    className="text-xs font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                                  >
                                    View Details
                                  </button>

                                  {/* APPLY BUTTON (optional show only if not applied) */}
                                  {!app && (
                                    <button
                                      onClick={() => {
                                        setSelectedScholarship(sch.scholarship);
                                        setIsDrawerOpen(true);
                                      }}
                                      className="text-xs font-medium bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                                    >
                                      Apply Now
                                    </button>
                                  )}
                                </div>

                                {/* RIGHT SIDE STATUS */}
                                <div className="text-right max-w-[55%]">
                                  {app &&
                                    (app.status === "submitted" ||
                                      app.status === "under_review") && (
                                      <p className="text-[11px] text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                                        📄 Verification in progress
                                      </p>
                                    )}

                                  {app && app.status === "approved" && (
                                    <p className="text-[11px] text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                      🎉 Approved
                                    </p>
                                  )}

                                  {app && app.status === "rejected" && (
                                    <p className="text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                                      ❌ Rejected
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* {activities.length > 5 && ( */}
        {displayData.length > 5 && (
          <div className="flex justify-end mt-6">
            {/* {visibleCount < activities.length ? ( */}
            {visibleCount < displayData.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition"
              >
                View More
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(5)}
                className="text-sm font-medium text-gray-600 hover:text-gray-700 bg-gray-100 px-4 py-2 rounded-lg transition"
              >
                View Less
              </button>
            )}
          </div>
        )}
      </div>
      <ScholarshipDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        scholarship={selectedScholarship}
        onOpenUploadModal={() => setShowUploadModal(true)}
        onApplicationSuccess={fetchApplications}
      />
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={membershipPlans}
      />
      <UploadDocumentsModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        documents={requiredDocuments}
      />
    </div>
  );
};
