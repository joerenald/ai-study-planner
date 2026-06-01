// src/pages/Generating.jsx

import React, {
  useEffect,
  useRef,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import Navbar
from "../components/Navbar";

import {
  usePlanner,
} from "../context/PlannerContext";

import {
  useAuth,
} from "../context/AuthContext";

const Generating = () => {

  const navigate =
    useNavigate();

  const {
    plannerData,
    generateAIPlan,
  } = usePlanner();

  const { user } =
    useAuth();

  // ==========================================
  // PREVENT MULTIPLE EXECUTIONS
  // ==========================================

  const hasGenerated =
    useRef(false);

  useEffect(() => {

    const runAI =
      async () => {

        // STOP DUPLICATE EXECUTION

        if (
          hasGenerated.current
        ) {
          return;
        }

        hasGenerated.current =
          true;

        try {

          // ==========================================
          // VALIDATION
          // ==========================================

          if (
            !plannerData.goal ||
            !plannerData.deadline
          ) {

            alert(
              "Goal and Deadline are required"
            );

            navigate("/planner");

            return;
          }

          // ==========================================
          // GENERATE AI PLAN
          // ==========================================

          const aiData =
            await generateAIPlan();

          if (!aiData) {

            alert(
              "AI generation failed"
            );

            return;
          }

          // ==========================================
          // FINAL PLAN OBJECT
          // ==========================================

          const finalPlan = {

            uid:
              user.uid,

            goal:
              plannerData.goal,

            deadline:
              plannerData.deadline,

            subjects:
              plannerData.subjects,

            difficulty:
              plannerData.difficulty,

            dailyHours:
              plannerData.dailyHours,

            preferredStudyTime:
              plannerData.preferredStudyTime,

            aiPlan:
              aiData.aiPlan,

            weakSubjects:
              aiData.weakSubjects,

            dailySchedule:
              aiData.dailySchedule,

            // ==========================================
            // INITIAL EMPTY VALUES
            // ==========================================

            aiScore: null,

            completion: null,

            grade: "A",

            riskLevel: "Low",

            currentStreak: 1,

            longestStreak: 1,

            status:
              "Not Started",
          };

          // ==========================================
          // SAVE PLAN
          // ==========================================

          await axios.post(

            "http://localhost:5000/api/planner/save",

            finalPlan
          );

          console.log(
            "Plan Saved Successfully"
          );

          // ==========================================
          // REDIRECT
          // ==========================================

          setTimeout(() => {

            navigate(
              "/dashboard"
            );

          }, 1500);

        } catch (error) {

          console.error(
            "AI generation failed:",
            error
          );

          alert(
            "Failed to generate study plan"
          );
        }
      };

    runAI();

  }, []);

  return (

    <div
      className="
      min-h-screen
      bg-slate-100
      flex flex-col
      items-center
      justify-center
      relative
      overflow-hidden
    "
    >

      <Navbar />

      <div
        className="
        flex flex-col
        items-center
        justify-center
        text-center
        px-6
      "
      >

        {/* AI ORB */}

        <motion.div
          className="
          w-40 h-40
          rounded-full
          bg-gradient-to-r
          from-indigo-500
          via-purple-500
          to-pink-500
          blur-xl
          opacity-70
        "
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* AI CORE */}

        <motion.div
          className="
          absolute
          w-24 h-24
          rounded-full
          bg-white
          shadow-2xl
          flex items-center
          justify-center
          text-indigo-600
          font-bold
          text-xl
        "
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >

          AI

        </motion.div>

        {/* TITLE */}

        <h2
          className="
          mt-52
          text-3xl
          font-bold
          text-gray-800
        "
        >

          Generating Your Study Plan

        </h2>

        {/* DESCRIPTION */}

        <p
          className="
          text-gray-600
          mt-3
          max-w-md
        "
        >

          AI is analyzing your
          subjects, difficulty
          levels, and available
          time.

          Please wait while your
          personalized schedule
          is being created.

        </p>

        {/* LOADING DOTS */}

        <div
          className="
          flex gap-2
          mt-6
        "
        >

          <motion.div
            className="
            w-3 h-3
            bg-indigo-500
            rounded-full
          "
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
            }}
          />

          <motion.div
            className="
            w-3 h-3
            bg-indigo-500
            rounded-full
          "
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: 0.2,
            }}
          />

          <motion.div
            className="
            w-3 h-3
            bg-indigo-500
            rounded-full
          "
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: 0.4,
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default Generating;