import { useEffect, useState } from "react";
import api from "../utils/api";
import { FiClock, FiCheckCircle } from "react-icons/fi";
import { MdWorkspacePremium } from "react-icons/md";

const MemberPlans = ({ selectedPlan, setSelectedPlan }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/scholar/membership-plans");

      // Sort plans by highest amount first
      const sortedPlans = res.data.data.sort((a, b) => b.amount - a.amount);

      setPlans(sortedPlans);
    } catch (err) {
      console.error(err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-24">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-amber-500 px-6 py-5">
        <div className="flex items-center gap-2">
          <MdWorkspacePremium className="text-white text-xl" />
          <h2 className="text-white font-semibold text-lg">Membership Plans</h2>
        </div>
        <p className="text-white/80 text-xs mt-1">
          Unlock premium scholarship access
        </p>
      </div>

      {/* PLANS */}
      <div className="p-5 space-y-5">
        {plans.map((plan, index) => (
          <div
            key={plan._id}
            onClick={() => setSelectedPlan(plan)}
            className={`relative rounded-xl border p-5 cursor-pointer transition-all duration-300
            ${
              selectedPlan?._id === plan._id
                ? "border-amber-500 ring-2 ring-amber-200 bg-amber-50/40 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
            }`}
          >
            {/* MOST POPULAR BADGE */}
            {index === 0 && (
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white text-[10px] px-3 py-1 rounded-full shadow-md">
                ⭐ Most Popular
              </span>
            )}

            {/* PLAN HEADER */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {plan.planTitle}
                </h3>

                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <FiClock size={12} />
                  {plan.planDuration} days validity
                </div>
              </div>

              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(plan.amount)}
              </span>
            </div>

            {/* SCHOLARSHIP LIMIT */}
            <div className="text-xs text-gray-500 mb-3">
              Maximum{" "}
              <span className="font-semibold text-gray-700">
                {plan.maxScholarships}
              </span>{" "}
              scholarships
            </div>

            {/* BENEFITS */}
            {plan.benefits?.length > 0 && (
              <ul className="space-y-1.5 text-xs text-gray-600 mb-4">
                {plan.benefits.slice(0, 4).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle
                      className="text-green-500 mt-[2px]"
                      size={12}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <button
              className={`w-full text-xs font-medium py-2 rounded-lg transition-all
              ${
                selectedPlan?._id === plan._id
                  ? "bg-gradient-to-r from-blue-600 to-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {selectedPlan?._id === plan._id ? "Selected Plan" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      {/* <div className="px-5 py-3 bg-gray-50 border-t text-xs text-gray-500 text-center">
        Choose a plan to unlock premium scholarships
      </div> */}
    </div>
  );
};

export default MemberPlans;
