/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../config/api.js";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

const Navbars = () => {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popupRef = useRef();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowUserPopup(false);
        setShowCreditPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-center px-4 pt-6 relative z-50">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl 
        bg-[#111622]/60 backdrop-blur-xl 
        border border-white/[0.08] 
        rounded-2xl 
        px-6 py-3.5 
        flex justify-between items-center 
        shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-amber-500 text-black p-2 rounded-xl shadow-md group-hover:scale-105 transition duration-200">
            <BsRobot size={18} />
          </div>
          <h1 className="font-bold text-white tracking-tight text-lg">
            Interv<span className="text-amber-400 font-black">AI</span>
          </h1>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 relative" ref={popupRef}>
          {/* CREDITS PILL */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) return setShowAuth(true);
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 cursor-pointer
              bg-white/5 hover:bg-white/10 
              border border-white/10 hover:border-amber-400/40 
              px-3.5 py-1.5 rounded-full text-xs font-medium text-white
              transition shadow-sm"
            >
              <BsCoin className="text-amber-400 text-sm" />
              <span>{userData?.credits !== undefined ? userData.credits : 0}</span>
            </button>

            <AnimatePresence>
              {showCreditPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 
                  bg-[#0f141c]/95 backdrop-blur-2xl
                  border border-white/10 
                  rounded-2xl p-5 shadow-2xl z-100"
                >
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Need more credits to continue AI mock interviews?
                  </p>

                  <button
                    onClick={() => {
                      setShowCreditPopup(false);
                      navigate("/pricing");
                    }}
                    className="w-full cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black py-2 rounded-xl text-xs font-bold transition shadow-md"
                  >
                    Buy Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* USER AVATAR */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) return setShowAuth(true);
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className="w-9 h-9 cursor-pointer bg-white/5 hover:bg-white/10 
              border border-white/10 hover:border-amber-400/40 
              rounded-full flex items-center justify-center text-amber-300 text-xs font-bold transition"
            >
              {userData ? (
                userData?.name?.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={15} className="text-gray-300" />
              )}
            </button>

            <AnimatePresence>
              {showUserPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-52 
                  bg-[#0f141c]/95 backdrop-blur-2xl
                  border border-white/10 
                  rounded-2xl p-4 shadow-2xl z-100"
                >
                  <p className="text-amber-400 text-xs font-semibold mb-2 truncate">
                    {userData?.name}
                  </p>

                  <button
                    onClick={() => {
                      setShowUserPopup(false);
                      navigate("/history");
                    }}
                    className="w-full cursor-pointer text-left text-xs py-2 text-gray-300 hover:text-white transition"
                  >
                    Interview History
                  </button>

                  <button
                    onClick={() => {
                      setShowUserPopup(false);
                      navigate("/pricing");
                    }}
                    className="w-full cursor-pointer text-left text-xs py-2 text-gray-300 hover:text-white transition"
                  >
                    Pricing Plans
                  </button>

                  <div className="border-t border-white/10 pt-2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer text-left text-xs py-1.5 flex items-center gap-2 text-red-400 hover:text-red-300 transition"
                    >
                      <HiOutlineLogout size={15} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {showAuth && <AuthModel onclose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Navbars;
