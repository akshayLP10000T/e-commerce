import { Request, Response } from "express";
import { Store } from "../schema/store";
import { Item } from "../schema/item";
import sharp from 'sharp';
import cloudinary from '../utils/cloudinary';
import { User } from "../schema/user";
import { ObjectId } from "mongoose";

export const getStoreData = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const userId = req.id;

        const user = await User.findById(userId).select("store");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Some error occur please try again later",
            });
        }

        const storeData = await Store.findById(user.store).select("-items");

        if (!storeData) {
            return res.status(202).json({
                success: false,
                message: "You are not a store owner",
            });
        }

        if (storeData.owner.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Invalid user or store",
            });
        }

        return res.status(201).json({
            success: true,
            storeData,
        });

    } catch (error: any) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const addItem = async (req: Request, res: Response): Promise<any> => {
    try {

        const { name, price, description } = req.body;
        const image = req.file;

        if(!name || !price || !description){
            return res.status(404).json({
                success: false,
                message: "Fill all details",
            });
        }

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image file required",
            });
        }

        const userId = req.id;

        const user = await User.findById(userId).select("store");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Some error occur please try again later",
            });
        }

        const storeData = await Store.findById(user.store);

        if(!storeData){
            return res.status(400).json({
                success: false,
                message: "Some error occured please try again later",
            });
        }

        const optimizedImageBuffer = await sharp(image.buffer).resize({
            width: 800,
            height: 800,
            fit: "inside",
        }).toFormat('jpeg', {
            quality: 80,
        }).toBuffer();
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const item = await Item.create({
            name,
            image: cloudResponse.secure_url,
            price,
            description,
            owner: storeData._id,
        });

        if(!item){
            return res.status(400).json({
                success: false,
                message: "Some error occurred while creating you item",
            });
        }

        storeData?.items?.push(item._id as ObjectId);

        await storeData.save();

        const itemData = Item.findById(item._id).select("-owner");

        return res.status(201).json({
            success: true,
            message: "Item Added successfully",
            item: itemData,
        });

    } catch (error: any) {

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getAllItems = async (req: Request, res: Response): Promise<any> =>{
    try {

        const userId = req.id;
        const user = await User.findById(userId).select("store");
        const storeData = await Store.findById(user?.store).select("items");

        let items: any[] = [];

        if (storeData?.items?.length) {
            items = await Promise.all(
                storeData.items.map(async (item: any) => {
                    const itemData = await Item.findById(item).select("-owner");
                    return itemData;
                })
            );
        }

        return res.status(200).json({
            success: true,
            items,
        });
        
    } catch (error: any) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}