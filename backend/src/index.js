import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/bears.js";

dotenv.config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const NODE_ENV = process.env.NODE_ENV || "development";

// Dynamic CORS settings to allow only frontend
const corsSettings = {
  origin: FRONTEND_URL,
  methods: ["GET"],
};

app.use(cors(corsSettings));
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: NODE_ENV });
});

// Real routes
app.use("/api/bears", router);

app.listen(PORT, () => {
  console.log(
    `Backend running at http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
