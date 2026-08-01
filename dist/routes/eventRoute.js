import { getEvents, createEvent, getEventById, updateEvent, deleteEvent, } from "../controllers/eventControllers.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", authMiddleware, getEvents); //menampilkan data event
router.post("/", authMiddleware, createEvent); //menyimpan data event
router.get("/:id", authMiddleware, getEventById); //menampilkan event by  id
router.put("/:id", authMiddleware, updateEvent); //mengupdate data event by id
router.delete("/:id", authMiddleware, deleteEvent); //menghapus data event by id
export default router;
//# sourceMappingURL=eventRoute.js.map