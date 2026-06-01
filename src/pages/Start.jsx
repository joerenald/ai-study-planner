import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaGraduationCap, FaTrophy, FaRedo, FaLaptopCode } from "react-icons/fa";
import BackButton from "../components/BackButton";
const Start = () => {
  const navigate = useNavigate();
  const { updatePlanner } = usePlanner();

  const goals = [
    {
      title: "Semester Exam",
      icon: <FaGraduationCap size={40} />,
    },
    {
      title: "Competitive Exam",
      icon: <FaTrophy size={40} />,
    },
    {
      title: "Backlog Clearance",
      icon: <FaRedo size={40} />,
    },
    {
      title: "Skill Learning",
      icon: <FaLaptopCode size={40} />,
    },
  ];

  const handleSelect = (goal) => {
    updatePlanner({ goal });
    navigate("/deadline");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">

      <Navbar lightTheme />

      <div className="flex flex-col items-center justify-center py-20 px-6">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3 text-center"
        >
          What are you preparing for?
        </motion.h1>

        <p className="text-gray-600 mb-12 text-center max-w-xl">
          This helps the AI understand your objective and design a smarter study plan.
        </p>

        {/* Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

          {goals.map((g, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(g.title)}
              className="cursor-pointer bg-white/40 backdrop-blur-md border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition"
            >
              <div className="text-indigo-600 mb-4">
                {g.icon}
              </div>

              <h2 className="text-xl font-semibold">
                {g.title}
              </h2>
            </motion.div>
          ))}

        </div>
<div className="p-6">
  <BackButton />
</div>
      </div>
    </div>
  );
};

export default Start;
