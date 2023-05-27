import React, { useState, useEffect, useContext } from 'react';
import Input from '../components/Input';
import {
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth, db, storage, provider } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth(); // Get the auth instance

  useEffect(() => {
    if (currentUser) {
      navigate('/');
      setTimeout(() => {
        setIsLoading(false); // After the timeout, set isLoading to false
      }, 1000); // Timeout duration in milliseconds (e.g., 2000 milliseconds = 2 seconds)
    }
    setIsLoading(false);
  }, [currentUser]);

  // ... previous code ...

const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    navigate('/');
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/multi-factor-auth-required') {
      const resolver = getMultiFactorResolver(auth, error);
      const hints = resolver.hints;
      if (hints.length > 0) {
        const phoneInfoOptions = {
          multiFactorHint: hints[0],
          session: resolver.session
        };
        const phoneAuthProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions);
        // Store the verificationId and handle the SMS verification code input by the user
        // After receiving the verification code, use the code below to complete sign-in
        const verificationCode = prompt('Enter the verification code');
        const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
        const finalUserCredential = await resolver.resolveSignIn(multiFactorAssertion);
        const finalUser = finalUserCredential.user;
        console.log(finalUser);
        navigate('/');
      }
    } else {
      setErr(error.message);
    }
  }
};

// ... rest of the code ...

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = userCredential.user;
      console.log(user.email);
      navigate('/');
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setErr(errorMessage);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="formContainer">
        <span className="logo">Kumusta</span>
        <span className="title">Sign In</span>
        <div className="formWrapper">
          <form onSubmit={handleSubmit}>
            <Input type="email" placeholder="email" label="Email Address" />
            <Input type={!showPassword ? 'password' : 'text'} placeholder="password" label="Password" />
            <div className="checkbox">
              <input type="checkbox" name="Show Password" id="" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              <span className="showPassword">Show Password</span>
            </div>
            <span className="error">{err}</span>
            <button className="button">Sign In</button>
            <button className="btnGoogle" onClick={handleGoogleSignUp}>
              <img style={{ width: '10px', marginRight: '4px' }} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="" />
              Sign In with Google
            </button>
          </form>
        </div>
        <p style={{ fontSize: '12px' }}>
          You don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    );
  }
};

export default Login;
