import React from 'react'
import Messages from './Messages'
import InputBox from './InputBox'
const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Jane</span>
       
        <div className="chatIcons">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <button>Logout</button>
      </div>
      <Messages/>
      <InputBox/>
    </div>
  )
}

export default Chat
