import './App.css'
import gpticon from './gpt-icon.png'
import ricon from './r.png'
import { FaArrowUp } from "react-icons/fa6";
import { useState } from 'react';

const API_KEY = ''

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const handleSend = async () => {
    if (input.trim() === '') return;
    // Gönderilen mesajları sakliyoruz
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          prompt: input,
          max_tokens: 3000,
          model: "gpt-3.5-turbo",
          temperature: 0.3,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

      // Gelen yanıtı sakla
      setMessages([...messages, { text: data.choices[0].text.trim(), sender: 'bot' }]);
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
    }

    setInput('');
  }

  return (
    <div className='gptall'>
      <div className="right-bar">
        <span className='rgbt'>CHATBOT</span>
        <div className="right-bar-messages">
          <div className="right-bar-messagefixed">
            <img src={gpticon} alt="" className='right-bar-message-icon'/>
            <p className='message'>Hi, I am ChatGPT, a state-of-the-art, language model developed by OpenAI's API. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek informations or even request assistance with various tasks. Just let me know what you want. How can I help you?</p>
          </div>
          {/* <div className="right-bar-question">
            <img src={ricon} alt="" className='right-bar-answer-icon'/>
            <p className='message'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore natus nemo ipsa iste repellat. Numquam veritatis repudiandae saepe officiis ducimus. Commodi distinctio neque illo nihil, magni aliquid eum obcaecati maiores?</p>
          </div> */}
          {messages.map((message, index) => (
            <div key={index} className={message.sender === 'user' ? 'right-bar-question' : 'right-bar-answer'}>
              <img src={message.sender === 'user' ? ricon : gpticon} alt="" className='right-bar-answer-icon'/>
              <p className='message'>{message.text}</p>
            </div>
          ))}
          {/* <div className="right-bar-answer">
            <img src={gpticon} alt="" className='right-bar-answer-icon'/>
            <p className='message'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore natus nemo ipsa iste repellat. Numquam veritatis repudiandae saepe officiis ducimus. Commodi distinctio neque illo nihil, magni aliquid eum obcaecati maiores?</p>
          </div> */}

        </div>
        <div className="right-bar-footer">
          <div className="right-bar-footer-top">
            <textarea placeholder='Message chatbot...' value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <FaArrowUp className='arrowicon' onClick={handleSend}/>
          </div>
          <p style={{fontSize:"12px", color:"grey"}}>CHATBOT can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  )
}

export default App

