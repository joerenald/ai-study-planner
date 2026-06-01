import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaTrash, FaBookOpen } from "react-icons/fa";
import BackButton from "../components/BackButton";

const Subjects = () => {

  const navigate = useNavigate();

  const { plannerData, updatePlanner } = usePlanner();

  // =====================================================
  // STATES
  // =====================================================

  const [subjectName, setSubjectName] = useState("");

  const [difficulty, setDifficulty] = useState("Medium");

  // =====================================================
  // ADD SUBJECT
  // =====================================================

  const addSubject = () => {

    // Empty validation
    if (!subjectName.trim()) {

      alert("Please enter a subject name");

      return;
    }

    // Duplicate validation
    const alreadyExists =
      plannerData.subjects?.includes(subjectName);

    if (alreadyExists) {

      alert("Subject already added");

      return;
    }

    // Updated subject list
    const updatedSubjects = [
      ...(plannerData.subjects || []),
      subjectName.trim(),
    ];

    // Updated difficulty object
    const updatedDifficulty = {

      ...(plannerData.difficulty || {}),

      [subjectName.trim()]: difficulty,
    };

    // Save into context
    updatePlanner({

      subjects: updatedSubjects,

      difficulty: updatedDifficulty,
    });

    // Reset input
    setSubjectName("");

    setDifficulty("Medium");
  };

  // =====================================================
  // REMOVE SUBJECT
  // =====================================================

  const removeSubject = (subjectName) => {

    // Remove subject
    const filteredSubjects =
      plannerData.subjects.filter(
        (subject) => subject !== subjectName
      );

    // Remove difficulty
    const updatedDifficulty = {

      ...(plannerData.difficulty || {}),
    };

    delete updatedDifficulty[subjectName];

    // Update context
    updatePlanner({

      subjects: filteredSubjects,

      difficulty: updatedDifficulty,
    });
  };

  // =====================================================
  // CONTINUE
  // =====================================================

  const handleNext = () => {

    if (
      !plannerData.subjects ||
      plannerData.subjects.length === 0
    ) {

      alert("Please add at least one subject");

      return;
    }

    console.log("Subjects Sent:", plannerData.subjects);

    console.log(
      "Difficulty Sent:",
      plannerData.difficulty
    );

    navigate("/preferences");
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-slate-100 text-gray-800">

      <Navbar lightTheme />

      <div className="flex flex-col items-center py-16 px-6">

        {/* =====================================================
            TITLE
        ===================================================== */}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >

          📚 Add Your Subjects

        </motion.h1>

        <p className="text-gray-600 text-center max-w-2xl mb-10">

          Add the subjects you want to study and choose
          their difficulty level to generate a personalized
          study schedule.

        </p>

        {/* =====================================================
            INPUT BOX
        ===================================================== */}

        <div className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-3xl shadow-xl p-8 w-full max-w-3xl">

          <div className="flex flex-col md:flex-row gap-4">

            {/* SUBJECT INPUT */}

            <input
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) =>
                setSubjectName(e.target.value)
              }
              className="flex-1 px-5 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* DIFFICULTY */}

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="px-5 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >

              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>

            </select>

            {/* ADD BUTTON */}

            <button
              onClick={addSubject}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-md transition duration-300"
            >

              Add

            </button>

          </div>

          {/* =====================================================
              SUBJECT LIST
          ===================================================== */}

          <div className="mt-10 space-y-4">

            {plannerData.subjects &&
            plannerData.subjects.length > 0 ? (

              plannerData.subjects.map(
                (subject, index) => (

                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm"
                  >

                    {/* SUBJECT DETAILS */}

                    <div className="flex items-center gap-4">

                      <div className="bg-indigo-100 p-3 rounded-full">

                        <FaBookOpen className="text-indigo-600" />

                      </div>

                      <div>

                        <h3 className="font-semibold text-lg">

                          {subject}

                        </h3>

                        <p className="text-sm text-gray-500">

                          Difficulty:
                          {" "}

                          <span
                            className={
                              plannerData.difficulty?.[
                                subject
                              ] === "Hard"
                                ? "text-red-500 font-semibold"
                                : plannerData.difficulty?.[
                                    subject
                                  ] === "Medium"
                                ? "text-yellow-600 font-semibold"
                                : "text-green-600 font-semibold"
                            }
                          >

                            {
                              plannerData.difficulty?.[
                                subject
                              ]
                            }

                          </span>

                        </p>

                      </div>

                    </div>

                    {/* DELETE BUTTON */}

                    <button
                      onClick={() =>
                        removeSubject(subject)
                      }
                      className="text-red-500 hover:text-red-700 transition"
                    >

                      <FaTrash size={18} />

                    </button>

                  </motion.div>
                )
              )

            ) : (

              <div className="text-center text-gray-500 py-8">

                No subjects added yet.

              </div>
            )}

          </div>

          {/* =====================================================
              CONTINUE BUTTON
          ===================================================== */}

          <div className="mt-10 text-right">

            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-semibold shadow-lg transition duration-300"
            >

              Continue →

            </button>
          
</div>
</div>
          <div className="px-6 pt-6">
  <BackButton />
        </div>

      </div>

    </div>
  );
};

export default Subjects;