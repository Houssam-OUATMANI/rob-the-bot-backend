import express from "express"
import ollama from "ollama"
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())


app.post("/chat", async (req, res) => {
    const { content } = req.body

    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.setHeader("Transfer-Encoding", "chunked")
    console.log(content)


    
    const response = await ollama.chat({
        model : "llama2-uncensored",
        messages : [{role : "user", content : content}],
        stream : true
    })
    for await (const part of response) {
        res.write(part.message.content)
    }
    res.end()
   
})



app.listen(8080, () => console.log("APP runs on port 8080"))