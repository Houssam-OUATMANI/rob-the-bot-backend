import type { Request, Response } from "express"
import ollama from "ollama"

// Model List
async function listModels(_req: Request, res: Response) {
    const response = await ollama.list()
    const models = response.models.map(m => m.model)
    return res.json(models)
}

export { listModels }