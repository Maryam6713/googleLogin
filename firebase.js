
// Firebase Imports
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase Configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const authForm = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const formBtn = document.getElementById("form-btn");
const toggleAuth = document.getElementById("toggle-auth");
const forgotPassword = document.getElementById("forgot-password");
const googleLogin = document.getElementById("google-login");

let isLoginMode = true;

// Splash Screen Logic
window.addEventListener("load", () => {
    setTimeout(() => {
        splashScreen.classList.add("hidden");
        setTimeout(() => {
            splashScreen.style.display = "none";
            mainContent.style.display = "block";
        }, 500);
    }, 5000);
});

// Toggle Login/Signup Mode
toggleAuth.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    formTitle.textContent = isLoginMode ? "Login" : "Sign Up";
    formBtn.textContent = isLoginMode ? "Login" : "Sign Up";
    toggleAuth.textContent = isLoginMode
        ? "Don't have an account? Sign Up"
        : "Already have an account? Login";
    forgotPassword.style.display = isLoginMode ? "block" : "none";
});

// Form Submission (Login/Signup)
authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isLoginMode) {
        // Login
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                alert("Please verify your email.");
                await sendEmailVerification(user);
            } else {
                window.location.href = "home.html";
            }
        } catch (error) {
            alert(error.message);
        }
    } else {
        // Signup
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);

            // Firestore: Store User Data
            await setDoc(doc(db, "users", user.uid), {
                name: "User Name", // Change this to dynamic input if needed
                email: user.email,
                createdAt: new Date().toISOString()
            });

            alert("Account created. Verify your email before logging in.");
        } catch (error) {
            alert(error.message);
        }
    }
});

// Forgot Password
forgotPassword.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    if (!email) {
        alert("Enter your email address.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
    } catch (error) {
        alert(error.message);
    }
});

// Google Login
googleLogin.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Firestore: Store Google User Data
        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            createdAt: new Date().toISOString(),
            provider: "Google"
        });

        window.location.href = "home.html";
    } catch (error) {
        alert(error.message);
    }
});
