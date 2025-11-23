import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../assets/images/logo_wisata_desa_bentek.png"; // pastikan path benar
import Api from "../utils/Api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // state untuk spinner
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await Api.post("/auth/login", {
        email,
        password,
      });

      const { token } = res.data;

      // Simpan token ke localStorage
      localStorage.setItem("token", token);

      navigate("/admin");
    } catch (err) {
      console.log(err);

      // Jika backend mengirim pesan error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf2e8] px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden md:max-w-lg p-8 sm:p-10 border-t-8 border-t-[#c97b2f]"
      >
        {/* Logo & Judul */}
        <div className="text-center mb-10">
          <img
            src={logo}
            alt="Logo Desa Bentek"
            className="w-24 h-auto mx-auto mb-4"
          />
          <h2 className="text-3xl font-extrabold text-[#1c4444]">
            Login Admin Desa
          </h2>
          <p className="text-gray-500 mt-2">
            Akses hanya untuk pengelola website
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left mb-1"
            >
              Email Admin
            </label>
            <div className="relative">
              <input
                // type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition"
                placeholder="Masukkan email"
              />
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left mb-1"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition"
                placeholder="Masukkan password"
              />

              {/* Icon Lock */}
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              {/* Toggle Lihat Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center mb-4"
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold shadow-md text-white transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#1c4444] hover:bg-[#255b5b]"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              <>
                <FiLock className="text-lg" />
                Login
              </>
            )}
          </motion.button>
        </form>

        {/* Link kembali */}
        <p className="mt-8 text-center text-sm text-gray-500">
          <a
            href="/"
            className="text-gray-600 hover:text-[#c97b2f] transition-colors"
          >
            ← Kembali ke Halaman Utama
          </a>
        </p>
      </motion.div>
    </div>
  );
}
