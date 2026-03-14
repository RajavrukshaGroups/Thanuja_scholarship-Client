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
  const navigate = useNavigate();

  console.log("user", user);
  console.log("membership plans", membershipPlans);
  console.log("upgraded plans", hasUpgradePlans);

  const sidebarItems = [
    { icon: <User size={20} />, label: "Profile Overview", active: true },
    {
      icon: <Bookmark size={20} />,
      label: "Saved Scholarships",
      active: false,
    },
    { icon: <FileText size={20} />, label: "My Applications", active: false },
    { icon: <Award size={20} />, label: "Eligibility Matches", active: false },
    { icon: <Bell size={20} />, label: "Notifications", active: false },
    { icon: <Settings size={20} />, label: "Settings", active: false },
  ];

  /* ===============================
     FETCH USER PROFILE
  =============================== */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/scholar/user/profile");
        console.log("response obj", res);

        setUser(res.data?.user);
        setActivities(res.data?.selectedScholarships || []);
        setMembershipPlan(res.data?.membershipPlan || []);

        const upgradeRes = await api.get(
          "/scholar/user/scholar/membership/upgrade-options",
        );
        console.log("upgraded plans response", upgradeRes);
        if (!!upgradeRes.data.upgradePlans.length > 0) {
          setHasUpgradePlans(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

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
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <FaGraduationCap className="text-blue-500" size={16} />
              <span className="text-sm text-gray-600">
                {user?.educationLevel || "Student"}
              </span>
            </div>
            {/* <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <FiMapPin className="text-amber-500" size={16} />
              <span className="text-sm text-gray-600">India</span>
            </div> */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-amber-50 px-4 py-2 rounded-xl border border-blue-100">
              <FiMapPin className="text-amber-500" size={16} />

              <span className="text-sm font-medium text-gray-700">
                {membershipPlans?.planTitle}
              </span>

              {hasUpgradePlans ? (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
                >
                  Upgrade Plan
                </button>
              ) : (
                <span className="text-xs text-green-600 font-semibold">
                  Highest Plan
                </span>
              )}
            </div>
          </div>
        </div>

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
              <div className="p-4">
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
              {[
                {
                  label: "Saved Scholarships",
                  value: "12",
                  icon: <Bookmark className="text-white" size={20} />,
                  gradient: "from-blue-500 to-blue-600",
                  bgLight: "bg-blue-50",
                },
                {
                  label: "Applications",
                  value: "04",
                  icon: <FileText className="text-white" size={20} />,
                  gradient: "from-emerald-500 to-teal-500",
                  bgLight: "bg-emerald-50",
                },
                {
                  label: "Eligibility Matches",
                  value: "28",
                  icon: <Award className="text-white" size={20} />,
                  gradient: "from-amber-500 to-orange-500",
                  bgLight: "bg-amber-50",
                },
              ].map((stat, i) => (
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
                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full w-3/4 bg-gradient-to-r ${stat.gradient} rounded-full`}
                      />
                    </div>
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
                  {activities.length === 0 ? (
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
                    activities.slice(0, visibleCount).map((sch, i) => (
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
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                                Saved
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

                            <button
                              onClick={() => {
                                setSelectedScholarship(sch.scholarship);
                                setIsDrawerOpen(true);
                              }}
                              className="mt-3 text-xs font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {activities.length > 5 && (
          <div className="flex justify-end mt-6">
            {visibleCount < activities.length ? (
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
      />
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={membershipPlans}
      />
    </div>
  );
};
