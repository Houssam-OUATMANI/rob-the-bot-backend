import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { dbConnect } from "#db/connect"
import { show, history, chat, deleteChatById, deleteAllChats, getLastChat } from "#controllers/chatController"
import { listModels } from "#controllers/modelController"

const app = express()
dotenv.config()
app.use(cors({
    origin: ["http://localhost:5173"],
    //credentials : true,
    exposedHeaders : "x-chat-id"
}))

app.use(express.json())


//#region Routes
app.get("/models", listModels)
app.get("/chat/last", getLastChat)
app.get("/chat/:id", show)
app.get("/chats/history", history)
app.post("/chat", chat)
app.delete("/chats", deleteAllChats)
app.delete("/chat/:id", deleteChatById)


//#endregion 


const port = process.env.PORT || 8081
app.listen(port, () => {
    dbConnect()
    console.log(`Server Available on Port: ${port}`)
})