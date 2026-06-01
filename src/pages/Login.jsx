import React, {
  useState,
  useCallback,
} from "react";
import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import { motion } from "framer-motion";

import Particles from "@tsparticles/react";

import { loadSlim }
from "@tsparticles/slim";

import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import {
  Player,
} from "@lottiefiles/react-lottie-player";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      email: "",

      password: "",
    });

  // ==========================================
  // PARTICLES
  // ==========================================

  const particlesInit =
    useCallback(async (engine) => {

      await loadSlim(engine);

    }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      const result =
        await login(
          formData.email,
          formData.password
        );

      setLoading(false);

      if (result.success) {

        navigate("/home");

      } else {

        alert(result.message);
      }
    };

    // ==========================================
// GOOGLE LOGIN
// ==========================================

const handleGoogleLogin =
  async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      console.log(
        "Google User:",
        result.user
      );

      alert(
        `Welcome ${result.user.displayName}`
      );

      navigate("/home");

    } catch (error) {

      console.error(error);

      alert(
        "Google Login Failed"
      );
    }
  };

// ==========================================
// GITHUB LOGIN
// ==========================================

const handleGithubLogin =
  async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          githubProvider
        );

      console.log(
        "GitHub User:",
        result.user
      );

      alert(
        `Welcome ${result.user.displayName}`
      );

      navigate("/home");

    } catch (error) {

      console.error(error);

      alert(
        "GitHub Login Failed"
      );
    }
  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] flex items-center justify-center px-6">

      {/* ==========================================
          GRADIENT BACKGROUND
      ========================================== */}

      <div className="absolute inset-0 -z-20">

        <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-indigo-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-purple-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      </div>

      {/* ==========================================
          PARTICLES
      ========================================== */}

      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{

          fpsLimit: 60,

          particles: {

            number: {
              value: 50,
            },

            color: {
              value: "#ffffff",
            },

            size: {
              value: 2,
            },

            move: {
              enable: true,
              speed: 0.7,
            },

            links: {
              enable: true,
              color: "#ffffff",
              opacity: 0.15,
            },
          },
        }}
      />

      {/* ==========================================
          MAIN CARD
      ========================================== */}

      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="w-full max-w-6xl grid md:grid-cols-2 overflow-hidden rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >

        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <div className="hidden md:flex flex-col justify-center items-center p-12 bg-white/5 border-r border-white/10">

          <Player
            autoplay
            loop
            src="https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json"
            style={{
              height: "320px",
              width: "320px",
            }}
          />

          <h1 className="text-5xl font-extrabold text-white mt-6 text-center leading-tight">

            Smart AI
            <span className="block text-indigo-400">

              Study Planner

            </span>

          </h1>

          <p className="text-gray-300 mt-6 text-center leading-8 max-w-md">

            Organize your learning,
            boost productivity,
            track progress,
            and generate
            personalized AI-powered
            study schedules effortlessly.

          </p>

        </div>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <div className="p-10 md:p-14">

          <motion.h2

            initial={{
              opacity: 0,
              x: 20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="text-4xl font-bold text-white mb-3"
          >

            Welcome Back 👋

          </motion.h2>

          <p className="text-gray-300 mb-10">

            Login to continue your
            AI learning journey.

          </p>

          {/* ==========================================
              SOCIAL BUTTONS
          ========================================== */}

          <div className="flex gap-4 mb-8">

            <button
  onClick={handleGoogleLogin}
              className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 transition rounded-2xl py-4 text-white font-medium"
            >

              <FaGoogle />

              Google

            </button>

           <button
  onClick={handleGithubLogin}
              className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 transition rounded-2xl py-4 text-white font-medium"
            >

              <FaGithub />

              GitHub

            </button>

          </div>

          {/* ==========================================
              DIVIDER
          ========================================== */}

          <div className="flex items-center gap-4 mb-8">

            <div className="flex-1 h-[1px] bg-white/10"></div>

            <span className="text-gray-400 text-sm">

              OR CONTINUE WITH EMAIL

            </span>

            <div className="flex-1 h-[1px] bg-white/10"></div>

          </div>

          {/* ==========================================
              FORM
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* EMAIL */}

            <div className="relative">

              <input
                type="email"
                name="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className="peer w-full bg-white/10 border border-white/20 rounded-2xl px-5 pt-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-indigo-400"
              />

              <label
                className="absolute left-5 top-3 text-sm text-gray-300 transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:top-3
                peer-focus:text-sm
                peer-focus:text-indigo-400"
              >

                Email Address

              </label>

            </div>

            {/* PASSWORD */}

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                name="password"

                required

                placeholder=" "

                value={formData.password}

                onChange={handleChange}

                className="peer w-full bg-white/10 border border-white/20 rounded-2xl px-5 pt-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-indigo-400"
              />

              <label
                className="absolute left-5 top-3 text-sm text-gray-300 transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:top-3
                peer-focus:text-sm
                peer-focus:text-indigo-400"
              >

                Password

              </label>

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-5 top-5 text-gray-300"
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>

            {/* LOGIN BUTTON */}

            <motion.button

              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              type="submit"

              disabled={loading}

              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition text-white py-4 rounded-2xl font-bold text-lg shadow-xl"
            >

              {loading
                ? "Signing In..."
                : "Login"}

            </motion.button>

          </form>

          {/* ==========================================
              REGISTER
          ========================================== */}

          <p className="text-center text-gray-300 mt-8">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-indigo-400 font-semibold hover:text-indigo-300"
            >

              Create Account

            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;