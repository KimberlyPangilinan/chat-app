import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const {currentUser}= useContext(AuthContext)
  return (
    <div>
      Home
      <span> {currentUser.displayName}</span>
      <img src={currentUser.photoURL} alt="hello" />
    </div>
  )
}

export default Home
