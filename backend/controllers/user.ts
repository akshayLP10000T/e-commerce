import { Request, Response } from "express";
import { User } from "../schema/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response): Promise<any> => {
    try {

        const { fullName, email, password, confirmPassword, contactNumber } = req.body;

        if (!fullName || !email || !password || !confirmPassword || !contactNumber) {
            return res.status(404).json({
                success: false,
                message: "Check all details",
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password doesn't match",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        user = await User.create({
            email,
            password: hashedPassword,
            fullName,
            contactNumber: Number(contactNumber),
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully, Please login to continue",
        });

    } catch (error: any) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Check all details",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPasswordMatched = bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const token = jwt.sign({
            userId: user._id,
        }, process.env.SECRET_KEY!, {
            expiresIn: '3d'
        });

        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3 * 24 * 60 * 60 * 1000 });

        const userWithoutPassword = await User.findOne({ email }).select("-password");

        return res.status(201).json({
            success: true,
            message: `Logged in successfullt ${user.fullName}`,
            user: userWithoutPassword,
        });

    } catch (error: any) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const logout = async (req: Request, res: Response): Promise<any> =>{
    try {

        return res.clearCookie('token').status(200).json({
            success: true,
            message: "logged out successfully",
        });
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}