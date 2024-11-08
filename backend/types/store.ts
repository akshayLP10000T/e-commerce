import mongoose from "mongoose";

export interface StoreSchema {
    address: string;
    accountNumber: number;
    ifscCode: string;
    nameAccount: string;
    owner: mongoose.Schema.Types.ObjectId;
    items: mongoose.Schema.Types.ObjectId[] | null;
}