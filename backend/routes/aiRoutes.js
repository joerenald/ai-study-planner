import express from "express";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const router =
  express.Router();

// ==========================================
// GEMINI CONFIG
// ==========================================

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

// ==========================================
// AI CHAT ROUTE
// ==========================================

router.post(
  "/chat",

  async (req, res) => {

    try {

      const {
        message,
      } = req.body;

      const prompt = `

You are an AI Study Mentor.

Your role:
- Help students study better
- Give productivity tips
- Explain concepts simply
- Motivate students
- Give exam strategies
- Be friendly and supportive

Student Question:
${message}

`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      res.json({

        success: true,

        reply: response,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "AI Chat Failed",
      });
    }
  }
);

export default router;