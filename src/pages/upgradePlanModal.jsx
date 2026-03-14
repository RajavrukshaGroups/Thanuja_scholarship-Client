import { useEffect, useState } from "react";
import api from "../utils/api";
import { CheckCircle } from "lucide-react";

const UpgradePlanModal = ({ isOpen, onClose }) => {
  const [upgradePlans, setUpgradePlans] = useState([]);
  const [currentPlanData, setCurrentPlanData] = useState(null);
  const [remainingDays, setRemainingDays] = useState(0);
  const [remainingValue, setRemainingValue] = useState(0);

  useEffect(() => {
    if (isOpen) fetchPlans();
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      const res = await api.get(
        "/scholar/user/scholar/membership/upgrade-options",
      );

      setCurrentPlanData(res.data.currentPlan);
      setUpgradePlans(res.data.upgradePlans);
      setRemainingDays(res.data.remainingDays);
      setRemainingValue(res.data.remainingValue);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  const handleUpgrade = async (plan) => {
    try {
      const res = await api.post(
        "/scholar/user/scholar/membership/create-upgrade-order",
        {
          planId: plan._id,
        },
      );

      const { order, key } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Scholarship Portal",
        description: "Membership Upgrade",
        order_id: order.id,

        handler: async function (response) {
          await api.post(
            "/scholar/user/scholar/membership/verify-upgrade-payement",
            {
              ...response,
              planId: plan._id,
            },
          );

          alert("Membership upgraded successfully");

          window.location.reload();
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[1000px] max-h-[90vh] overflow-y-auto p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Upgrade Membership</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* PLANS GRID */}
        <div className="grid grid-cols-3 gap-6">
          {/* CURRENT PLAN */}

          <div className="border-2 border-blue-500 rounded-2xl p-6 bg-blue-50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-600">
                CURRENT PLAN
              </span>

              <h3 className="text-xl font-semibold mt-2">
                {currentPlanData?.planTitle}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Duration: {currentPlanData?.planDuration} days
              </p>

              <p className="text-sm">
                Max Scholarships: {currentPlanData?.maxScholarships}
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-4">
                ₹{currentPlanData?.amount}
              </p>

              {/* Remaining Info */}

              <div className="mt-4 text-sm bg-white p-3 rounded-lg border">
                <p>
                  Remaining Days :
                  <span className="font-semibold ml-2">{remainingDays}</span>
                </p>

                <p>
                  Credit Value :
                  <span className="font-semibold ml-2 text-green-600">
                    ₹{remainingValue}
                  </span>
                </p>
              </div>

              {/* BENEFITS */}

              {currentPlanData?.benefits && (
                <ul className="mt-4 space-y-2">
                  {currentPlanData.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              disabled
              className="mt-6 bg-gray-200 text-gray-500 py-2 rounded-lg text-sm cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* UPGRADE PLANS */}

          {upgradePlans.map((plan) => (
            <div
              key={plan._id}
              className="border rounded-2xl p-6 hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold mb-2">{plan.planTitle}</h4>

                <p className="text-sm text-gray-500 mb-4">
                  Upgrade your scholarship access
                </p>

                {/* ORIGINAL PRICE */}

                <p className="text-gray-400 line-through text-sm">
                  Original price ₹{plan.amount}
                </p>
                {remainingValue > 0 && (
                  <p className="text-sm text-gray-500 mb-4">
                    Credit applied ₹{remainingValue}
                  </p>
                )}
                {/* FINAL UPGRADE PRICE */}

                <p className="text-3xl font-bold mt-1 text-blue-600">
                  Upgrade Price ₹{plan.upgradePrice}
                </p>

                <p className="text-sm mb-3">
                  Max Scholarships : {plan.maxScholarships}
                </p>

                {/* BENEFITS */}

                {plan.benefits && (
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle size={16} className="text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => handleUpgrade(plan)}
                className="mt-6 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Upgrade for ₹{plan.upgradePrice}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanModal;
