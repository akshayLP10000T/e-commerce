import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../schema/user";

export const isAuthenticatedAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid user",
            })
        }

        req.id = decode.userId;

        const user = await User.findById(req.id).select("admin");

        if(!user?.admin){
            return res.status(401).json({
                success: false,
                message: "You are not a admin",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}