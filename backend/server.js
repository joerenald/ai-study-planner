// backend/server.js
import aiRoutes
from "./routes/aiRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import plannerRoutes
from "./routes/plannerRoutes.js";
// ==========================================
// LOAD ENV
// ==========================================
dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(
  cors({
    origin:
      "http://localhost:5173",
      "https://ai-study-planner-ilwe.vercel.app",
    credentials: true,
  })
);
app.use(
  "/api/ai",
  aiRoutes
);
app.use(express.json());
app.use(
  "/api/planner",
  plannerRoutes
);
app.use("/api/auth", authRoutes);
// ==========================================
// HELPER FUNCTIONS
// ========================================

// ------------------------------------------
// AI SCORE
// ------------------------------------------

const generateAIScore = (
  weakSubjectsCount
) => {

  let score =
    100 - weakSubjectsCount * 10;

  if (score < 50) {
    score = 50;
  }

  return score;
};

// ------------------------------------------
// GRADE
// ------------------------------------------

const generateGrade = (score) => {

  if (score >= 90) return "A+";

  if (score >= 80) return "A";

  if (score >= 70) return "B";

  if (score >= 60) return "C";

  return "D";
};

// ------------------------------------------
// RISK LEVEL
// ------------------------------------------

const generateRiskLevel = (
  weakSubjectsCount
) => {

  if (weakSubjectsCount >= 3) {
    return "High";
  }

  if (weakSubjectsCount >= 1) {
    return "Medium";
  }

  return "Low";
};

// ------------------------------------------
// FORMAT TIME
// ------------------------------------------

const formatTime = (
  hour,
  minute
) => {

  const suffix =
    hour >= 12 ? "PM" : "AM";

  const formattedHour =
    hour % 12 || 12;

  return `${formattedHour}:${minute
    .toString()
    .padStart(2, "0")} ${suffix}`;
};

// ==========================================
// AI STUDY PLAN ROUTE
// ==========================================

app.post(
  "/api/generate-plan",
  (req, res) => {

    try {

      const {
        goal,
        deadline,
        subjects = [],
        difficulty = {},
        dailyHours = 2,
        preferredStudyTime = "Morning",
      } = req.body;

      // ==========================================
      // WEAK SUBJECT DETECTION
      // ==========================================

      const weakSubjects =
        subjects.filter(
          (subject) =>
            difficulty[
              subject
            ]?.toLowerCase() ===
            "hard"
        );

      // ==========================================
      // START TIME
      // ==========================================

      let startHour = 6;

      if (
        preferredStudyTime ===
        "Afternoon"
      ) {
        startHour = 13;
      }

      if (
        preferredStudyTime ===
        "Night"
      ) {
        startHour = 19;
      }

      // ==========================================
      // TOTAL STUDY MINUTES
      // ==========================================

      const totalMinutes =
        Number(dailyHours) * 60;

      // ==========================================
      // DIFFICULTY WEIGHTS
      // ==========================================

      const weights = {
        Hard: 3,
        Medium: 2,
        Easy: 1,
      };

      // ==========================================
      // CALCULATE TOTAL WEIGHT
      // ==========================================

      let totalWeight = 0;

      subjects.forEach(
        (subject) => {

          const level =
            difficulty[
              subject
            ] || "Medium";

          totalWeight +=
            weights[level];
        }
      );

      // ==========================================
      // GENERATE DAILY SCHEDULE
      // ==========================================

      let currentHour =
        startHour;

      let currentMinute = 0;

      let usedMinutes = 0;

      const dailySchedule = [];

      subjects.forEach(
        (
          subject,
          index
        ) => {

          const level =
            difficulty[
              subject
            ] || "Medium";

          const weight =
            weights[level];

          let allocatedMinutes = 0;

          // ------------------------------------------
          // LAST SUBJECT GETS REMAINING TIME
          // ------------------------------------------

          if (
            index ===
            subjects.length - 1
          ) {

            allocatedMinutes =
              totalMinutes -
              usedMinutes;

          } else {

            allocatedMinutes =
              Math.floor(
                (weight /
                  totalWeight) *
                  totalMinutes
              );

            usedMinutes +=
              allocatedMinutes;
          }

          // ------------------------------------------
          // MINIMUM 10 MINUTES
          // ------------------------------------------

          if (
            allocatedMinutes < 10
          ) {
            allocatedMinutes = 10;
          }

          // ------------------------------------------
          // ADD SCHEDULE ITEM
          // ------------------------------------------

          dailySchedule.push({

            time: formatTime(
              currentHour,
              currentMinute
            ),

            subject,

            duration:
              `${allocatedMinutes} mins`,

            difficulty: level,
          });

          // ------------------------------------------
          // UPDATE CLOCK
          // ------------------------------------------

          currentMinute +=
            allocatedMinutes;

          while (
            currentMinute >= 60
          ) {

            currentHour++;

            currentMinute -= 60;
          }
        }
      );

      // ==========================================
      // DASHBOARD METRICS
      // ==========================================

      

    const completion = null;

const aiScore = null;

const grade = "";

const riskLevel = "";

      // ==========================================
      // AI STRATEGY
      // ==========================================

      const aiPlan = `
Your goal is "${goal}".

Focus more on difficult subjects and maintain daily consistency.

Complete revision sessions before the deadline (${deadline}).

Study for ${dailyHours} hours every day and follow the generated schedule regularly.

Spend more time on hard subjects and practice weak areas frequently.

Short revision sessions and consistency will improve your performance significantly.
`;

      // ==========================================
      // RESPONSE
      // ==========================================

      res.json({

        success: true,

        aiScore,

        completion,

        grade,

        riskLevel,

        weakSubjects,

        dailySchedule,

        aiPlan,
      });

    } catch (error) {

      console.error(
        "SERVER ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        error:
          "Study Plan Generation Failed",
      });
    }
  }
);

// ==========================================
// TEST ROUTE
// ==========================================

app.get(
  "/api/test",
  (req, res) => {

    res.json({

      message:
        "Backend Working Successfully 🚀",
    });
  }
);

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

  res.send(
    "AI Study Planner Backend Running 🚀"
  );
});

// ==========================================
// START SERVER
// ==========================================
// ==========================================
// HEALTH CHECK
// ==========================================

app.get(
  "/health",
  (req, res) => {

    res.json({

      success: true,

      message:
        "Server Healthy 🚀",
    });
  }
);
app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );
});