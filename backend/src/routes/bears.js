import express from "express";
import { getBears } from "../services/bears.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bears = await getBears(req.query);
    res.json({ bears });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
