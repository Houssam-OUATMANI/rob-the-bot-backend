
import type { Request, Response } from "express"
import ollama from "ollama"
import { Conversation } from "#db/converstionSchema"
import type { Message } from "#types/index"


// Particular Conversation
async function show(req: Request, res: Response) {
    const id = req.params.id
    const converstion = await Conversation.findById(id)
    if (!converstion) return res.status(404).json({ error: "Conversation not found" })

    return res.json(converstion)
}

// History
async function history(_req: Request, res: Response) {
    // DESC ORDER
    const converstions = await Conversation.find().select("title").sort({ createdAt: -1 })
    return res.json(converstions)
}


async function deleteChatById(req: Request, res: Response) {
    const id = req.params.id
    await Conversation.findByIdAndDelete(id)
    return res.json({ message: "Conversation deleted successfully" })
}


async function deleteAllChats(req: Request, res: Response) {
    await Conversation.deleteMany({})
    return res.json({ message: "All Conversations deleted successfully" })
}

async function getLastChat(req: Request, res: Response) {
    const conversation = await Conversation.findOne().sort({ _id: -1 }).select("_id");
    if (!conversation) return res.status(404).json({ error: "No Chat Found"})
    return res.json(conversation)    
}



async function chat(req: Request, res: Response) {
    const { content, model, id } = req.body
    const mappedContent = content.map((c: Message) => { return { role: c.role, content: c.text } })
    const firstModel = (await ollama.list()).models.map(m => m.model)[0]
    const chatBot: Message = { id: Date.now(), author: model || firstModel, text: "", date: new Date(), role: "assistant" }

    // Bot response as AsyncGenerator
    const response = await ollama.chat({
        model: model || firstModel,
        // messages : [{role : "user", content : content}],
        messages: mappedContent,
        stream: true
    })
    // Stream To The Client
    for await (const part of response) {
        chatBot.text += part.message.content
        res.write(part.message.content)
    }
    // Add Bot complete response to the converstion
    content.push(chatBot)
    // DB mutation Creation
    if (!id) {
        // TODO FIX CUSTOM HEADER RESPONSE (DIFFERENT ORIGIN)
        const newConversation = await Conversation.create({ title: mappedContent[0].content.trim(), content: content })
        res.setHeader('x-chat-id', newConversation._id.toString())
    }
    // DB mutation Update
    else await Conversation.findByIdAndUpdate(id, { $set: { content: content } })

    return res.end()
}


export { chat, history, show, deleteChatById, deleteAllChats, getLastChat }