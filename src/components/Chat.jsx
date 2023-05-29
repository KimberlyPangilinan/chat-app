import React, { useContext } from 'react'
import Messages from './Messages'
import InputBox from './InputBox'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {
  const navigate = useNavigate()
  const {data}= useContext(ChatContext)
  const handleSignout = async (e) => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message)
    }
  };
 
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
       
        <div className="chatIcons">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <button onClick={handleSignout}>Logout</button>
      </div>
      <Messages/>

      {data.user.displayName===undefined? null: <InputBox/>
      }
      
    </div>
  )
}

export default Chat
