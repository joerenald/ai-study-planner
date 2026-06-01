import React, {
  useEffect,
  useState,
} from "react";
import PomodoroTimer
from "../components/PomodoroTimer";
import axios from "axios";
import ExportPDFButton
from "../components/ExportPDFButton";
import Calendar
from "react-calendar";
import BackButton
from "../components/BackButton";
import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

const PlanDetails = () => {

  const { id } =
    useParams();
const [date, setDate] =
  useState(new Date());
  const [plan, setPlan] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // FETCH PLAN
  // ==========================================

  useEffect(() => {

    fetchPlan();

  }, []);

  const fetchPlan =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/planner/plan/${id}`
          );

        setPlan(
          res.data.planner
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };
const toggleTask =
  async (index) => {

    try {

      const res =
        await axios.put(

          `http://localhost:5000/api/planner/task/${id}/${index}`
        );

      setPlan(
        res.data.planner
      );

    } catch (error) {

      console.log(error);
    }
  };
  const completedTasks =
  plan?.dailySchedule?.filter(
    (task) =>
      task.completed
  ) || [];
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl">

        Loading Plan...

      </div>
    );
  }

  // ==========================================
  // NO PLAN
  // ==========================================

  if (!plan) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl">

        Plan Not Found

      </div>
    );
  }

  return (

    <>
      <Navbar />

      <div
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-indigo-50
        to-purple-100
        p-8 pt-32
      "
      >

        {/* HEADER */}

        <div
          className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          p-8 mb-10
        "
        >

          <div
            className="
            flex flex-col md:flex-row
            justify-between gap-6
          "
          >

            <div>

              <h1
                className="
                text-4xl font-bold
                text-gray-800
              "
              >

                {plan.goal}

              </h1>

              <p className="text-gray-500 mt-2">

                Deadline:
                {" "}
                {plan.deadline}

              </p>

            </div>

            <div>

              <span
                className="
                bg-indigo-100
                text-indigo-700
                px-5 py-2
                rounded-full
                font-medium
              "
              >

                {plan.status}

              </span>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div
          className="
          grid md:grid-cols-2
          lg:grid-cols-4
          gap-6 mb-10
        "
        >

          <StatCard
            title="AI Score"
            value={plan.aiScore}
          />

          <StatCard
            title="Completion"
            value={`${plan.completion}%`}
          />

          <StatCard
            title="Grade"
            value={plan.grade}
          />

          <StatCard
            title="Risk Level"
            value={plan.riskLevel}
          />

        </div>

        {/* SUBJECTS */}

        <div
          className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-xl
          p-8 mb-10
        "
        >

          <h2
            className="
            text-3xl font-bold
            mb-6
          "
          >

            Subjects & Difficulty

          </h2>

          <div className="space-y-4">

            {plan.subjects.map(
              (subject, index) => (

                <div
                  key={index}
                  className="
                  flex justify-between
                  bg-white
                  rounded-2xl
                  p-4 shadow-sm
                "
                >

                  <span className="font-medium">

                    {subject}

                  </span>

                  <span
                    className="
                    text-indigo-600
                    font-semibold
                  "
                  >

                    {
                      plan.difficulty[
                        subject
                      ]
                    }

                  </span>

                </div>
              )
            )}

          </div>

        </div>

        {/* DAILY SCHEDULE */}

        <div
          className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-xl
          p-8 mb-10
        "
        >

          <h2
            className="
            text-3xl font-bold
            mb-6
          "
          >

            Daily Study Schedule

          </h2>

          <div className="space-y-4">

            {plan.dailySchedule.map(
              (item, index) => (

                <div
  key={index}
  className="
  flex justify-between
  items-center
  bg-slate-100
  p-5
  rounded-2xl
"
>

  <div>

    <h3
      className={`
      font-bold text-lg
      ${
        item.completed
          ? "line-through text-gray-400"
          : ""
      }
    `}
    >

      {item.subject}

    </h3>

    <p className="text-gray-500">

      {item.time}

    </p>

  </div>

  <div className="flex items-center gap-4">

    <div
      className="
      text-indigo-600
      font-bold
    "
    >

      {item.duration}

    </div>

    <button
      onClick={() =>
        toggleTask(index)
      }
      className={`
      px-4 py-2
      rounded-xl
      text-white
      font-medium
      ${
        item.completed
          ? "bg-green-500"
          : "bg-indigo-600"
      }
    `}
    >

      {item.completed
        ? "Completed"
        : "Mark Done"}

    </button>

  </div>

</div>
              )
            )}

          </div>

        </div>

        {/* ==========================================
    STUDY CALENDAR
========================================== */}

<div
  className="
  bg-white/70
  backdrop-blur-xl
  rounded-3xl
  p-8
  shadow-xl
  mt-8
"
>

  <h2
    className="
    text-3xl
    font-bold
    mb-6
  "
  >

    📅 Study Calendar

  </h2>

  <div
    className="
    flex flex-col
    lg:flex-row
    gap-10
  "
  >

    {/* CALENDAR */}

    <div className="flex-1">

      <Calendar
        onChange={setDate}
        value={date}
      />

    </div>

    {/* TASK STATUS */}

    <div className="flex-1">

      <h3
        className="
        text-2xl
        font-bold
        mb-4
      "
      >

        Today's Progress

      </h3>

      <div className="space-y-4">

        {plan.dailySchedule.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="
              flex justify-between
              items-center
              bg-slate-100
              p-4
              rounded-2xl
            "
            >

              <div>

                <h4
                  className={`
                  font-semibold
                  ${
                    item.completed
                      ? "line-through text-gray-400"
                      : ""
                  }
                `}
                >

                  {item.subject}

                </h4>

                <p className="text-gray-500">

                  {item.time}

                </p>

              </div>

              <div>

                {item.completed ? (

                  <span
                    className="
                    bg-green-100
                    text-green-600
                    px-3 py-1
                    rounded-full
                    text-sm
                  "
                  >

                    Done

                  </span>

                ) : (

                  <span
                    className="
                    bg-yellow-100
                    text-yellow-600
                    px-3 py-1
                    rounded-full
                    text-sm
                  "
                  >

                    Pending

                  </span>
                )}

              </div>

            </div>
          )
        )}

      </div>

    </div>

  </div>

