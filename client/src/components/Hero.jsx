/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const slidesData = [
  {
    mode: "HR MODE",
    question: "Tell me about yourself.",
    answer: "I am a full-stack developer with strong problem-solving skills...",
    confidence: "84%",
    clarity: "92%",
    tech: "88%",
    score: "8.6",
  },
  {
    mode: "TECHNICAL",
    question: "Explain useEffect in React.",
    answer: "useEffect is used to handle side effects in functional components...",
    confidence: "88%",
    clarity: "94%",
    tech: "96%",
    score: "9.2",
  },
  {
    mode: "RESUME AI",
    question: "Explain your AI project.",
    answer: "I built an AI interview platform with voice and evaluation...",
    confidence: "82%",
    clarity: "90%",
    tech: "85%",
    score: "8.5",
  },
];

const Hero = ({ handleStart }) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Active running simulation state
  const [activeSlide, setActiveSlide] = useState(0);
  const [seconds, setSeconds] = useState(32);

  // Real-time ticking elapsed timer to show interview actively running
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Automatic question cycle in-place (no horizontal sliding)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slidesData.length);
    }, 6500);
    return () => clearInterval(slideInterval);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const currentSlide = slidesData[activeSlide];

  return (
    <section className="relative text-white overflow-hidden pt-12 pb-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6 pb-6 flex flex-col items-center text-center">
        {/* NEW FRESH EYEBROW BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 backdrop-blur-md shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 font-semibold">AI Interview Platform</span>
          <span className="text-gray-500">•</span>
          <span>Voice & Rubric Feedback</span>
        </motion.div>

        {/* BOLD, MODERN, UNIQUE HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1] max-w-4xl mx-auto tracking-tight"
        >
          <span className="text-white">
            Crack Interviews with
          </span>
          <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]">
            AI Precision.
          </span>
        </motion.h1>

        {/* REFINED CRISP SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-gray-300 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal"
        >
          Practice realistic HR, Technical, and Resume-based mock interviews with real-time
          voice feedback and adaptive AI scoring.
        </motion.p>

        {/* MODERN ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer flex gap-2.5 items-center justify-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition text-sm"
          >
            <span>Start Interview</span>
            <ArrowRight size={17} />
          </motion.button>

          <motion.button
            onClick={() => {
              if (!userData) {
                handleStart();
              } else {
                navigate("/history");
              }
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition backdrop-blur-md"
          >
            View History
          </motion.button>
        </motion.div>

        {/* UNIQUE LIVE RUNNING INTERVIEW SIMULATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-16 w-full max-w-4xl relative text-left"
        >
          {/* TOP STATUS BAR WITH ACTIVE PULSING BADGE */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span>LIVE INTERVIEW</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-normal">
                Running Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Evaluation Active</span>
            </div>
          </div>

          {/* MAIN SIMULATOR CARD */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-[#0b0f16]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(251,191,36,0.08)]">
            <div className="absolute inset-0 bg-amber-400/5 blur-2xl opacity-30 pointer-events-none" />

            <div className="p-8 sm:p-10 min-h-[380px] flex flex-col justify-between relative z-10">
              {/* CARD HEADER: MODE SELECTOR & LIVE TICKING TIMER */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  {slidesData.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`cursor-pointer text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                        activeSlide === idx
                          ? "border border-amber-400/50 bg-amber-400/15 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.25)]"
                          : "border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {slide.mode}
                    </button>
                  ))}
                </div>

                {/* TICKING SESSION TIMER */}
                <div className="flex items-center gap-2 text-xs text-gray-300 font-mono bg-black/40 border border-white/10 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-bold">REC</span>
                  <span className="text-amber-300 font-semibold">{formatTimer(seconds)}</span>
                </div>
              </div>

              {/* DYNAMIC RUNNING CONVERSATION (SMOOTH IN-PLACE UPDATE) */}
              <div className="my-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    {/* AI QUESTION */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                        🤖
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 max-w-lg text-sm text-white font-medium">
                        <TypeAnimation
                          key={currentSlide.question}
                          sequence={[currentSlide.question, 1000]}
                          speed={65}
                          cursor={true}
                        />
                      </div>
                    </div>

                    {/* LIVE AUDIO WAVEFORM & STATUS */}
                    <div className="ml-12 flex items-center gap-2.5 text-xs text-gray-400">
                      <span className="text-amber-400/90 font-medium">Listening to candidate response...</span>
                      <Waveform />
                    </div>

                    {/* CANDIDATE ANSWER */}
                    <div className="flex items-start justify-end gap-3">
                      <div className="bg-amber-500/10 border border-amber-400/20 text-amber-300 rounded-2xl px-4 py-3 max-w-lg text-sm">
                        <TypeAnimation
                          key={currentSlide.answer}
                          sequence={[currentSlide.answer, 1500]}
                          speed={75}
                          cursor={false}
                        />
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        You
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* LIVE TELEMETRY STATS FOOTER */}
              <div className="flex flex-wrap justify-between items-center pt-4 border-t border-white/5 gap-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Confidence {currentSlide.confidence}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Clarity {currentSlide.clarity}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Tech {currentSlide.tech}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Live AI Score:</span>
                  <span className="text-amber-400 text-sm font-bold bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-lg">
                    {currentSlide.score} / 10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING CORNER BADGES */}
          <div className="absolute -bottom-5 left-6 z-20 bg-[#0c1017]/90 border border-white/10 px-4 py-1.5 rounded-xl text-xs text-gray-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Resume AI Analysis
          </div>

          <div className="absolute -bottom-5 right-6 z-20 bg-amber-500/10 border border-amber-400/30 px-4 py-1.5 rounded-xl text-xs text-amber-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Adaptive Questions
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

const Waveform = () => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          animate={{ height: [6, 18, 8, 22, 6] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
          className="w-0.75 bg-amber-400 rounded-full"
        />
      ))}
    </div>
  );
};

