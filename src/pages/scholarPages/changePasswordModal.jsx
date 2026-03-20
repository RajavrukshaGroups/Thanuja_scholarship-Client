import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import api from "../../utils/api";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* RESET MODAL */
  const handleClose = () => {
    if (loading) return; // prevent close during API call

    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setLoading(false);
    onClose();
  };

  /* =========================
     SEND OTP
  ========================= */
  const handleSendOtp = async () => {
    if (!email) {
      return toast.error("Please enter email");
    }

    try {
      setLoading(true);

      await api.post("/scholar/user/send-otp", { email });

      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     VERIFY OTP
  ========================= */
  const handleVerifyOtp = async () => {
    if (!otp) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      await api.post("/scholar/user/verify-otp", { email, otp });

      toast.success("OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CHANGE PASSWORD
  ========================= */
  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await api.post("/scholar/user/change-password", {
        email,
        newPassword,
      });

      toast.success("Password changed successfully");
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* OVERLAY (separate) */}
          <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white p-6 rounded-xl w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Change Password
            </h2>

            {/* STEP 1 - EMAIL */}
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-black outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}

            {/* STEP 2 - OTP */}
            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-black outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <p
                  onClick={!loading ? handleSendOtp : undefined}
                  className="text-sm text-blue-600 cursor-pointer mt-3 text-center"
                >
                  Resend OTP
                </p>
              </>
            )}

            {/* STEP 3 - NEW PASSWORD */}
            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-black outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-black outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </>
            )}

            <button
              onClick={handleClose}
              className="mt-4 text-sm text-gray-500 w-full hover:text-black"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
