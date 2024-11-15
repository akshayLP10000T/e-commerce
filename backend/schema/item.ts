import mongoose from "mongoose";
import { ItemSchema } from "../types/item";

const itemSchema = new mongoose.Schema<ItemSchema>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: String,
        default: "0",
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    ],
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const Item = mongoose.model("Item", itemSchema);