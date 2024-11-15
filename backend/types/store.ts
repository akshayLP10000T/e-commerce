import mongoose, { Document } from "mongoose";

export interface StoreSchema extends Document {
    address: string;
    accountNumber: number;
    ifscCode: string;
    nameAccount: string;
    owner: mongoose.Schema.Types.ObjectId;
    items: mongoose.Schema.Types.ObjectId[] | null;
}