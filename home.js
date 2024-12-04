import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth();
const userPhoto = document.getElementById("user-photo");
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

// Listen for user state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        const email = user.email;
        const photoURL = user.photoURL || "placeholder.png"; // Default if no photo exists

        userEmail.textContent = email; // Display user's email
        userPhoto.src = photoURL; // Display user's photo

        console.log("User logged in:", user);
    } else {
        // User is not logged in, redirect to login
        window.location.href = "index.html";
    }
});

// Logout functionality
logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Logged out successfully.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout Error:", error.message);
        alert(`Error: ${error.message}`);
    }
});
