import { Request, Response } from "express";
import { Event } from "../types/event.js";
import { prisma } from "../lib/db.js";

let events: Event[] = [];


// dalam event controller bisa:
//1. menampilkan data event
export const getEvents = async (req:Request, res:Response) => {
    const AllEvent = await prisma.event.findMay({
        orderBy: {
            createAt: "desc",
        },
    });

    res.json(AllEvent);
};

//2. menyimpan data event
export const createEvent = (req:Request, res:Response) => {
    const { name, category, tanggal, description } = req.body;

    //validasi jika name, kategori, tanggal kosong
    if (!name || !category || !tanggal) {
        return res.status(500).json({
            message: "nama harus diisi",
        });
    }

    //mapping datanya
    const newEvent: Event = {
        id: Date.now(),
        name: name,
        category: category,
        tanggal: tanggal,
        description: description,   
    };

    //simpan datanya, nanti akan diganti sql
    events.push(newEvent);

    //jika berhasil disimpan
    res.status(201).json(newEvent);
};

//3.mengambil data even berdasarkan id
export const getEventById = (req:Request, res:Response) => {
    const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);

    //jika data tidak ada
    if (!event) { 
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    //jika ada
    res.json(event);
};

//4.mengupdate data berdasarkan id
export const updateEvent = (req:Request, res:Response) => {};

//5.menghapus data event berdasarkan id
export const deleteEvent = (req:Request, res:Response) => {};
