import express from "express";
import juegoService from "../services/juegoService.js";

const router = express.Router();

// CRUD
router.get("/", async (req, res) => {
  try {
    const { pagina, limite } = req.query;
    const juegos = await juegoService.obtenerTodos({ pagina, limite });
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const juegoCreado = await juegoService.crear(req.body);
    res.status(201).json(juegoCreado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const juegoActualizado = await juegoService.actualizar(parseInt(req.params.id), req.body);
    res.json(juegoActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await juegoService.eliminar(parseInt(req.params.id));
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Top 10
router.get("/top/ultimos", async (req, res) => {
  try {
    const juegos = await juegoService.getUltimosEstrenos();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/top/populares", async (req, res) => {
  try {
    const juegos = await juegoService.getMasPopulares();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filtrado
router.get("/filtrar", async (req, res) => {
  try {
    const juegos = await juegoService.buscarFiltrado(req.query);
    res.json(juegos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/filtrar/contar", async (req, res) => {
  try {
    const cantidad = await juegoService.contarFiltrado(req.query);
    res.json({ cantidad });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const juego = await juegoService.obtenerPorId(parseInt(req.params.id));
    if (!juego) return res.status(404).json({ error: "Juego no encontrado." });
    res.json(juego);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

