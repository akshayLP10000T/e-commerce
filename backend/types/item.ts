import mongoose, { Document } from "mongoose";

interface Review{
    userId: mongoose.Schema.Types.ObjectId;
    comment: string;
    fullName: string;
}

export interface ItemSchema extends Document{
    name: string;
    description: string;
    price: number;
    rating: string;
    reviews: Review[] | null;
    image: string;
    owner: mongoose.Schema.Types.ObjectId;
}