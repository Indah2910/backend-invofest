import { prisma } from "../lib/db.js";
// 1. Menampilkan semua pembicara
export const getPembicara = async (req, res) => {
    try {
        const all = await prisma.pembicara.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(all);
    }
    catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pembicara" });
    }
};
// 2. Menyimpan pembicara baru
export const createPembicara = async (req, res) => {
    try {
        const { name, role, image } = req.body;
        if (!name || !role) {
            return res.status(400).json({ message: "Nama dan role wajib diisi" });
        }
        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                role,
                image: image || "",
            },
        });
        res.status(201).json(newPembicara);
    }
    catch (error) {
        res.status(500).json({ message: "Gagal menyimpan pembicara" });
    }
};
// 3. Ambil pembicara by ID
export const getPembicaraById = async (req, res) => {
    try {
        const { id } = req.params;
        const pembicara = await prisma.pembicara.findUnique({
            where: { id: Number(id) },
        });
        if (!pembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }
        res.json(pembicara);
    }
    catch (error) {
        res.status(500).json({ message: "Gagal mengambil pembicara" });
    }
};
// 4. Update pembicara
export const updatePembicara = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, image } = req.body;
        const updated = await prisma.pembicara.update({
            where: { id: Number(id) },
            data: { name, role, image: image || "" },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Gagal mengupdate pembicara" });
    }
};
// 5. Hapus pembicara
export const deletePembicara = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.pembicara.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Pembicara berhasil dihapus" });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal menghapus pembicara" });
    }
};
//# sourceMappingURL=pembicaraControllers.js.map