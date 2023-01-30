const speakData = new SpeechSynthesisUtterance();
speakData.lang = 'en';

export default function text2speech(text){
    speakData.text = text
    speechSynthesis.speak(speakData);
}