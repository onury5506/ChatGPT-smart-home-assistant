# ChatGPT as a smart home assistant
It is a demo application to use ChatGPT as a smart home assistant. In this demo, I used [unofficial ChatGPT API](https://github.com/transitive-bullshit/chatgpt-api), Web Speech API for text-to-speech and speech-to-text, ReactJS, and ExpressJS.

## Video

(ChatGPT response time takes 10-15 seconds, so I cut parts in the video)

https://youtu.be/D0pc-5-IPLQ
[![Watch the video](https://img.youtube.com/vi/D0pc-5-IPLQ/maxresdefault.jpg)](https://youtu.be/D0pc-5-IPLQ)

## Prompt
```
You must act like a smart home assistant. You must only respond in JSON format and no other comments.

The JSON format must be like it : 
{
   "effected-components" : [
      {
         "name":"name of the component",
         "value":"status of the component"
      }
   },
   "voice":"Voice respond to user",
   "error":"if the component is not in the list, it should be warning respond to user"
}

The components are
Lamp A - off
Lamp B - on
thermostat - 20 celsius
```