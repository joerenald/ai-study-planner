import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FaBrain, FaChartLine, FaClock } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/start");
  };

  // particles init
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb] text-gray-800">

      {/* Soft Animated Gradient Background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute w-[600px] h-[600px] bg-indigo-300 opacity-20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-300 opacity-20 rounded-full blur-3xl bottom-[-150px] right-[-150px] animate-pulse"></div>
      </div>

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            color: { value: "#6366f1" },
            links: {
              enable: true,
              color: "#a5b4fc",
              distance: 140,
              opacity: 0.3,
            },
            move: {
              enable: true,
              speed: 0.6,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
          },
        }}
      />

      {/* Navbar */}
      <Navbar lightTheme />

      {/* HERO SECTION */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
        >
          Your Personal
          <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Study Planner
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mt-6 text-lg text-gray-600"
        >
          Stop guessing how to study. Our AI analyzes your subjects,
          available time, and difficulty level to automatically generate
          a personalized, optimized study timetable just for you.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleGetStarted}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 px-10 py-4 rounded-2xl font-semibold text-white text-lg
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     shadow-lg hover:shadow-xl
                     hover:scale-105 transition-all duration-300"
        >
          Generate My Plan
        </motion.button>
        
      </main>

      {/* FEATURES SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">

        {/* Feature Card */}
        <div className="backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <FaBrain className="text-indigo-600 text-3xl mb-4" />
          <h3 className="font-semibold text-xl mb-2">AI Analysis</h3>
          <p className="text-gray-600 text-sm">
            Understands subject difficulty and intelligently distributes
            workload for efficient learning.
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <FaClock className="text-purple-600 text-3xl mb-4" />
          <h3 className="font-semibold text-xl mb-2">Time Optimization</h3>
          <p className="text-gray-600 text-sm">
            Uses your daily available hours to build a balanced and realistic
            schedule.
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <FaChartLine className="text-pink-600 text-3xl mb-4" />
          <h3 className="font-semibold text-xl mb-2">Performance Growth</h3>
          <p className="text-gray-600 text-sm">
            Improves consistency, reduces burnout, and helps you finish
            preparation before deadlines.
          </p>
        </div>

      </section>

    </div>
  );
};

export default Home;
