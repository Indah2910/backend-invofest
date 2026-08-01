import { getPembicara, getPembicaraById, createPembicara, updatePembicara, deletePembicara, } from "../controllers/pembicaraControllers.js";
import express from "express";
const router = express.Router();
router.get("/", getPembicara); //menampilkan data pembicara
router.post("/", createPembicara); //menyimpan data pembicara
router.get("/:id", getPembicaraById); //menampilkan pembicara by id
router.put("/:id", updatePembicara); //mengupdate data pembicara by id
router.delete("/:id", deletePembicara); //menghapus data pembicara by id
export default router;
//# sourceMappingURL=pembicaraRoutes.js.map