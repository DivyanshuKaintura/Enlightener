import './App.css';
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.png'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';


function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("")
  const [response, updateResponse] = useState([
    {
      txt: "Hlo I am here to help you",
      is_bot: true
    }
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[response])

  const handleClick = async (e) => {
    console.log("Post button clicked")
    const copy_txt = input; 
    setInput('');
    updateResponse([
      ...response,
      {
        txt:copy_txt, is_bot: false
      }
    ])
    try {
      const getResponse = await axios.post('http://127.0.0.1:7000/home', {
        sentence: copy_txt
      });
      let res = getResponse.data.new_sentence
      res = res.slice(0)
      updateResponse([
        ...response,
        {
          txt:copy_txt,
          is_bot: false
        },
        {
          txt: res,
          is_bot: true
        }
      ])

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEnter = async (e) => {
    if(e.key === 'Enter') 
      await handleClick();
  }

  return (
    <div className="App">
      <div className='main'>
        <div className='chats'>
          {response.map((message, index) => 
            <div key={index} className={message.is_bot?"chat bot":"chat"}>
              <img className='chatImg' src={message.is_bot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.txt}</p>
            </div>
          )}
          <div ref={msgEnd}></div>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input type="text" placeholder='Ask me anything...' value={input} onKeyDown={handleEnter} onChange={(e) => setInput(e.target.value)} /> <button className="send" onClick={handleClick}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>May produce incorrect result</p>
        </div>
      </div>
    </div>
  );
}

export default App;
