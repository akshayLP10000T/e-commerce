import { Request, Response } from "express";
import { User } from "../schema/user";

export const getStoreRequests = async (req: Request, res: Response): Promise<any> => {
    try {

        const users = await User.find({ appliedForStore: true }).select("storeData _id email fullName");

        return res.status(201).json({
            success: true,
            users,
        });

    } catch (error: any) {

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}