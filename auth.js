import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaec3LNWAdKqgsXn4q1cu2u3z0QsumlNs",
  authDomain: "bo3-mod-tool-helper.firebaseapp.com",
  projectId: "bo3-mod-tool-helper",
  storageBucket: "bo3-mod-tool-helper.appspot.com",
  messagingSenderId: "229956627103",
  appId: "1:229956627103:web:9142ca7015e058aa2010aa",
  measurementId: "G-LDHQK9YSMX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Keep user logged in
setPersistence(auth, browserLocalPersistence);

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user && location.pathname.endsWith("login.html")) {
    location.href = "index.html";
  }
});

const msg = (e) => alert(e?.message || e);

// REGISTER
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    if (!email || !password) return msg("Please fill in email and password.");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created! You can now log in.");
      location.href = "login.html";
    } catch (err) { msg(err); }
  });
}

// LOGIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      location.href = "index.html";
    } catch (err) { msg(err); }
  });
}

// RESET PASSWORD
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", async () => {
    const email = document.getElementById("resetEmail").value.trim();
    if (!email) return msg("Enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) { msg(err); }
  });
}
