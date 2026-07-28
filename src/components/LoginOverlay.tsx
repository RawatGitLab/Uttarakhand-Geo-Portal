import React, { useState } from "react";
import { Lock, User, KeyRound, AlertCircle, ShieldCheck, Eye, EyeOff, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ucostLogo from "../assets/logos/UCOST-Logo.jpg";
import ssjLogo from "../assets/logos/SSJ-Logo.jpg";
import uttarakhandLogo from "../assets/logos/Uttarakhand-Logo.jpg";
import govIndiaLogo from "../assets/logos/Government of India-Logo.jpg";

interface LoginOverlayProps {
  onLoginSuccess: () => void;
}

export function LoginOverlay({ onLoginSuccess }: LoginOverlayProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all authorization fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.authenticated) {
        onLoginSuccess();
      } else {
        setError(data.error || "Invalid secure credentials. Access denied.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Authentication request failed:", err);
      setError("Connection to authorization gateway failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/20 dark:bg-slate-950/40 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-3 shadow-inner">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 p-6 bg-white/95 dark:bg-slate-800/95 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <img
                src={ucostLogo}
                alt="UCOST"
                title="UCOST"
                className="h-14 sm:h-16 w-auto max-w-[70px] sm:max-w-[85px] object-contain rounded transition-transform hover:scale-105"
              />
              <img
                src={ssjLogo}
                alt="SSJ-University-Almora"
                title="SSJ-University-Almora"
                className="h-14 sm:h-16 w-auto max-w-[70px] sm:max-w-[85px] object-contain rounded transition-transform hover:scale-105"
              />
              <img
                src={uttarakhandLogo}
                alt="Government of Uttarakhand"
                title="Government of Uttarakhand"
                className="h-14 sm:h-16 w-auto max-w-[70px] sm:max-w-[85px] object-contain rounded transition-transform hover:scale-105"
              />
              <img
                src={govIndiaLogo}
                alt="Government of India"
                title="Government of India"
                className="h-14 sm:h-16 w-auto max-w-[70px] sm:max-w-[85px] object-contain rounded transition-transform hover:scale-105"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-1.5 uppercase font-sans">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            UK Geoportal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Administrative GIS Authentication Gateway
          </p>
        </div>

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-2.5 text-rose-600 dark:text-rose-400 text-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Secure Username
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Security Key
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secret key"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Verify & Grant Access</span>
              </>
            )}
          </button>
        </form>

        {/* Academic/Official Footer Badge */}
        <div className="mt-6 pt-5 border-t border-slate-200/50 dark:border-white/5 text-[9px] text-center font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
          <span>UTTARAKHAND</span>
          <span className="text-slate-300 dark:text-white/10">•</span>
          <span>GEOPORTAL</span>
        </div>
      </motion.div>
    </div>
  );
}
