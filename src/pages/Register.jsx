import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result =
      await register(
        formData.name,
        formData.email,
        formData.password
      );

    setLoading(false);

    if (result.success) {
      alert(
        "Registration Successful 🎉"
      );

      navigate("/home");
    } else {
      alert(result.message);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-slate-900
      flex
      items-center
      justify-center
      px-6
      py-10
      relative
      overflow-hidden
    "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        top-10
        left-10
        w-80
        h-80
        bg-blue-500/20
        rounded-full
        blur-3xl
      "
      />

      <div
        className="
        absolute
        bottom-10
        right-10
        w-80
        h-80
        bg-cyan-500/10
        rounded-full
        blur-3xl
      "
      />

      <div
        className="
        max-w-6xl
        w-full
        grid
        lg:grid-cols-2
        gap-12
        items-center
        relative
        z-10
      "
      >
        {/* LEFT SECTION */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-white"
        >
          <div
            className="
            w-20
            h-20
            rounded-3xl
            bg-blue-600/20
            border
            border-blue-400/30
            backdrop-blur-xl
            flex
            items-center
            justify-center
            text-4xl
            mb-6
          "
          >
            🤖
          </div>

          <h1
            className="
            text-5xl
            font-bold
            leading-tight
            text-blue-100
            mb-6
          "
          >
            AI Study Planner
          </h1>

          <p
            className="
            text-lg
            text-slate-300
            mb-10
          "
          >
            Create smart study plans,
            track progress, improve
            productivity, and achieve
            your academic goals with
            AI-powered guidance.
          </p>

          <div className="space-y-4">
            <div
              className="
              flex
              items-center
              gap-4
              bg-slate-900/30
              border
              border-blue-500/10
              rounded-xl
              p-4
            "
            >
              <span className="text-2xl">
                🎯
              </span>

              <span>
                Personalized Study Plans
              </span>
            </div>

            <div
              className="
              flex
              items-center
              gap-4
              bg-slate-900/30
              border
              border-blue-500/10
              rounded-xl
              p-4
            "
            >
              <span className="text-2xl">
                📊
              </span>

              <span>
                Progress Analytics &
                Tracking
              </span>
            </div>

            <div
              className="
              flex
              items-center
              gap-4
              bg-slate-900/30
              border
              border-blue-500/10
              rounded-xl
              p-4
            "
            >
              <span className="text-2xl">
                🤖
              </span>

              <span>
                AI Recommendations
              </span>
            </div>

            <div
              className="
              flex
              items-center
              gap-4
              bg-slate-900/30
              border
              border-blue-500/10
              rounded-xl
              p-4
            "
            >
              <span className="text-2xl">
                🔥
              </span>

              <span>
                Streak & Motivation
                System
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SECTION */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          bg-white/5
          backdrop-blur-2xl
          border
          border-blue-500/20
          rounded-3xl
          shadow-[0_0_50px_rgba(37,99,235,0.15)]
          p-8
          lg:p-10
        "
        >
          <h2
            className="
            text-4xl
            font-bold
            text-blue-100
            text-center
            mb-2
          "
          >
            Create Account
          </h2>

          <p
            className="
            text-center
            text-slate-400
            mb-8
          "
          >
            Start your learning journey
            today
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* NAME */}

            <div className="relative">
              <FiUser
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                text-xl
              "
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-slate-900/60
                border
                border-blue-500/20
                text-white
                placeholder-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              />
            </div>

            {/* EMAIL */}

            <div className="relative">
              <FiMail
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                text-xl
              "
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-slate-900/60
                border
                border-blue-500/20
                text-white
                placeholder-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              />
            </div>

            {/* PASSWORD */}

            <div className="relative">
              <FiLock
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                text-xl
              "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                w-full
                pl-12
                pr-12
                py-4
                rounded-xl
                bg-slate-900/60
                border
                border-blue-500/20
                text-white
                placeholder-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>
            </div>

            {/* BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={loading}
              className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              hover:from-blue-500
              hover:to-cyan-400
              text-white
              font-bold
              text-lg
              shadow-xl
              transition-all
              duration-300
            "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </motion.button>
          </form>

          <p
            className="
            text-center
            text-slate-400
            mt-6
          "
          >
            Already have an account?

            <Link
              to="/"
              className="
              ml-2
              text-blue-400
              font-semibold
              hover:text-blue-300
            "
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;