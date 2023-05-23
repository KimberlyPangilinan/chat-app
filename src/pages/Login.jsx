import React,{useState} from 'react'
import Input from '../components/Input'
import { createUserWithEmailAndPassword, updateProfile,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { auth, db, storage,provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [err, setErr] = useState("");
  const navigate= useNavigate();
  const handleGoogleSignUp = async (e)=>{
    try{
      const res= await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user.email)
        navigate("/")
      })
      
    }catch(error){
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setErr(errorMessage);
      
    }

  }
  return (
    <div className="formContainer">
     <span className="logo">Kumusta</span>
            <span className="title">Sign In</span>
    <div className="formWrapper">
   
        <form>
            <Input type="email" placeholder="email" label="Email Address"/>
            <Input type="password" placeholder="password" label="Password"/>
            <div className='checkbox'>
            <input type="checkbox" name="Show Password" id="" />
            <span className='showPassword'>Show Password</span>
            </div>
            
            <button className='button'>Sign In</button>
            <button className='btnGoogle' onClick={handleGoogleSignUp}>
            <img style={{width:'10px',marginRight:'4px'}} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="" />
            Sign In with Google</button>
        </form>
       
    </div>
    <p style={{fontSize:'12px'}}> You don't have an account? Sign up</p>
    </div>
  )
}

export default Login
