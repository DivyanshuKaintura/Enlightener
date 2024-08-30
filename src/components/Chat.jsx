import './chat.css';
import sendBtn from '../assets/send.svg'
import userIcon from '../assets/man.png'
import gptImgLogo from '../assets/chatgptLogo.png'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import chatIcon from '../assets/chatIcon2.png'
import arrowRight from '../assets/arrow_right.png'

function Chat() {

  const msgEnd = useRef(null);
  // const [isCollapsed, updateIsCollapsed] = useState(false)
  const [input, setInput] = useState("")
  const [response, updateResponse] = useState([
    {
      txt: "Deepfakes are AI-generated videos or images that convincingly alter reality, often by swapping faces or manipulating speech. They raise significant concerns about misinformation, privacy violations, and the erosion of trust in digital media.",
      is_bot: true
    }
  ]);

  // start
  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalScroll, setTotalScroll] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    const totalScrollHeight = document.documentElement.offsetHeight;
    setScrollPosition(position);
    setTotalScroll(totalScrollHeight);
    // console.log(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  //end

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [response])

  const handleClick = async (e) => {
    console.log("Post button clicked")
    const copy_txt = input;
    setInput('');
    updateResponse([
      ...response,
      {
        txt: copy_txt, is_bot: false
      }
    ])
    try {
      const getResponse = await axios.post('http://127.0.0.1:7000/home', {
        sentence: copy_txt
      });
      let res = getResponse.data.new_sentence
      // res = res.slice(0)

      // start

      let responseArray = res.split("*");
      let newResonse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) // even number
        {
          newResonse += responseArray[i];
        } else {
          let temp = responseArray[i];
          newResonse += temp + "\n";
          console.log(temp)
        }
      }

      newResonse = newResonse.split("*").join("</br>")

      // end

      updateResponse([
        ...response,
        {
          txt: copy_txt,
          is_bot: false
        },
        {
          txt: newResonse, // res
          is_bot: true
        }
      ])

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter')
      await handleClick();
  }

  const [isChatOpened, updateIsChatOpened] = useState(false);
  const handleToogleChat = (e) => {
    updateIsChatOpened(!isChatOpened);
    // if (isChatOpened) {
    //   App.style.opacity = 1;
    // }
  }

  return (
    <div className={(scrollPosition<522 || totalScroll-scrollPosition<860)? "hide box":"box"}>
      <button className={isChatOpened? "toggleBox alterPosition": "toggleBox"} onClick={handleToogleChat}><img className={isChatOpened?"arrowIcon" :"chatIcon"} src={isChatOpened? arrowRight: chatIcon} alt=''></img></button>
        <div className={isChatOpened? "App sticky": "App sticky hide"}>
        <div className='chatBot'>
          <div className='chats'>
            <p className='support'>Support {scrollPosition} {totalScroll}</p>
            {response.map((message, index) =>
              <div key={index} className={message.is_bot ? "chat bot" : "chat user"}>
                <img className='chatImg' src={message.is_bot ? gptImgLogo : userIcon} alt="" /><p className="txt">{message.txt}</p>
              </div>
            )}
            <div ref={msgEnd}></div>
          </div>
          <div className='chatFooter'>
            <div className='inp'>
              <input type="text" placeholder='Ask me anything...' value={input} onKeyDown={handleEnter} onChange={(e) => setInput(e.target.value)} /> <button className="send" onClick={handleClick}><img src={sendBtn} alt="Send" /></button>
            </div>
            {/* <p>May produce incorrect result</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
