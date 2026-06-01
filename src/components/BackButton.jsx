import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const BackButton = () => {

  const navigate = useNavigate();

  return (

    <motion.button

      whileHover={{
        scale: 1.05,
        x: -3,
      }}

      whileTap={{
        scale: 0.95,
      }}

      onClick={() => navigate(-1)}

      className="
        flex items-center gap-3
        px-6 py-3
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        to-purple-600
        text-white
        font-semibold
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >

      <FaArrowLeft className="text-sm" />

      Back

    </motion.button>
  );
};

export default BackButton;