import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua kategori
export const getcategory = async (req: Request, res: Response) => {
  try {
    const all = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kategori" });
  }
};

// 2. Menyimpan kategori baru
export const createcategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Nama harus diisi" });
    }
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan kategori" });
  }
};

// 3. Ambil kategori by ID
export const getcategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil kategori" });
  }
};

// 4. Update kategori
export const updatecategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate kategori" });
  }
};

// 5. Hapus kategori
export const deletecategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kategori" });
  }
};