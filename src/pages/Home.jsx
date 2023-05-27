import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate= useNavigate();

  const handleSignOut =async (e)=>{
   const result = await signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/login")
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    navigate("/login")
  }

  return (
    <div className='home'>
      <div className="container">
      <Sidebar/>
      <Chat/>
      </div>
    </div>
  );
};

export default Home;