import { getcategory, createcategory, getcategoryById, updatecategory, deletecategory, } from "../controllers/categoryControllers.js";
import express from "express";
const router = express.Router();
router.get("/", getcategory); //menampilkan data categori
router.post("/", createcategory); //menyimpan data categori
router.get("/:id", getcategoryById); //menampilkan categori by  id
router.put("/:id", updatecategory); //mengupdate data categori by id
router.delete("/:id", deletecategory); //menghapus data categori by id
export default router;
//# sourceMappingURL=categoryRoute.js.map