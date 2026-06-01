import React from "react";

import jsPDF
from "jspdf";

const ExportPDFButton = ({
  plan,
}) => {

  // ==========================================
  // EXPORT PDF
  // ==========================================

  const exportPDF = () => {

    const doc =
      new jsPDF();

    let y = 20;

    // ==========================================
    // TITLE
    // ==========================================

    doc.setFontSize(22);

    doc.text(
      "AI Study Planner",
      20,
      y
    );

    y += 15;

    // ==========================================
    // BASIC INFO
    // ==========================================

    doc.setFontSize(14);

    doc.text(
      `Goal: ${plan.goal}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Deadline: ${plan.deadline}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `AI Score: ${plan.aiScore}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Completion: ${plan.completion}%`,
      20,
      y
    );

    y += 15;

    // ==========================================
    // SUBJECTS
    // ==========================================

    doc.setFontSize(18);

    doc.text(
      "Subjects",
      20,
      y
    );

    y += 10;

    doc.setFontSize(12);

    plan.subjects.forEach(
      (subject) => {

        doc.text(
          `• ${subject}`,
          25,
          y
        );

        y += 8;
      }
    );

    y += 10;

    // ==========================================
    // DAILY SCHEDULE
    // ==========================================

    doc.setFontSize(18);

    doc.text(
      "Daily Schedule",
      20,
      y
    );

    y += 12;

    doc.setFontSize(12);

    plan.dailySchedule.forEach(
      (task) => {

        doc.text(

          `${task.time} - ${task.subject} (${task.duration})`,

          25,

          y
        );

        y += 8;

        // NEW PAGE

        if (y > 270) {

          doc.addPage();

          y = 20;
        }
      }
    );

    y += 10;

    // ==========================================
    // AI STRATEGY
    // ==========================================

    doc.setFontSize(18);

    doc.text(
      "AI Strategy",
      20,
      y
    );

    y += 12;

    doc.setFontSize(12);

    const splitText =
      doc.splitTextToSize(
        plan.aiPlan,
        170
      );

    doc.text(
      splitText,
      20,
      y
    );

    // ==========================================
    // SAVE
    // ==========================================

    doc.save(
      "AI_Study_Plan.pdf"
    );
  };

  return (

    <button
      onClick={exportPDF}
      className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-6 py-3
      rounded-2xl
      font-medium
      shadow-lg
      transition
    "
    >

      📄 Export PDF

    </button>
  );
};

export default ExportPDFButton;