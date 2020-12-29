import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  updateDinosaur,
} from "../controller/dinosaurs.ts";

const router = new Router();

// Get all dinosaurs
router.get("/api/v1/dinosaurs", getDinosaurs);

// Get one dinosaur by identifier
router.get("/api/v1/dinosaurs/:id", getDinosaur);

// Add one dinosaur.
router.post("/api/v1/dinosaurs", addDinosaur);

// Update one dinosaur.
router.put("/api/v1/dinosaurs/:id", updateDinosaur);

// Delete one dinosaur.
router.delete("/api/v1/dinosaurs/:id", deleteDinosaur);

export default router;
