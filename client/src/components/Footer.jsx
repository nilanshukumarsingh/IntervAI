/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { BsRobot } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/nilanshukumarsingh/",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/nilanshukumarsingh",
      label: "LinkedIn",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/nilanshukumar81",
      label: "X (Twitter)",
    },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 text-white bg-[#080b10]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* BRAND COLUMN */}
          <div className="md:col-span-2">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group mb-4 inline-flex"
            >
              <div className="bg-amber-500 text-black p-2 rounded-xl shadow-md group-hover:scale-105 transition duration-200">
                <BsRobot size={20} />
              </div>
              <h2 className="font-bold text-xl text-white tracking-tight">
                Interv<span className="text-amber-400 font-black">AI</span>
              </h2>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              Practice smarter. Improve faster. Master high-stakes tech & behavioral interviews with AI-powered voice simulations and real-time rubric feedback.
            </p>

            {/* REAL USER SOCIAL LINKS */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-gray-300 hover:text-amber-300 transition duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* PRODUCT COLUMN */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li
                onClick={() => navigate("/interview")}
                className="hover:text-white cursor-pointer transition"
              >
                Mock Interviews
              </li>
              <li
                onClick={() => navigate("/interview")}
                className="hover:text-white cursor-pointer transition"
              >
                Voice AI Simulation
              </li>
              <li
                onClick={() => navigate("/history")}
                className="hover:text-white cursor-pointer transition"
              >
                Analytics & Reports
              </li>
              <li
                onClick={() => navigate("/interview")}
                className="hover:text-white cursor-pointer transition"
              >
                Resume AI Testing
              </li>
            </ul>
          </div>

          {/* EXPLORE COLUMN */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li
                onClick={() => navigate("/pricing")}
                className="hover:text-white cursor-pointer transition"
              >
                Pricing Plans
              </li>
              <li
                onClick={() => navigate("/history")}
                className="hover:text-white cursor-pointer transition"
              >
                Session History
              </li>
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-white cursor-pointer transition"
              >
                Back to Top
              </li>
            </ul>
          </div>

          {/* CONNECT COLUMN */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Creator
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="https://github.com/nilanshukumarsingh/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  Nilanshu Kumar Singh
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/nilanshukumar81"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  @nilanshukumar81
                </a>
              </li>
              <li className="text-gray-500 text-xs">
                Built with React & AI
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IntervAI. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer transition">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
