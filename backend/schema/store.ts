import mongoose from "mongoose";
import { StoreSchema } from "../types/store";

const storeSchema = new mongoose.Schema<StoreSchema>({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    ifscCode: {
        type: String,
        required: true,
    },
    nameAccount: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
        },
    ]
}, {
    timestamps: true
});

export const Store = mongoose.model("Store", storeSchema);