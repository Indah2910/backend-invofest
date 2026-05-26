import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua event
export const getEvents = async (req: Request, res: Response) => {
  try {
    const all = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data event" });
  }
};

// 2. Menyimpan event baru
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, dateEvent, location, description, categoryId } = req.body;
    if (!name || !dateEvent) {
      return res.status(400).json({ message: "Nama dan tanggal wajib diisi" });
    }
    const newEvent = await prisma.event.create({
      data: {
        name,
        dateEvent: new Date(dateEvent),
        location: location || "",
        description: description || "",
        categoryId: String(categoryId || "1"),
      },
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menyimpan event" });
  }
};

// 3. Ambil event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil event" });
  }
};

// 4. Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, dateEvent, location, description, categoryId } = req.body;
    const updated = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        name,
        dateEvent: new Date(dateEvent),
        location: location || "",
        description: description || "",
        categoryId: categoryId || 1,
      },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate event" });
  }
};

// 5. Hapus event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Event berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus event" });
  }
};