</div>

{/* ==========================================
    POMODORO TIMER
========================================== */}

<div className="mt-8">

  <PomodoroTimer />

</div>

        {/* WEAK SUBJECTS */}

        <div
          className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-xl
          p-8 mb-10
        "
        >

          <h2
            className="
            text-3xl font-bold
            mb-6
          "
          >

            Weak Subjects

          </h2>

          <div className="flex flex-wrap gap-4">

            {plan.weakSubjects.map(
              (subject, index) => (

                <div
                  key={index}
                  className="
                  bg-red-100
                  text-red-600
                  px-5 py-3
                  rounded-2xl
                  font-medium
                "
                >

                  {subject}

                </div>
              )
            )}

          </div>

        </div>

        {/* AI PLAN */}

        <div
          className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-xl
          p-8
        "
        >

          <h2
            className="
            text-3xl font-bold
            mb-6
          "
          >

            AI Recommendations

          </h2>

          <p
            className="
            text-gray-700
            leading-8
            whitespace-pre-line
          "
          >

            {plan.aiPlan}

          </p>

        </div>
        
<center>
<div
  className="
  flex items-center
  gap-4
  mb-8
  mt-4
"
>
  {/* BACK BUTTON */}

  <BackButton />
  <ExportPDFButton
    plan={plan}
  />
</div>
</center>
      </div>
    </>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({
  title,
  value,
}) => {

  return (

    <div
      className="
      bg-white/70
      backdrop-blur-xl
      rounded-3xl
      shadow-xl
      p-6
    "
    >

      <h2 className="text-gray-500 mb-2">

        {title}

      </h2>

      <p
        className="
        text-4xl font-bold
        text-indigo-600
      "
      >

        {value}

      </p>
      

    </div>

    
  );
};

export default PlanDetails;