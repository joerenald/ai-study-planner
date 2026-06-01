import React,
{
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar
from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  useAuth,
} from "../context/AuthContext";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import {
  FaFire,
  FaChartLine,
  FaBrain,
  FaShieldAlt,
  FaTrash,
  FaBookOpen,
} from "react-icons/fa";

const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#f59e0b",
];

const UserDashboard = () => {
useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  const { user } =
    useAuth();
const navigate = useNavigate();
  const [plans, setPlans] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // FETCH USER PLANS
  // ==========================================

  useEffect(() => {

    if (user?.uid) {

      fetchPlans();
    }

  }, [user]);

  const fetchPlans =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/planner/user/${user.uid}`
          );

        setPlans(
          res.data.planners
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ==========================================
  // DELETE PLAN
  // ==========================================

  const deletePlan =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/planner/delete/${id}`
        );

        setPlans(

          plans.filter(
            (plan) =>
              plan._id !== id
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  // ==========================================
  // GLOBAL ANALYTICS
  // ==========================================

  const totalPlans =
    plans.length;

  const avgScore =
    totalPlans > 0
      ? Math.floor(

          plans.reduce(
            (acc, plan) =>
              acc +
              plan.aiScore,
            0
          ) / totalPlans
        )
      : 0;

  const completedPlans =
    plans.filter(

      (plan) =>
        plan.status ===
        "Completed"

    ).length;

  const totalWeakSubjects =
    plans.reduce(

      (acc, plan) =>

        acc +
        plan.weakSubjects.length,

      0
    );

  // ==========================================
  // CHART DATA
  // ==========================================

  const difficultyData = [

    {
      name: "Easy",

      value:
        plans.reduce(

          (acc, plan) =>

            acc +

            Object.values(
              plan.difficulty || {}
            ).filter(
              (d) =>
                d === "Easy"
            ).length,

          0
        ),
    },

    {
      name: "Medium",

      value:
        plans.reduce(

          (acc, plan) =>

            acc +

            Object.values(
              plan.difficulty || {}
            ).filter(
              (d) =>
                d === "Medium"
            ).length,

          0
        ),
    },

    {
      name: "Hard",

      value:
        plans.reduce(

          (acc, plan) =>

            acc +

            Object.values(
              plan.difficulty || {}
            ).filter(
              (d) =>
                d === "Hard"
            ).length,

          0
        ),
    },
  ];

  const studyData =
    plans.flatMap(

      (plan) =>

        plan.dailySchedule.map(
          (item) => ({

            subject:
              item.subject,

            minutes:
              parseInt(
                item.duration
              ),
          })
        )
    );

  const progressData = [

    {
      day: "Mon",
      score: 65,
    },

    {
      day: "Tue",
      score: 72,
    },

    {
      day: "Wed",
      score: 78,
    },

    {
      day: "Thu",
      score: 84,
    },

    {
      day: "Fri",
      score: 91,
    },
  ];

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

        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div
          className="
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          p-8 mb-10
          border border-white/40
        "
        >

          <div
            className="
            flex flex-col md:flex-row
            items-center gap-6
          "
          >

            <img
              src={
                user?.photoURL
              }
              alt="profile"
              className="
              w-28 h-28
              rounded-full
              border-4 border-indigo-500
              shadow-xl
            "
            />

            <div>

              <h1
                className="
                text-4xl font-bold
                text-gray-800
              "
              >

                {
                  user?.displayName
                }

              </h1>

              <p
                className="
                text-gray-500 mt-2
              "
              >

                {
                  user?.email
                }

              </p>

              <p
                className="
                text-sm text-indigo-600
                mt-2 font-medium
              "
              >

                Personalized AI
                Study Dashboard

              </p>

            </div>

          </div>

        </div>

        {/* ==========================================
            METRICS
        ========================================== */}

        <div
          className="
          grid md:grid-cols-2
          lg:grid-cols-4
          gap-6 mb-10
        "
        >

          <MetricCard
            icon={<FaBrain />}
            title="Average AI Score"
            value={avgScore}
            color="text-indigo-600"
          />

          <MetricCard
            icon={<FaChartLine />}
            title="Total Plans"
            value={totalPlans}
            color="text-green-600"
          />

          <MetricCard
            icon={<FaShieldAlt />}
            title="Completed Plans"
            value={completedPlans}
            color="text-blue-600"
          />

          <MetricCard
            icon={<FaFire />}
            title="Weak Subjects"
            value={totalWeakSubjects}
            color="text-red-500"
          />

        </div>

        {/* ==========================================
            CHARTS
        ========================================== */}

        <div
          className="
          grid lg:grid-cols-3
          gap-8 mb-14
        "
        >

          {/* PIE CHART */}

          <div
            className="
            bg-white/70
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            p-6
          "
          >

            <h2
              className="
              text-2xl font-bold mb-6
            "
            >

              Subject Difficulty

            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={difficultyData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >

                    {difficultyData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                              COLORS.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR CHART */}

          <div
            className="
            bg-white/70
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            p-6
          "
          >

            <h2
              className="
              text-2xl font-bold mb-6
            "
            >

              Study Minutes

            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <BarChart
                  data={studyData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="subject"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="minutes"
                    fill="#6366f1"
                    radius={[
                      10,
                      10,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* LINE CHART */}

          <div
            className="
            bg-white/70
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            p-6
          "
          >

            <h2
              className="
              text-2xl font-bold mb-6
            "
            >

              Weekly Progress

            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <LineChart
                  data={progressData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="day"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* ==========================================
            USER PLANS
        ========================================== */}

        <div>

          <h2
            className="
            text-4xl font-bold
            text-gray-800
            mb-8
          "
          >

            📚 My Created Plans

          </h2>

          {loading ? (

            <div className="text-xl">

              Loading plans...

            </div>

          ) : plans.length === 0 ? (

            <div
              className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-10
              shadow-xl
            "
            >

              <h2 className="text-2xl font-bold">

                No Plans Found

              </h2>

              <p className="text-gray-500 mt-2">

                Create your first AI study plan 🚀

              </p>

            </div>

          ) : (

            <div
              className="
              grid md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
            >

              {plans.map((plan) => (

                <div
                  key={plan._id}
                  className="
                  bg-white/70
                  backdrop-blur-xl
                  rounded-3xl
                  shadow-2xl
                  p-6
                  border border-white/30
                  hover:scale-[1.02]
                  transition
                "
                >

                  <div
                    className="
                    flex justify-between
                    items-start mb-5
                  "
                  >

                    <div>

                      <h2
                        className="
                        text-2xl font-bold
                        text-gray-800
                      "
                      >

                        {plan.goal}

                      </h2>

                      <p className="text-gray-500">

                        Deadline:
                        {" "}
                        {plan.deadline}

                      </p>

                    </div>

                    <span
                      className="
                      bg-indigo-100
                      text-indigo-700
                      px-3 py-1
                      rounded-full
                      text-sm
                    "
                    >

                      {plan.status}

                    </span>

                  </div>

                  <div className="space-y-3">

                    <p>

                      📘 Subjects:
                      {" "}
                      {plan.subjects.length}

                    </p>

                    <p>

                      ⚠ Weak Subjects:
                      {" "}
                      {plan.weakSubjects.length}

                    </p>

                    <p>

                      🤖 AI Score:
                      {" "}
                      {plan.aiScore}

                    </p>

                    <p>

                      📈 Completion:
                      {" "}
                      {plan.completion}%

                    </p>

                  </div>

                  {/* PROGRESS BAR */}

                  <div className="mt-5">

                    <div
                      className="
                      w-full h-3
                      bg-gray-200
                      rounded-full
                    "
                    >

                      <div
                        className="
                        h-3 rounded-full
                        bg-gradient-to-r
                        from-indigo-500
                        to-purple-500
                      "
                        style={{
                          width:
                            `${plan.completion}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-3 mt-6">

                    <button
  onClick={() =>
    navigate(`/plan/${plan._id}`)
  }

  className="
  flex-1
  bg-indigo-600
  hover:bg-indigo-700
  text-white
  py-3
  rounded-2xl
  font-medium
  flex items-center
  justify-center gap-2
"
>

  <FaBookOpen />

  Open Plan

</button>
                    <button
                      onClick={() =>
                        deletePlan(
                          plan._id
                        )
                      }
                      className="
                      flex-1
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-3
                      rounded-2xl
                      font-medium
                      flex items-center
                      justify-center gap-2
                    "
                    >

                      <FaTrash />

                      Delete

                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
};

// ==========================================
// METRIC CARD
// ==========================================

const MetricCard = ({
  icon,
  title,
  value,
  color,
}) => {

  return (

    <div
      className="
      bg-white/70
      backdrop-blur-xl
      rounded-3xl
      shadow-xl
      p-6
      hover:scale-105
      transition
    "
    >

      <div
        className={`
        text-3xl mb-4 ${color}
      `}
      >

        {icon}

      </div>

      <h2
        className="
        text-gray-500
        text-sm mb-2
      "
      >

        {title}

      </h2>

      <p
        className={`
        text-4xl font-bold ${color}
      `}
      >

        {value}

      </p>

    </div>
  );
};

export default UserDashboard;