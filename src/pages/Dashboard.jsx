import React from "react";
import { usePlanner } from "../context/PlannerContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate }
from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const toggleTask =
  async (index) => {

    try {

      const response =
        await axios.put(

          `https://ai-study-planner-backend-jr7f.onrender.com/api/planner/task/${plannerData._id}/${index}`

        );

      setPlannerData(
        response.data.planner
      );

    } catch (error) {

      console.error(
        "Task update failed",
        error
      );
    }
  };
  const testAI = async () => {

  try {

    const res =
      await axios.post(

        "https://ai-study-planner-backend-jr7f.onrender.com/api/ai/chat",

        {
          message:
            "How should I study DBMS?",
        }
      );

    console.log(
      res.data
    );

    alert(
      res.data.reply
    );

  } catch (error) {

    console.error(error);

    alert(
      "AI Failed"
    );
  }
};
const navigate =
    useNavigate();
  const { plannerData } = usePlanner();

  const [date, setDate] = React.useState(
  new Date()
);

  const {
    goal = "No Goal",
    deadline = "",
    subjects = [],
    aiPlan = "",
    weakSubjects = [],
    dailySchedule = [],
    dailyHours = 0,
    currentStreak = 1,
longestStreak = 1,
  } = plannerData;

  // =====================================================
  // DAYS REMAINING
  // =====================================================

  const calculateDaysLeft = () => {

    if (!deadline) return 0;

    const today = new Date();

    const examDate = new Date(deadline);

    const difference =
      examDate.getTime() - today.getTime();

    const days =
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      );

    return days > 0 ? days : 0;
  };

  const daysLeft = calculateDaysLeft();
  // =====================================================
// SUBJECT DIFFICULTY DATA
// =====================================================

const difficultyData = [

  {
    name: "Easy",
    value: Object.values(
      plannerData.difficulty || {}
    ).filter((d) => d === "Easy").length,
  },

  {
    name: "Medium",
    value: Object.values(
      plannerData.difficulty || {}
    ).filter((d) => d === "Medium").length,
  },

  {
    name: "Hard",
    value: Object.values(
      plannerData.difficulty || {}
    ).filter((d) => d === "Hard").length,
  },
];

// =====================================================
// STUDY MINUTES DATA
// =====================================================

const studyHoursData =
  dailySchedule.map((item) => ({

    subject: item.subject,

    minutes: parseInt(item.duration),
  }));

// =====================================================
// COLORS
// =====================================================

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

  // =====================================================
  // PDF DOWNLOAD
  // =====================================================

  const downloadReport = () => {

    const doc = new jsPDF();

    // Header
    doc.setFillColor(37, 99, 235);

    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(22);

    doc.text(
      "Smart Study Planner Report",
      42,
      18
    );

    doc.setTextColor(0, 0, 0);

    let y = 45;

    // =====================================================
    // OVERVIEW
    // =====================================================

    doc.setFontSize(15);

    doc.text(`Goal: ${goal}`, 20, y);

    y += 10;

    doc.text(`Deadline: ${deadline}`, 20, y);

    y += 15;

    // =====================================================
    // METRICS BOX
    // =====================================================

    doc.rect(15, y - 5, 180, 40);

    doc.setFontSize(13);

    doc.text(
      `Total Subjects: ${subjects.length}`,
      20,
      y + 5
    );

    doc.text(
      `Weak Subjects: ${weakSubjects.length}`,
      20,
      y + 15
    );

    doc.text(
      `Study Hours/Day: ${dailyHours}`,
      110,
      y + 5
    );

    doc.text(
      `Days Remaining: ${daysLeft}`,
      110,
      y + 15
    );

    y += 50;

    // =====================================================
    // WEAK SUBJECTS
    // =====================================================

    doc.setFontSize(16);

    doc.text("Weak Subjects", 20, y);

    y += 10;

    doc.setFontSize(12);

    if (weakSubjects.length > 0) {

      weakSubjects.forEach((subject) => {

        doc.text(`• ${subject}`, 25, y);

        y += 8;
      });

    } else {

      doc.text(
        "No weak subjects detected",
        25,
        y
      );

      y += 8;
    }

    y += 10;

    // =====================================================
    // DAILY PLAN
    // =====================================================

    doc.setFontSize(16);

    doc.text("Daily Study Plan", 20, y);

    y += 10;

    doc.setFontSize(12);

    if (dailySchedule.length > 0) {

      dailySchedule.forEach((item) => {

        doc.text(
          `${item.time} - ${item.subject} (${item.duration})`,
          20,
          y
        );

        y += 8;
      });

    } else {

      doc.text("No schedule generated", 20, y);

      y += 8;
    }

    y += 10;

    

    // =====================================================
    // STUDY STRATEGY
    // =====================================================

    doc.setFontSize(16);

    doc.text(
      "Personalized Study Strategy",
      20,
      y
    );

    y += 10;

    doc.setFontSize(11);

    const splitText =
      doc.splitTextToSize(
        aiPlan || "",
        170
      );

    doc.text(splitText, 20, y);

    // Save PDF
    doc.save("Smart_Study_Report.pdf");
  };

  // =====================================================
  // UI
  // =====================================================

  // =====================================================
