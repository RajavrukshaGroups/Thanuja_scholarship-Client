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
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  console.log("user", user);

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

        setUser(res.data?.user);
        setActivities(res.data?.selectedScholarships || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  /* ===============================
     LOGOUT
  =============================== */

  const handleLogout = () => {
    localStorage.removeItem("scholarToken");
    localStorage.removeItem("scholarUser");

    navigate("/");
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-edufin-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl premium-shadow border border-slate-100 overflow-hidden">
              <div className="p-8 text-center border-b border-slate-100">
                <div className="w-24 h-24 bg-edufin-bg rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-sm">
                  <User size={40} className="text-slate-300" />
                </div>

                {/* USER DATA */}
                <h3 className="font-display font-bold text-edufin-deep">
                  {user?.fullName || "Student Name"}
                </h3>

                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">
                  User ID: {user?.userId || "Student"}
                </p>

                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">
                  {user?.educationLevel || "Student"}
                </p>
              </div>

              <div className="p-4">
                {sidebarItems.map((item, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      item.active
                        ? "bg-edufin-royal text-white shadow-lg shadow-edufin-royal/20"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={item.active ? "opacity-100" : "opacity-0"}
                    />
                  </button>
                ))}

                {/* LOGOUT */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-4 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Saved", value: "12", color: "bg-blue-500" },
                { label: "Applied", value: "04", color: "bg-emerald-500" },
                { label: "Matches", value: "28", color: "bg-amber-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">
                      {stat.label}
                    </div>
                    <div className="text-3xl font-display font-bold text-edufin-deep">
                      {stat.value}
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-2xl opacity-10`}
                  ></div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-edufin-deep">
                  Recent Activity
                </h3>
                <button className="text-sm text-edufin-royal font-bold">
                  View All
                </button>
              </div>
              <div className="p-8">
                <div className="space-y-8">
                  {activities.length === 0 ? (
                    <p className="text-slate-400">No activity yet</p>
                  ) : (
                    activities.map((sch, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                          <Clock size={20} className="text-slate-400" />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm text-slate-500">{sch.name}</p>

                          <p className="text-xs text-slate-400">
                            {new Date(sch.selectedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100">
                <h3 className="font-display font-bold text-xl text-edufin-deep">
                  Recommended for You
                </h3>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 animate-pulse"
                    >
                      <div className="h-5 bg-slate-100 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-slate-100 rounded w-full mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
