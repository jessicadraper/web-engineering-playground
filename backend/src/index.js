import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/bears.js";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Real routes
app.use("/api/bears", router);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
