import mongoose from "mongoose";
import { UserSchema } from "../types/user";

const userSchema = new mongoose.Schema<UserSchema>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default: "",
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        default: null,
    },
    appliedForStore: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    storeData: {
        type: Object,
        default: null,
    },
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);