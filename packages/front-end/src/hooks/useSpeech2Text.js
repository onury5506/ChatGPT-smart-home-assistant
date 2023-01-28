import { useEffect, useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function useSpeech2Text() {
    const [speechRecognition] = useState(new SpeechRecognition())
    const [sentence, setSetence] = useState("")

    useEffect(() => {
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;
        speechRecognition.lang = 'en-US'

        speechRecognition.onend = () => {
            speechRecognition.start();
        };

        speechRecognition.onError = console.error
        speechRecognition.onresult = (res)=>{
            if(res.results && res.results.length > 0){
                setSetence(res.results[0][0].transcript)
            }
        }

        speechRecognition.start();
    }, [speechRecognition])

    return sentence
}