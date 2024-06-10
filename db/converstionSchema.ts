import { Schema, model } from "mongoose"

const converstionSchema = new Schema({
    title: String,
    content: [
        {
            id: Number,
            text: String,
            author: String,
            date: Date,
            role: String

        }
    ]
}, { timestamps: true })


export const Converstion = model("Converstion", converstionSchema)