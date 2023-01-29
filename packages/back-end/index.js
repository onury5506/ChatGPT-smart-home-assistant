import * as dotenv from 'dotenv'
dotenv.config()
import chatGPT from './chatgpt/chatgpt.js'
import express from "express"
const app = express()
app.use(express.json())
const port = 5000

const chat = new chatGPT(process.env.OPENAI_EMAIL,process.env.OPENAI_PASSWORD)

chat.init().catch(console.error)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/chatgpt",async (req,res)=>{
    const command = req.body.command
    if(!command){
        return res.sendStatus(400)
    }

    try{
        const response = await chat.sendCommand(command)
        res.send(response)
    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Back-end listening on port ${port}`)
})