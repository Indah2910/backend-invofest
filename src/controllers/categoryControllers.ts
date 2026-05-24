import { Request, Response } from "express";
import { Category } from "../types/category.js";
import { prisma } from "../lib/db.js";

let categories: Category[] = [];


// dalam categori controller bisa:
//1. menampilkan data categori
export const getcategory = async (req:Request, res:Response) => {
    const all = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });
    res.json(categories);
};

//2. menyimpan data categori
export const createcategory = (req:Request, res:Response) => {
    const { name } = req.body;
    
        //validasi jika name, kategori, tanggal kosong
        if (!name ) {
            return res.status(500).json({
                message: "nama harus diisi",
            });
        }
    
        //mapping datanya
        const newCategory: Category = {
            id: Date.now(),
            name: name,   
        };
    
        //simpan datanya, nanti akan diganti sql
        categories.push(newCategory);
    
        //jika berhasil disimpan
        res.status(201).json(newCategory);
};

//3.mengambil data categori berdasarkan id
export const getcategoryById = (req:Request, res:Response) => {};

//4.mengupdate data berdasarkan id
export const updatecategory = (req:Request, res:Response) => {};

//5.menghapus data categori berdasarkan id
export const deletecategory = (req:Request, res:Response) => {};
