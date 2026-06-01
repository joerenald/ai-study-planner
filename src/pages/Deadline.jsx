import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "../components/BackButton";
const Deadline = () => {
const navigate = useNavigate();
const { updatePlanner } = usePlanner();

const [selectedDate, setSelectedDate] = useState(null);

const handleNext = () => {
if (!selectedDate) return alert("Please select your exam date");


updatePlanner({
  deadline: format(selectedDate, "yyyy-MM-dd"),
});

navigate("/subjects");

};

return ( <div className="min-h-screen bg-slate-100 text-gray-800"> <Navbar lightTheme />

```
  <div className="flex flex-col items-center justify-center py-20 px-6 relative">

    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold mb-3 text-center"
    >
      When is your exam?
    </motion.h1>

    <p className="text-gray-600 mb-10 text-center max-w-lg">
      The AI will distribute your subjects across the remaining days to avoid overload.
    </p>

    {/* Date Picker Card */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white backdrop-blur-md border border-slate-200 rounded-2xl p-10 shadow-xl flex flex-col items-center relative overflow-visible"
    >
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        dateFormat="dd MMMM yyyy"
        placeholderText="Select your exam date"
        popperPlacement="bottom"
        popperClassName="z-50"
        portalId="root"
        className="w-72 text-center text-lg px-6 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handleNext}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
      >
        Continue
      </button>
    </motion.div>
    <div className="px-6 pt-6">
  <BackButton />
</div>
  </div>
  
</div>

);
};

export default Deadline;
