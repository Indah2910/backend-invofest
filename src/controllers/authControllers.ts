import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { waitForDebugger } from "node:inspector";

//fungsi const register 
export const register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    //validasi input
    if(!name || !email || !password) {
        return res.status(400)
            .json({message: 'Nama, email dan password harus diisi'})

    }

    // cek apakah email sudah terdaftar 
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if(existingUser){
        return res.status(400)
            .json({message: "Email sudah terdaftar"})
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword,
        },
    });

    return res.status(201)
        .json({message: 'Register berhasil', user: newUser});
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400)
            .json({message: "email dan password harus diisi"})
    }

    // cek apakah user ada
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user){
        return res.status(404)
            .json({message: "User tidak ditemukan"})
    }

    // cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401)
            .json({message: "Password salah"})
    }

    // generate token 
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    return res.status(200)
        .json({massage: "Login berhasil", token})

}