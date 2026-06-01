import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const Review = () => {
  const navigate = useNavigate();
  const { plannerData } = usePlanner();

  const handleGenerate = () => {
    navigate("/generating");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">
      <Navbar lightTheme />

      <div className="flex flex-col items-center py-16 px-6">

        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Review Your Plan
        </motion.h1>

        <p className="text-gray-600 mb-12 text-center max-w-xl">
          Please confirm your details before the AI creates your personalized study timetable.
        </p>

        <div className="bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl p-10 shadow-lg w-full max-w-3xl space-y-8">

          {/* Goal */}
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Goal</h2>
            <p className="text-gray-700">{plannerData.goal}</p>
          </div>

          {/* Deadline */}
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Exam Date</h2>
            <p className="text-gray-700">{plannerData.deadline}</p>
          </div>

          {/* Subjects */}
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-3">Subjects</h2>
            <div className="space-y-3">
              {plannerData.subjects.map((subj, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-white border border-slate-200 rounded-xl px-5 py-3"
                >
                  <span className="font-medium">{subj}</span>
                  <span className="text-gray-500">
                    {plannerData.difficulty[subj]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Hours */}
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Daily Study Time</h2>
            <p className="text-gray-700">{plannerData.dailyHours} hours/day</p>
          </div>

          {/* Preferred Study Time */}
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Preferred Study Period</h2>
            <p className="text-gray-700">{plannerData.preferredStudyTime}</p>
          </div>

        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          className="mt-12 bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg transition"
        >
          🧠 Create My AI Study Plan
        </motion.button>
 <div className="px-6 pt-6">
  <BackButton />
</div>
      </div>
    </div>
  );
};

export default Review;
