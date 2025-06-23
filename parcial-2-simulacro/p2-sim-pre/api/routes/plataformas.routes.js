import express from "express";
import plataformaService from "../services/plataformaService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const plataformas = await plataformaService.obtenerTodas();
    res.json(plataformas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

