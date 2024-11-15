
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth , GoogleAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBJPWQPulCO9JKtU3SI0FlIdHzVtXwLQPI",
    authDomain: "new-receipe-dd8d7.firebaseapp.com",
    projectId: "new-receipe-dd8d7",
    storageBucket: "new-receipe-dd8d7.firebasestorage.app",
    messagingSenderId: "803719843645",
    appId: "1:803719843645:web:19e3a29bd8865d58c43f54",
    measurementId: "G-QX7RYN7PCF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();


  const googleBtn = document.getElementById('google-login')
  googleBtn.addEventListener("click" , function(){
   
    signInWithPopup(auth, provider)
    .then((result) => {
    
      const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
      const user = result.user;
      console.log("user");
      window.location.href = "login.html";

      
     
    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      
    
    });

  })

  function updateProfile(user){
const userName = user.displayName;
const userEmail = user.email;
const userProfile = user.photoURL;

document.getElementById("username").textContent = userName;
  document.getElementById("userEmail").textContent = userName;
  document.getElementById("profile").textContent = userProfile;

  }

  updateProfile()

