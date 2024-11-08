import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            admin: boolean;
        }
    }
}

export const isAuthenticatedAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const { token } = req.cookies;

        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        if(!decode.admin){
            return res.status(401).json({
                success: false,
                message: "You are not a admin",
            });
        };

        req.admin = decode.admin;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}