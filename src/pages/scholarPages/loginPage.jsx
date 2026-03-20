import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../utils/api";
import { Eye, EyeOff } from "lucide-react";
import ChangePasswordModal from "./changePasswordModal";

const LoginPage = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/scholar/user/login", {
        identifier,
        password,
      });

      localStorage.setItem("scholarToken", res.data.token);
      localStorage.setItem("scholarUser", JSON.stringify(res.data.user));

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex bg-gray-100 py-8 px-4"
      style={{ marginTop: "10rem" }}
    >
      <div className="max-w-7xl mx-auto flex rounded-2xl overflow-hidden shadow-xl bg-white">
        {" "}
        {/* LEFT SIDE - LOGIN FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-2 text-center">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 text-center mb-6 text-sm">
              Login to access your scholarship dashboard
            </p>

            <input
              type="text"
              placeholder="User ID / Email / Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Password Field */}
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                className="w-full border p-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p
              onClick={() => setOpenModal(true)}
              className="text-sm text-right text-blue-600 cursor-pointer mt-2"
            >
              Forgot Password?
            </p>
          </form>
        </div>
        {/* RIGHT SIDE - CONTENT */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black to-gray-800 text-white p-10 flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Unlock Your Future with Scholarships 🎓
          </h1>

          <p className="text-gray-300 mb-8 max-w-md">
            Access a wide range of scholarships, track your applications, and
            secure your academic journey — all in one place.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">📄</div>
              <div>
                <h3 className="font-semibold">Easy Applications</h3>
                <p className="text-sm text-gray-300">
                  Apply for multiple scholarships with a simple process.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">📊</div>
              <div>
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-gray-300">
                  Monitor your application status in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">🔒</div>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-sm text-gray-300">
                  Your data is safe with our secure platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default LoginPage;
