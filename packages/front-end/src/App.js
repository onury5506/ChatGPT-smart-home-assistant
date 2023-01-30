import { useState, useReducer, useMemo, useEffect } from 'react'
import axios from 'axios';

import './App.css';
import Device from './components/Device/Device.jsx';
import { components } from './devices.const.js'
import { useSpeech2Text } from './hooks/useSpeech2Text';
import text2speech from './helpers/text2speech.js'

function deviceReducer(state, action) {
  if (action.type == "update") {
    let buf = [].concat(state)
    console.log(buf)
    action.components.forEach((component) => {
      const index = buf.findIndex((d) => d.name.toLowerCase() == component.name.toLowerCase())
      console.log(index, component.name, component.value)
      if (index != -1) {
        buf[index].value = component.value
      }
      console.log(buf[index])
      console.log("-----")
    })

    return buf

  }


  return state
}

function App() {
  const userCommand = useSpeech2Text()
  const [chatGptResponse, setChatGptResponse] = useState("")
  const [deviceState, deviceDispatch] = useReducer(deviceReducer, components)

  const deviceRender = useMemo(() => (
    deviceState.map((d) => (
      <Device key={"device - " + d.name} name={d.name} value={d.value} image={d.image} />
    ))
  ), [deviceState])

  useEffect(() => {

    (async function () {
      if (!userCommand) {
        return;
      }

      const { data } = await axios({
        method: 'post',
        url: 'http://localhost:5000/chatgpt',
        data: {
          command: userCommand
        }
      })

      if (data["effected-components"].length > 0) {
        deviceDispatch({
          type: "update",
          components: data["effected-components"]
        })
      }

      text2speech(data.voice)
      setChatGptResponse(data.voice)
    })()

  }, [userCommand])

  return (
    <div className="App">
      <div id="info">
        It is a demo application for ChatGPT as a smart home assistant.
      </div>
      <div className='chatgpt-com'>
        <span>Command</span>
        <span>{userCommand}</span>
      </div>
      <div className='chatgpt-com'>
        <span>ChatGPT Response</span>
        <span>{chatGptResponse}</span>
      </div>

      <div id="devices">
        {deviceRender}
      </div>

    </div>
  );
}

export default App;
