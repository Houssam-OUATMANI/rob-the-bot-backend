import { Schema, model } from "mongoose"

const conversationSchema = new Schema({
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


export const Conversation = model("Conversation", conversationSchema)