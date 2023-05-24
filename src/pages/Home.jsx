import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate= useNavigate();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    navigate("/login")
  }

  return (
    <div>
      <h2>Home</h2>
      {currentUser ? (
        <div>
          <p>Display Name: {currentUser.displayName}</p>
          <p>Email: {currentUser.email}</p>
          <img src={currentUser.photoURL} alt="User" />
        </div>
      ) : (
        <div>
          <p>loading</p>
        </div>
      )}
    </div>
  );
};

export default Home;