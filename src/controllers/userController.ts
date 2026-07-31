import { Request, Response } from "express";
import { prisma } from "../lib/db.js"

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    });
    return res.status(200).json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params["id"];
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: { id: true, name: true, email: true, createdAt: true }
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    return res.status(200).json(user);
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params["id"];
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await prisma.user.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "User berhasil dihapus" });
}

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params["id"];
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const { name, email, password } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Nama dan email harus diisi" });

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // hash password baru kalau diisi
    let hashedPassword = user.password;
    if (password && password.trim() !== "") {
        const bcrypt = await import("bcrypt");
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, password: hashedPassword }
    });

    return res.status(200).json({ message: "User berhasil diupdate", user: updatedUser });
}