// BROWSER NOTIFICATION
// =====================================================

const showNotification = () => {

  // Check support
  if (!("Notification" in window)) {

    alert(
      "Browser does not support notifications."
    );

    return;
  }

  // Ask permission
  if (Notification.permission === "default") {

    Notification.requestPermission()
      .then((permission) => {

        if (permission === "granted") {

          new Notification(
            "📚 Study Reminder",
            {

              body:
                "Time to continue your study session 🚀",

              icon:
                "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
            }
          );
        }
      });

  }

  // Already granted
  else if (
    Notification.permission === "granted"
  ) {

    new Notification(
      "📚 Study Reminder",
      {

        body:
          "Don't forget today's study plan 💪",

        icon:
          "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
      }
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        {/* =====================================================
            TITLE
        ===================================================== */}

        <h1 className="text-4xl font-bold text-center mb-10">

          📚 Smart Study Dashboard

        </h1>

        {/* =====================================================
            TOP CARDS
        ===================================================== */}

      <div className="grid md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

  <h2 className="text-gray-500 mb-2">

    🔥 Study Streak

  </h2>

  <p className="text-5xl font-bold text-orange-500">

    {currentStreak}

  </p>

  <p className="text-sm text-gray-500 mt-2">

    Longest: {longestStreak} days

  </p>

</div>

          {/* TOTAL SUBJECTS */}

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

            <h2 className="text-gray-500 mb-2">

              Total Subjects

            </h2>

            <p className="text-5xl font-bold text-blue-600">

              {subjects.length}

            </p>

          </div>

          {/* WEAK SUBJECTS */}

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

            <h2 className="text-gray-500 mb-2">

              Weak Subjects

            </h2>

            <p className="text-5xl font-bold text-red-500">

              {weakSubjects.length}

            </p>

          </div>

          {/* DAILY HOURS */}

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

            <h2 className="text-gray-500 mb-2">

              Daily Hours

            </h2>

            <p className="text-5xl font-bold text-green-600">

              {dailyHours}

            </p>

          </div>

          {/* DAYS LEFT */}

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

            <h2 className="text-gray-500 mb-2">

              Days Remaining

            </h2>

            <p className="text-5xl font-bold text-purple-600">

              {daysLeft}

            </p>

          </div>

        </div>

        {/* =====================================================
            GOAL OVERVIEW
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">

            🎯 Goal Overview

          </h2>

          <div className="space-y-3 text-lg">

            <p>

              <span className="font-semibold">

                Goal:

              </span>

              {" "}

              {goal}

            </p>

            <p>

              <span className="font-semibold">

                Deadline:

              </span>

              {" "}

              {deadline}

            </p>

            <p>

              <span className="font-semibold">

                Study Hours:

              </span>

              {" "}

              {dailyHours} hrs/day

            </p>

          </div>

        </div>

        {/* =====================================================
            WEAK SUBJECTS
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">

            ⚠ Weak Subjects

          </h2>

          <ul className="list-disc pl-6 space-y-2">

            {weakSubjects.length > 0 ? (

              weakSubjects.map((subject, index) => (

                <li key={index}>

                  {subject}

                </li>
              ))

            ) : (

              <li>

                No weak subjects detected 🎉

              </li>
            )}

          </ul>

        </div>

        {/* =====================================================
            DAILY PLAN
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">

            📅 Daily Study Plan

          </h2>

          {dailySchedule.length > 0 ? (

            dailySchedule.map((item, index) => (

              <div
                key={index}
                className="flex justify-between border-b py-3"
              >

                <span className="font-medium">

                  {item.time}

                </span>

                <span>

                  {item.subject}

                </span>

                <span className="text-blue-600">

                  {item.duration}

                </span>

              </div>
            ))

          ) : (

            <p>

              No schedule generated

            </p>
          )}

        </div>
        {/* =====================================================
    ANALYTICS CHARTS
    
===================================================== */}

<div className="grid md:grid-cols-2 gap-8 mb-8">

  {/* =====================================================
      DIFFICULTY CHART
  ===================================================== */}

  <div className="bg-white rounded-2xl shadow-xl p-6">

    <h2 className="text-2xl font-bold mb-6">

      📘 Subject Difficulty

    </h2>

    <div className="h-[300px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={difficultyData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {difficultyData.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip
  formatter={(value) => [`${value} mins`, "Study Time"]}
/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* =====================================================
      STUDY HOURS CHART
  ===================================================== */}

  <div className="bg-white rounded-2xl shadow-xl p-6">

    <h2 className="text-2xl font-bold mb-6">

      ⏱ Study Hours Allocation

    </h2>

    <div className="h-[300px]">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={studyHoursData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="subject" />

          <YAxis />

          <Tooltip />

          <Bar
  dataKey="minutes"
  fill="#6366f1"
  radius={[10, 10, 0, 0]}
/>

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>


{/* =====================================================
    STUDY CALENDAR
===================================================== */}

<div className="bg-white rounded-5xl shadow-xl p-6 mb-8">

  <div className="flex flex-col md:flex-row gap-8">

    {/* CALENDAR */}

    <div className="flex-1">

      <h2 className="text-2xl font-bold mb-6">

        📅 Study Calendar

      </h2>

      <Calendar
        onChange={setDate}
        value={date}
        className="rounded-2xl border-none shadow-md p-4"
      />

    </div>

    {/* SIDE PANEL */}

    <div className="flex-1">

      <h2 className="text-2xl font-bold mb-6">

        🎯 Today's Focus

      </h2>

      <div className="space-y-4">

        <div className="bg-indigo-50 p-4 rounded-xl">

          <h3 className="font-semibold text-indigo-700">

            Goal

          </h3>

          <p className="text-gray-700 mt-2">

            {goal}

          </p>

        </div>

        <div className="bg-green-50 p-4 rounded-xl">

          <h3 className="font-semibold text-green-700">

            Study Hours

          </h3>

          <p className="text-gray-700 mt-2">

            {dailyHours} hrs planned today

          </p>

        </div>

        <div className="bg-red-50 p-4 rounded-xl">

          <h3 className="font-semibold text-red-700">

            Weak Subjects

          </h3>

          <p className="text-gray-700 mt-2">

            {weakSubjects.length > 0
              ? weakSubjects.join(", ")
              : "No weak subjects"}

          </p>

        </div>

        <div className="bg-purple-50 p-4 rounded-xl">

          <h3 className="font-semibold text-purple-700">

            Deadline Countdown

          </h3>

          <p className="text-gray-700 mt-2">

            {daysLeft} days remaining

          </p>

        </div>

      </div>

    </div>

  </div>

</div>

        {/* =====================================================
            STRATEGY
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">

            🧠 Personalized Study Strategy

          </h2>

          <p className="whitespace-pre-line leading-8 text-gray-700">

            {aiPlan}

          </p>

        </div>

        {/* =====================================================
            DOWNLOAD BUTTON
        ===================================================== */}

        <div className="text-center">

          <button
            onClick={downloadReport}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl shadow-lg text-lg font-semibold"
          >

            ⬇ Download Study Report

          </button>
          
<button
  onClick={showNotification}
  className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-4 rounded-2xl shadow-lg text-lg font-semibold ml-4"
>

  🔔 Enable Study Reminder

</button>
<div className="flex justify-center mt-10">

  <button

    onClick={() =>
      navigate("/user-dashboard")
    }

    className="
      px-8 py-4
      rounded-2xl
      bg-gradient-to-r
      from-indigo-600
      to-purple-600
      text-white
      font-semibold
      shadow-xl
      hover:scale-105
      transition
    "
  >

    📚 View All My Plans

  </button>

</div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;