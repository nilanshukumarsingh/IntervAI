/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import Footer from "../components/Footer";
import Navbars from "../components/Navbars";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Feature from "../components/Feature";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!userData) return setShowAuth(true);
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white flex flex-col relative overflow-hidden">
      {/* CLEAN BACKGROUND WITHOUT TOP-LEFT YELLOW GLARE */}
      <div className="absolute w-120 h-120 bg-emerald-500/10 blur-[150px] rounded-full bottom-20 -right-20 pointer-events-none" />

      <Navbars />

      <Hero handleStart={handleStart} />

      <Feature />

      <Newsletter />

      <Footer />

      {showAuth && <AuthModel onclose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Home;
