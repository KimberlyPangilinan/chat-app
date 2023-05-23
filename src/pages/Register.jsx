import React, { useState } from 'react';
import Input from '../components/Input';
import { createUserWithEmailAndPassword, updateProfile,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { auth, db, storage,provider } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(
    'https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y='
  );
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
        console.log(user)
        navigate("/");
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
      
    }}
  const handleSubmit = async (e) => {
    setLoading(true);
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
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
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
          <Input type="password" placeholder="password" label="Password" />
          <div className="checkbox">
            <input type="checkbox" name="Show Password" id="" />
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
      <p style={{ fontSize: '12px' }}> You have an account? Login</p>
    </div>
  );
};

export default Register;