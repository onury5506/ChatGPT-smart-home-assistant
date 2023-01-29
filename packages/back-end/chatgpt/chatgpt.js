import { ChatGPTAPIBrowser } from 'chatgpt'
import fs from 'fs'

const prompt = fs.readFileSync("./chatgpt/prompt").toString()

export default function chatGPT(email, password) {
    if (!email || !password) {
        throw "Missing email or password!"
    }
    this.ready = false
    this.api = new ChatGPTAPIBrowser({ email, password, isGoogleLogin: true })
}

chatGPT.prototype.init = async function (){
    await this.api.initSession()
    this.res = await this.api.sendMessage(prompt)
    console.log("ready")
    console.log(this.res.response)
    this.ready = true
}

chatGPT.prototype.sendCommand = async function (command) {
    if (!this.ready) {
        throw "chatGPT is not ready!"
    }

    this.ready = false
    this.res = await this.api.sendMessage(command, {
        conversationId: this.res.conversationId,
        parentMessageId: this.res.parentMessageId
    })
    this.ready = true

    return this.res.response
}