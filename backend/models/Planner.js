import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER INFO
    // ==========================================

    uid: {
      type: String,
      required: true,
      index: true,
    },

    // ==========================================
    // PLAN DETAILS
    // ==========================================

    title: {
      type: String,
      default: "My Study Plan",
      trim: true,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    // ==========================================
    // SUBJECTS
    // ==========================================

    subjects: {
      type: [String],
      default: [],
    },

    difficulty: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    weakSubjects: {
      type: [String],
      default: [],
    },

    // ==========================================
    // STUDY PREFERENCES
    // ==========================================

    dailyHours: {
      type: Number,
      default: 2,
      min: 1,
      max: 24,
    },

    preferredStudyTime: {
      type: String,

      enum: [
        "Morning",
        "Afternoon",
        "Night",
      ],

      default: "Morning",
    },

    // ==========================================
    // DAILY SCHEDULE
    // ==========================================

    dailySchedule: [
      {
        time: {
          type: String,
          default: "",
        },

        subject: {
          type: String,
          default: "",
        },

        duration: {
          type: String,
          default: "",
        },

        difficulty: {
          type: String,
          default: "Medium",
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // ==========================================
    // AI GENERATED DATA
    // ==========================================

    aiPlan: {
      type: String,
      default: "",
    },

    aiScore: {
      type: Number,
      default: null,
    },

    completion: {
      type: Number,
      default: null,
    },

    grade: {
  type: String,

  enum: [
    "",
    "A+",
    "A",
    "B",
    "C",
    "D",
  ],

  default: "",
},

riskLevel: {
  type: String,

  enum: [
    "",
    "Low",
    "Medium",
    "High",
  ],

  default: "",
},

    // ==========================================
    // STREAK SYSTEM
    // ==========================================

    currentStreak: {
      type: Number,
      default: 1,
    },

    longestStreak: {
      type: Number,
      default: 1,
    },

    // ==========================================
    // PLAN STATUS
    // ==========================================

    status: {
      type: String,

      enum: [
        "Not Started",
        "In Progress",
        "Completed",
      ],

      default: "Not Started",
    },

    // ==========================================
    // OPTIONAL FUTURE FEATURES
    // ==========================================

    totalStudyMinutes: {
      type: Number,
      default: 0,
    },

    completedTasks: {
      type: Number,
      default: 0,
    },

    lastStudiedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Planner",
  plannerSchema
);