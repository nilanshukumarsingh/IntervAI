/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* SOFT AMBIENT GLOW */}
      <div className="absolute w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative rounded-3xl p-px bg-gradient-to-b from-amber-400/30 via-white/10 to-white/5 shadow-2xl">
          <div className="relative rounded-3xl bg-[#0e131d]/90 backdrop-blur-2xl px-6 py-14 sm:px-12 sm:py-16 text-center overflow-hidden">
            {/* AMBIENT RADIAL LIGHT */}
            <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

            {/* EYEBROW BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={13} className="text-amber-400" />
              <span>Accelerate Your Career</span>
            </div>

            {/* HEADLINE */}
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Get Interview Ready with{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                IntervAI
              </span>
            </h2>

            {/* SUBTITLE */}
            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Practice real-time voice interviews, get adaptive follow-up challenges, and boost your offer rate with actionable AI rubrics.
            </p>

            {/* INTERACTIVE FORM / SUCCESS */}
            <div className="mt-8 max-w-lg mx-auto">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-4 flex items-center justify-center gap-2.5 text-emerald-300 text-xs font-semibold shadow-inner"
                >
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>You're in! Check your inbox for your early access pass.</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 focus-within:border-amber-400/50 transition duration-200"
                >
                  <div className="flex items-center gap-2.5 flex-1 px-3 py-2 w-full">
                    <Mail size={16} className="text-gray-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold px-6 py-3 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* HIGHLIGHT PERKS */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-5 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Zap size={13} className="text-amber-400" />
                Instant Setup
              </span>
              <span className="text-white/10">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
                No Credit Card Required
              </span>
              <span className="text-white/10">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-cyan-400" />
                Full Scoring Report Included
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
