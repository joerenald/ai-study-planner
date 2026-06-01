import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  useAuth,
} from "./AuthContext";

// ==========================================
// CONTEXT
// ==========================================

const PlannerContext =
  createContext();

// ==========================================
// PROVIDER
// ==========================================

export const PlannerProvider = ({
  children,
}) => {

  const { user } =
    useAuth();

  // ==========================================
  // INITIAL STATE
  // ==========================================

  const [plannerData,
    setPlannerData] =
    useState({

      goal: "",

      deadline: "",

      subjects: [],

      difficulty: {},

      dailyHours: 2,

      preferredStudyTime:
        "Morning",

      aiPlan: "",

      weakSubjects: [],

      dailySchedule: [],

      currentStreak: 1,

      longestStreak: 1,

      aiScore: null,

      completion: null,

      grade: "",

      riskLevel: "",
    });

  // ==========================================
  // FETCH USER PLANNER
  // ==========================================

  useEffect(() => {

    const fetchPlanner =
      async () => {

        if (!user?.uid) return;

        try {

          const res =
            await axios.get(

              `http://localhost:5000/api/planner/${user.uid}`
            );

          if (
            res.data.planner
          ) {

            setPlannerData(
              res.data.planner
            );
          }

        } catch (error) {

          console.error(
            "Planner Fetch Error:",
            error
          );
        }
      };

    fetchPlanner();

  }, [user]);

  // ==========================================
  // UPDATE PLANNER
  // ==========================================

  const updatePlanner =
    (newData) => {

      setPlannerData(
        (prev) => ({

          ...prev,

          ...newData,
        })
      );
    };

  // ==========================================
  // GENERATE AI PLAN
  // ==========================================

  const generateAIPlan =
    async () => {

      try {

        const res =
          await axios.post(

            "http://localhost:5000/api/generate-plan",

            {

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
            }
          );

        const aiData =
          res.data;

        // ==========================================
        // UPDATE STATE
        // ==========================================

        setPlannerData(
          (prev) => ({

            ...prev,

            aiPlan:
              aiData.aiPlan,

            weakSubjects:
              aiData.weakSubjects,

            dailySchedule:
              aiData.dailySchedule,

            aiScore:
              aiData.aiScore,

            completion:
              aiData.completion,

            grade:
              aiData.grade,

            riskLevel:
              aiData.riskLevel,
          })
        );

        return aiData;

      } catch (error) {

        console.error(
          "AI PLAN ERROR:",
          error
        );

        return null;
      }
    };

  // ==========================================
  // PROVIDER VALUE
  // ==========================================

  return (

    <PlannerContext.Provider
      value={{

        plannerData,

        setPlannerData,

        updatePlanner,

        generateAIPlan,
      }}
    >

      {children}

    </PlannerContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const usePlanner =
  () => useContext(
    PlannerContext
  );