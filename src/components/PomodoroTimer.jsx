import React,
{
  useEffect,
  useState,
} from "react";

import {
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa";

const PomodoroTimer = () => {

  // ==========================================
  // STATES
  // ==========================================

  const [minutes, setMinutes] =
    useState(25);

  const [seconds, setSeconds] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isBreak, setIsBreak] =
    useState(false);

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        if (seconds > 0) {

          setSeconds(
            seconds - 1
          );

        } else {

          if (minutes === 0) {

            // SWITCH MODE

            if (isBreak) {

              setMinutes(25);

            } else {

              setMinutes(5);
            }

            setIsBreak(
              !isBreak
            );

          } else {

            setMinutes(
              minutes - 1
            );

            setSeconds(59);
          }
        }

      }, 1000);
    }

    return () =>
      clearInterval(timer);

  }, [
    isRunning,
    seconds,
    minutes,
    isBreak,
  ]);

  // ==========================================
  // FUNCTIONS
  // ==========================================

  const startTimer = () => {

    setIsRunning(true);
  };

  const pauseTimer = () => {

    setIsRunning(false);
  };

  const resetTimer = () => {

    setIsRunning(false);

    setMinutes(25);

    setSeconds(0);

    setIsBreak(false);
  };

  return (

    <div
      className="
      bg-white/70
      backdrop-blur-xl
      rounded-3xl
      shadow-2xl
      p-8
      border border-white/30
    "
    >

      {/* TITLE */}

      <h2
        className="
        text-3xl
        font-bold
        text-gray-800
        mb-6
      "
      >

        ⏱️ Pomodoro Timer

      </h2>

      {/* MODE */}

      <div
        className={`
        inline-block
        px-5 py-2
        rounded-full
        text-sm font-medium
        mb-6
        ${
          isBreak
            ? "bg-green-100 text-green-600"
            : "bg-indigo-100 text-indigo-600"
        }
      `}
      >

        {isBreak
          ? "Break Time ☕"
          : "Focus Session 📚"}

      </div>

      {/* TIMER */}

      <div
        className="
        flex items-center
        justify-center
        mb-8
      "
      >

        <div
          className="
          w-60 h-60
          rounded-full
          bg-gradient-to-r
          from-indigo-500
          to-purple-500
          flex items-center
          justify-center
          shadow-2xl
        "
        >

          <div
            className="
            w-52 h-52
            rounded-full
            bg-white
            flex items-center
            justify-center
            text-6xl
            font-bold
            text-gray-800
          "
          >

            {String(minutes)
              .padStart(2, "0")}
            :
            {String(seconds)
              .padStart(2, "0")}

          </div>

        </div>

      </div>

      {/* CONTROLS */}

      <div
        className="
        flex justify-center
        gap-5
      "
      >

        {!isRunning ? (

          <button
            onClick={startTimer}
            className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-6 py-3
            rounded-2xl
            flex items-center
            gap-2
            font-medium
          "
          >

            <FaPlay />

            Start

          </button>

        ) : (

          <button
            onClick={pauseTimer}
            className="
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            px-6 py-3
            rounded-2xl
            flex items-center
            gap-2
            font-medium
          "
          >

            <FaPause />

            Pause

          </button>
        )}

        <button
          onClick={resetTimer}
          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-6 py-3
          rounded-2xl
          flex items-center
          gap-2
          font-medium
        "
        >

          <FaRedo />

          Reset

        </button>

      </div>

    </div>
  );
};

export default PomodoroTimer;