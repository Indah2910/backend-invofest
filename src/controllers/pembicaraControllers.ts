import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara.js";

let pembicara : Pembicara[] = [];

// dalam speaker controller bisa:
//1. menampilkan data speaker
export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
};    

//2. menyimpan data speaker
export const createPembicara = (req: Request, res: Response) => {
    const { name, role } = req.body; 

    //validasi jika name, role kosong
     if (!name || !role) {
        return res.status(500).json({
            message: "nama harus diisi",
        });
    }

    //mapping datanya
    const newPembicara: Pembicara = {
        id: Date.now(),
        name: name,
        role: role,
    };

    //simpan datanya, nanti akan diganti sql
    pembicara.push(newPembicara);

    //jika berhasil disimpan
    res.status(201).json(newPembicara);
};

//3.mengambil data pembicara berdasarkan id
export const getPembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicaraItem = pembicara.find((p) => p.id === id);

    //jika data tidak ada
    if (!pembicaraItem) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    res.json(pembicaraItem);
};

//4.mengupdate data berdasarkan id
export const updatePembicara = (req:Request, res:Response) => {};

//5.menghapus data pembicara berdasarkan id
export const deletePembicara = (req:Request, res:Response) => {};

