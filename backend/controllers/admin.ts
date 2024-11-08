import { Request, Response } from "express";
import { User } from "../schema/user";
import { Store } from "../schema/store";

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

export const giveStoreAccess = async (req: Request, res: Response): Promise<any> => {
    try {

        const {id} = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User no longer exists",
            });
        }

        const store = await Store.create({
            address: user.storeData?.address,
            accountNumber: user.storeData?.accountNumber,
            ifscCode: user.storeData?.ifscCode,
            nameAccount: user.storeData?.nameAccount,
            owner: id,
        });

        const updatedUser = await User.findByIdAndUpdate(id, { appliedForStore: false, store: store._id });

        updatedUser?.save();

        return res.status(201).json({
            success: true,
            message: "Access granted successfully",
        });


    } catch (error: any) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}