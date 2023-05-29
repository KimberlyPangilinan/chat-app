import React, { useState,useContext,useEffect } from 'react';
import Input from '../components/Input';
import { createUserWithEmailAndPassword, updateProfile,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { auth, db, storage,provider } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(
    'https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y='
  );
 

  const navigate= useNavigate();

  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (currentUser) {
      navigate("/")
      setTimeout(() => {
        setIsLoading(false); // After the timeout, set isLoading to false
      }, 1000); // Timeout duration in milliseconds (e.g., 2000 milliseconds = 2 seconds)
    }
    setIsLoading(false);
   
  }, [currentUser]);



  const handleGoogleSignUp = async (e)=>{
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    
      console.log(user);
      navigate("/");
    
      // Create user on Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    
      // Create empty user chats on Firestore
      await setDoc(doc(db, 'userChats', user.uid), {});
    
      navigate("/");
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setErr(errorMessage);
    }}
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const file = e.target[0].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate("/");
          } catch (error) {
            setErr(err);
            setIsLoading(false);
          }
        });
      });
    } catch (error) {
      setErr(error.message);
      setIsLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;}
  else{
    
  return (
    <div className="formContainer">
      <span className="logo">Kumusta</span>
      <span className="title">Sign Up</span>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="pic">
            <label htmlFor="file" className="custom-file-upload">
              <img src={image} alt="" />
            </label>
            <input id="file" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
          </div>
          <Input type="text" placeholder="full name" label="Display Name" />
          <Input type="email" placeholder="email" label="Email Address" />
          <Input type={!showPassword? 'password':'text'} placeholder="password" label="Password" />
          <div className="checkbox">
            <input type="checkbox" name="Show Password" id="" checked={showPassword} onChange={handleCheckboxChange} />
            <span className="showPassword">Show Password</span>
          </div>
          <span className='error'>{err}</span>
          <button className="button">Sign Up</button>
          <button className="btnGoogle" onClick={handleGoogleSignUp}>
            <img
              style={{ width: '10px', marginRight: '4px' }}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
              alt=""
            />
            Sign up with Google
          </button>
        </form>
      </div>
      <p style={{ fontSize: '12px' }}> You have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
}
export default Register;