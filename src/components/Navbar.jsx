import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

import {
  FaUserCircle,
} from "react-icons/fa";

import {
  useAuth,
} from "../context/AuthContext";

const Navbar = () => {

  const [open, setOpen] =
    useState(false);

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  // ==========================================
  // HANDLE LOGOUT
  // ==========================================

  const handleLogout =
    async () => {

      await logout();

      navigate("/");
    };

  return (

    <motion.nav

      initial={{
        y: -60,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.6,
      }}

     className="sticky top-4 mx-auto w-[92%] max-w-7xl z-50"
    >

      <div
        className="
        backdrop-blur-xl
        bg-white/70
        border border-gray-200
        shadow-xl
        rounded-2xl
        px-6 py-4
        flex items-center justify-between
      "
      >

        {/* ==========================================
            LOGO
        ========================================== */}

        <div
          onClick={() =>
            navigate("/home")
          }
          className="cursor-pointer flex items-center gap-3"
        >

          <div
            className="
            w-10 h-10
            rounded-xl
            bg-gradient-to-br
            from-indigo-600
            to-purple-600
            flex items-center justify-center
            text-white font-bold
          "
          >

            AI

          </div>

          <span
            className="
            font-bold text-xl
            text-gray-800
          "
          >

            Study Planner

          </span>

        </div>

        {/* ==========================================
            DESKTOP MENU
        ========================================== */}

        <div
          className="
          hidden md:flex
          items-center gap-8
          text-gray-700 font-medium
        "
        >

          <Link
            to="/home"
            className="
            hover:text-indigo-600
            transition
          "
          >

            Home

          </Link>

          <Link
            to="/start"
            className="
            hover:text-indigo-600
            transition
          "
          >

            Create Plan

          </Link>

          <Link
            to="/dashboard"
            className="
            hover:text-indigo-600
            transition
          "
          >

            Study Dashboard

          </Link>

          {/* ==========================================
              USER DASHBOARD
          ========================================== */}

          <Link
            to="/user-dashboard"
            className="
            hover:text-indigo-600
            transition
          "
          >

            User Dashboard

          </Link>

        </div>

        {/* ==========================================
            USER SECTION
        ========================================== */}

        <div
          className="
          hidden md:flex
          items-center gap-4
        "
        >

          {/* PROFILE */}

          <div
            className="
            flex items-center gap-3
            bg-white/60
            px-4 py-2
            rounded-xl
            border border-gray-200
          "
          >

            {user?.photoURL ? (

              <img
                src={user.photoURL}
                alt="profile"
                className="
                w-10 h-10
                rounded-full
                object-cover
              "
              />

            ) : (

              <FaUserCircle
                className="
                text-3xl
                text-indigo-600
              "
              />
            )}

            <div>

              <p
                className="
                text-sm font-semibold
                text-gray-800
              "
              >

                {user?.displayName ||
                  "User"}

              </p>

              <p
                className="
                text-xs text-gray-500
              "
              >

                {user?.email}

              </p>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
            bg-gradient-to-r
            from-red-500
            to-pink-500
            hover:opacity-90
            transition
            text-white
            px-5 py-2.5
            rounded-xl
            shadow-lg
            font-medium
          "
          >

            Logout

          </button>

        </div>

        {/* ==========================================
            MOBILE MENU BUTTON
        ========================================== */}

        <button
          className="
          md:hidden
          text-2xl
          text-gray-700
        "
          onClick={() =>
            setOpen(!open)
          }
        >

          {open
            ? <FiX />
            : <FiMenu />}

        </button>

      </div>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      {open && (

        <motion.div

          initial={{
            opacity: 0,
            y: -15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
          md:hidden mt-3
          backdrop-blur-xl
          bg-white/80
          border border-gray-200
          rounded-2xl
          shadow-lg
          p-6
          flex flex-col gap-5
          text-gray-700 font-medium
        "
        >

          <Link
            to="/home"
            onClick={() =>
              setOpen(false)
            }
          >

            Home

          </Link>

          <Link
            to="/start"
            onClick={() =>
              setOpen(false)
            }
          >

            Create Plan

          </Link>

          <Link
            to="/dashboard"
            onClick={() =>
              setOpen(false)
            }
          >

            Study Dashboard

          </Link>

          <Link
            to="/user-dashboard"
            onClick={() =>
              setOpen(false)
            }
          >

            User Dashboard

          </Link>

          {/* MOBILE PROFILE */}

          <div
            className="
            border-t pt-4
            flex items-center gap-3
          "
          >

            {user?.photoURL ? (

              <img
                src={user.photoURL}
                alt="profile"
                className="
                w-12 h-12
                rounded-full
                object-cover
              "
              />

            ) : (

              <FaUserCircle
                className="
                text-4xl
                text-indigo-600
              "
              />
            )}

            <div>

              <p
                className="
                font-semibold
              "
              >

                {user?.displayName ||
                  "User"}

              </p>

              <p
                className="
                text-sm text-gray-500
              "
              >

                {user?.email}

              </p>

            </div>

          </div>

          {/* MOBILE LOGOUT */}

          <button
            onClick={handleLogout}
            className="
            mt-3
            px-5 py-3
            rounded-xl
            bg-gradient-to-r
            from-red-500
            to-pink-500
            text-white
            font-medium
          "
          >

            Logout

          </button>

        </motion.div>
      )}

    </motion.nav>
  );
};

export default Navbar;