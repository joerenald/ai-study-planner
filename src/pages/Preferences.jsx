import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const Preferences = () => {
  const navigate = useNavigate();
  const { plannerData, updatePlanner } = usePlanner();

  const [hours, setHours] = useState(plannerData.dailyHours || 2);
  const [preferredTime, setPreferredTime] = useState(plannerData.preferredStudyTime || "");

  const handleNext = () => {
    if (!preferredTime) {
      alert("Please select your preferred study time");
      return;
    }

    updatePlanner({
      dailyHours: hours,
      preferredStudyTime: preferredTime,
    });

    navigate("/review");
  };

  const timeOptions = ["Morning", "Afternoon", "Night"];

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">
      <Navbar lightTheme />

      <div className="flex flex-col items-center py-16 px-6">

        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3 text-center"
        >
          Study Preferences
        </motion.h1>

        <p className="text-gray-600 mb-12 text-center max-w-xl">
          Help the AI adapt the timetable according to your natural study habits.
        </p>

        <div className="bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl p-10 shadow-lg w-full max-w-2xl">

          {/* Daily Hours Slider */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              How many hours can you study per day?
            </h2>

            <input
              type="range"
              min="1"
              max="10"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />

            <div className="text-center mt-3 text-lg font-semibold text-indigo-600">
              {hours} hours/day
            </div>
          </div>

          {/* Preferred Study Time */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              When do you prefer to study?
            </h2>

            <div className="flex flex-wrap gap-4 justify-center">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => setPreferredTime(time)}
                  className={`px-6 py-3 rounded-xl border transition font-semibold
                    ${
                      preferredTime === time
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "bg-white border-slate-300 hover:border-indigo-500"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-right">
           <center> <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
            >
              Continue
            </button></center>
          </div>
        </div>
        <div className="px-6 pt-6">
  <BackButton />
</div>
      </div>
    </div>
  );
};

export default Preferences;
