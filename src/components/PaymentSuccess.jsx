import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your login credentials have been sent to your registered email.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
