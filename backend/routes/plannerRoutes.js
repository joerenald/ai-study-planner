import express
from "express";

import Planner
from "../models/Planner.js";

const router =
  express.Router();


// ==========================================
// CREATE NEW PLAN
// ==========================================

router.post(
  "/save",

  async (req, res) => {

    try {

      const planner =
        await Planner.create(
          req.body
        );

      res.json({

        success: true,

        planner,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Planner Save Failed",
      });
    }
  }
);


// ==========================================
// GET ALL USER PLANS
// ==========================================

router.get(
  "/user/:uid",

  async (req, res) => {

    try {

      const planners =
        await Planner.find({

          uid:
            req.params.uid,

        }).sort({
          createdAt: -1,
        });

      res.json({

        success: true,

        planners,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Fetch Failed",
      });
    }
  }
);


// ==========================================
// GET SINGLE PLAN
// ==========================================

router.get(
  "/plan/:id",

  async (req, res) => {

    try {

      const planner =
        await Planner.findById(
          req.params.id
        );

      res.json({

        success: true,

        planner,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch plan",
      });
    }
  }
);


// ==========================================
// UPDATE PLAN STATUS
// ==========================================

router.put(
  "/update/:id",

  async (req, res) => {

    try {

      const updated =
        await Planner.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      res.json({

        success: true,

        planner: updated,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Update Failed",
      });
    }
  }
);

router.put(
  "/task/:planId/:taskIndex",

  async (req, res) => {

    try {

      const {
        planId,
        taskIndex,
      } = req.params;

      const planner =
        await Planner.findById(
          planId
        );

      if (!planner) {

        return res.status(404).json({

          success: false,

          message:
            "Plan not found",
        });
      }

      // ==========================================
      // TOGGLE TASK
      // ==========================================

      planner.dailySchedule[
        taskIndex
      ].completed =
        !planner.dailySchedule[
          taskIndex
        ].completed;

      // ==========================================
      // COMPLETION %
      // ==========================================

      const completedTasks =
        planner.dailySchedule.filter(
          (task) =>
            task.completed
        ).length;

      const totalTasks =
        planner.dailySchedule.length;

      planner.completion =
        Math.floor(
          (completedTasks /
            totalTasks) * 100
        );

      // ==========================================
      // STATUS
      // ==========================================

      if (
        planner.completion === 100
      ) {

        planner.status =
          "Completed";

      } else if (
        planner.completion > 0
      ) {

        planner.status =
          "In Progress";

      } else {

        planner.status =
          "Not Started";
      }

      // ==========================================
      // AI SCORE
      // ==========================================

      planner.aiScore =
        100 - (
          (totalTasks -
            completedTasks) * 10
        );

      if (
        planner.aiScore < 50
      ) {

        planner.aiScore = 50;
      }

      // ==========================================
      // GRADE
      // ==========================================

      if (
        planner.aiScore >= 90
      ) {

        planner.grade = "A+";

      } else if (
        planner.aiScore >= 80
      ) {

        planner.grade = "A";

      } else if (
        planner.aiScore >= 70
      ) {

        planner.grade = "B";

      } else if (
        planner.aiScore >= 60
      ) {

        planner.grade = "C";

      } else {

        planner.grade = "D";
      }

      // ==========================================
      // RISK LEVEL
      // ==========================================

      const incompleteTasks =
        totalTasks -
        completedTasks;

      if (
        incompleteTasks >= 3
      ) {

        planner.riskLevel =
          "High";

      } else if (
        incompleteTasks >= 1
      ) {

        planner.riskLevel =
          "Medium";

      } else {

        planner.riskLevel =
          "Low";
      }

      // ==========================================
      // STREAK SYSTEM
      // ==========================================

      if (
        planner.dailySchedule[
          taskIndex
        ].completed
      ) {

        planner.currentStreak += 1;

        if (
          planner.currentStreak >
          planner.longestStreak
        ) {

          planner.longestStreak =
            planner.currentStreak;
        }

      } else {

        planner.currentStreak -= 1;

        if (
          planner.currentStreak < 1
        ) {

          planner.currentStreak = 1;
        }
      }

      // ==========================================
      // SAVE
      // ==========================================

      await planner.save();

      res.json({

        success: true,

        planner,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Task Update Failed",
      });
    }
  }
);
// ==========================================
// TOGGLE TASK COMPLETION
// ==========================================

router.put(
  "/task/:planId/:taskIndex",

  async (req, res) => {

    try {

      const {
        planId,
        taskIndex,
      } = req.params;

      const planner =
        await Planner.findById(
          planId
        );

      if (!planner) {

        return res.status(404).json({

          success: false,

          message:
            "Plan not found",
        });
      }

      // TOGGLE COMPLETED

      planner.dailySchedule[
        taskIndex
      ].completed =
        !planner.dailySchedule[
          taskIndex
        ].completed;

      // ==========================================
      // RECALCULATE COMPLETION
      // ==========================================

      const completedTasks =
        planner.dailySchedule.filter(
          (task) =>
            task.completed
        ).length;

      planner.completion =
        Math.floor(
          (completedTasks /
            planner.dailySchedule.length) *
            100
        );

      // ==========================================
      // UPDATE STATUS
      // ==========================================

      // ==========================================
// STATUS
// ==========================================

if (
  planner.completion === 100
) {

  planner.status =
    "Completed";

} else if (
  planner.completion > 0
) {

  planner.status =
    "In Progress";
}

// ==========================================
// STREAK SYSTEM
// ==========================================

if (
  planner.dailySchedule[
    taskIndex
  ].completed
) {

  planner.currentStreak += 1;

  // UPDATE LONGEST STREAK

  if (
    planner.currentStreak >
    planner.longestStreak
  ) {

    planner.longestStreak =
      planner.currentStreak;
  }

} else {

  // UNCHECK TASK

  planner.currentStreak -= 1;

  if (
    planner.currentStreak < 1
  ) {

    planner.currentStreak = 1;
  }
}
      await planner.save();

      res.json({

        success: true,

        planner,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Task Update Failed",
      });
    }
  }
);

// ==========================================
// DELETE PLAN
// ==========================================

router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await Planner.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message:
          "Plan Deleted",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Delete Failed",
      });
    }
  }
);

export default router;