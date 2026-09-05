import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsRobot, BsEye, BsEyeSlash } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { auth, provider } from "../utils/firebase";
import { ServerUrl } from "../config/api.js";
import { setUserData } from "../redux/userSlice.js";

const defaultLoginForm = { email: "", password: "" };
const defaultRegisterForm = { name: "", email: "", password: "", confirmPassword: "" };
const defaultResetForm = { otp: "", password: "", confirmPassword: "" };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Enter a valid email address";
  return null;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30";

const primaryBtnClass =
  "w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 cursor-pointer";

const Auth = ({ isModel = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userData } = useSelector((state) => state.user);

  const queryMode = searchParams.get("mode");
  const queryEmail = searchParams.get("email") || "";
  const initialMode = isModel ? "login" : queryMode || "login";

  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState(defaultLoginForm);
  const [registerForm, setRegisterForm] = useState(defaultRegisterForm);
  const [forgotEmail, setForgotEmail] = useState(queryEmail);
  const [resetEmail, setResetEmail] = useState(queryEmail);
  const [resetForm, setResetForm] = useState(defaultResetForm);

  useEffect(() => {
    if (userData && !isModel) {
      navigate("/", { replace: true });
    }
  }, [isModel, navigate, userData]);

  const switchMode = (nextMode) => {
    setError("");
    setMessage("");
    setMode(nextMode);
    if (!isModel) {
      navigate(nextMode === "login" ? "/auth" : `/auth?mode=${nextMode}`, { replace: true });
    }
  };

  const handleAuthSuccess = (data) => {
    dispatch(setUserData(data));
    if (!isModel) navigate("/", { replace: true });
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      if (!auth || !provider) {
        throw new Error("Google sign-in is not ready. Please use email and password.");
      }
      const response = await signInWithPopup(auth, provider);
      const idToken = await response.user.getIdToken();
      const result = await axios.post(`${ServerUrl}/api/auth/google`, { idToken }, { withCredentials: true });
      handleAuthSuccess(result.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const emailErr = validateEmail(loginForm.email.trim());
    if (emailErr) return setError(emailErr);
    if (!loginForm.password) return setError("Password is required");

    setLoading(true);
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/login`,
        { email: loginForm.email.trim().toLowerCase(), password: loginForm.password },
        { withCredentials: true }
      );
      handleAuthSuccess(result.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const name = registerForm.name.trim();
    if (!name || name.length < 2) return setError("Name must be at least 2 characters");
    const emailErr = validateEmail(registerForm.email.trim());
    if (emailErr) return setError(emailErr);
    if (registerForm.password.length < 6) return setError("Password must be at least 6 characters");
    if (registerForm.password !== registerForm.confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/register`,
        { name, email: registerForm.email.trim().toLowerCase(), password: registerForm.password },
        { withCredentials: true }
      );
      handleAuthSuccess(result.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const emailErr = validateEmail(forgotEmail.trim());
    if (emailErr) return setError(emailErr);

    setLoading(true);
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/forgot-password`,
        { email: forgotEmail.trim().toLowerCase() },
        { withCredentials: true }
      );
      setMessage(result.data.message || "OTP sent to your email.");
      setResetEmail(forgotEmail.trim().toLowerCase());
      setMode("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(resetForm.otp.trim())) return setError("Enter 6-digit OTP code");
    if (resetForm.password.length < 6) return setError("Password must be at least 6 characters");
    if (resetForm.password !== resetForm.confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/reset-password`,
        { email: resetEmail.trim().toLowerCase(), otp: resetForm.otp.trim(), password: resetForm.password },
        { withCredentials: true }
      );
      setMessage(result.data.message || "Password updated! Please login.");
      setLoginForm(defaultLoginForm);
      setMode("login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="w-full">
      {/* TABS FOR LOGIN / REGISTER */}
      {(mode === "login" || mode === "register") && (
        <>
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 mb-5">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition cursor-pointer ${
                mode === "login" ? "bg-amber-500 text-black shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition cursor-pointer ${
                mode === "register" ? "bg-amber-500 text-black shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-3 text-xs font-semibold text-white transition shadow-sm"
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-gray-500">
            <div className="h-px flex-1 bg-white/10" />
            <span>or with email</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </>
      )}

      {/* ERROR / MESSAGE NOTICES */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300 flex items-center gap-2">
          <BsCheckCircleFill className="text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* LOGIN FORM */}
      {mode === "login" && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-gray-300">Password</label>
              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                required
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <BsEyeSlash size={14} /> : <BsEye size={14} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={primaryBtnClass}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      )}

      {/* REGISTER FORM */}
      {mode === "register" && (
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              placeholder="Alex Johnson"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              placeholder="Min 6 characters"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
              placeholder="Repeat password"
              required
              className={inputClass}
            />
          </div>

          <button type="submit" disabled={loading} className={primaryBtnClass}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      )}

      {/* FORGOT PASSWORD FORM */}
      {mode === "forgot" && (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-white">Reset Your Password</h3>
            <p className="text-xs text-gray-400 mt-1">Enter your email to receive a 6-digit verification code.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <button type="submit" disabled={loading} className={primaryBtnClass}>
            {loading ? "Sending OTP..." : "Send Verification Code"}
          </button>

          <button
            type="button"
            onClick={() => switchMode("login")}
            className="w-full text-center text-xs text-gray-400 hover:text-white py-1 cursor-pointer"
          >
            ← Back to Sign In
          </button>
        </form>
      )}

      {/* RESET PASSWORD FORM */}
      {mode === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-3.5">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-white">Enter New Password</h3>
            <p className="text-xs text-gray-400 mt-1">Check your email for the 6-digit OTP code.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">6-Digit OTP</label>
            <input
              type="text"
              maxLength={6}
              value={resetForm.otp}
              onChange={(e) => setResetForm({ ...resetForm, otp: e.target.value })}
              placeholder="123456"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              value={resetForm.password}
              onChange={(e) => setResetForm({ ...resetForm, password: e.target.value })}
              placeholder="Min 6 characters"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={resetForm.confirmPassword}
              onChange={(e) => setResetForm({ ...resetForm, confirmPassword: e.target.value })}
              placeholder="Repeat new password"
              required
              className={inputClass}
            />
          </div>

          <button type="submit" disabled={loading} className={primaryBtnClass}>
            {loading ? "Updating..." : "Update Password"}
          </button>

          <button
            type="button"
            onClick={() => switchMode("login")}
            className="w-full text-center text-xs text-gray-400 hover:text-white py-1 cursor-pointer"
          >
            ← Back to Sign In
          </button>
        </form>
      )}
    </div>
  );

  if (isModel) {
    return content;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* AMBIENT GLOWS */}
      <div className="absolute w-120 h-120 bg-amber-500/10 blur-[140px] rounded-full -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-100 h-100 bg-emerald-500/10 blur-[130px] rounded-full -bottom-20 -right-20 pointer-events-none" />

      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 mb-8 cursor-pointer group"
      >
        <div className="p-2 rounded-xl bg-amber-500 text-black shadow-lg group-hover:scale-105 transition">
          <BsRobot size={22} />
        </div>
        <span className="font-bold text-2xl tracking-tight text-white">
          Interv<span className="text-amber-400 font-black">AI</span>
        </span>
      </div>

      {/* AUTH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-[#0f141c]/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === "login"
              ? "Welcome Back"
              : mode === "register"
              ? "Create Your Account"
              : mode === "forgot"
              ? "Reset Password"
              : "Set New Password"}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {mode === "login"
              ? "Sign in to access your interview simulator & history"
              : mode === "register"
              ? "Get free mock interview credits and AI evaluations"
              : "Follow the steps to recover access to your account"}
          </p>
        </div>

        {content}
      </motion.div>

      <p className="text-xs text-gray-500 mt-8 text-center">
        By continuing, you agree to our Terms of Service & Privacy Policy.
      </p>
    </div>
  );
};

export default Auth;
