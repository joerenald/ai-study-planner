import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-study-planner-backend-jr7f.onrender.com"
});

export const generatePlan = (data) =>
    API.post("/api/generate-plan", data);