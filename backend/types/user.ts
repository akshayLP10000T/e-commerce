import mongoose from "mongoose";

export interface UserSchema{
    fullName: string;
    email: string;
    password: string;
    contactNumber: number;
    address: string | null;
    store: mongoose.Schema.Types.ObjectId | null;
    appliedForStore: boolean;
    admin: boolean;
}