
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyDaec3LnWAKdgqsXn4q1cu2u3z0QsumLNs",
  authDomain: "bo3-mod-tool-helper.firebaseapp.com",
  projectId: "bo3-mod-tool-helper",
  storageBucket: "bo3-mod-tool-helper.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log('Firebase initialized');

// Keep user logged in
setPersistence(auth, browserLocalPersistence);

// ===== LOGIN =====
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Logged in successfully!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert(error.message);
    });
};

// ===== REGISTER =====
window.register = function () {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "login.html";
    })
    .catch(error => {
      alert(error.message);
    });
};

// ===== FORGOT PASSWORD =====
window.resetPassword = function () {
  const email = document.getElementById("forgot-email").value;

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch(error => {
      alert(error.message);
    });
};

// ===== LOGOUT =====
window.logout = function () {
  signOut(auth).then(() => {
    alert("Logged out.");
    window.location.href = "index.html";
  });
};

// ===== SHOW USER INFO =====
window.showUserInfo = function () {
  const userDisplay = document.getElementById("user-info");
  if (!userDisplay) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userDisplay.textContent = `Welcome, ${user.email}`;
    } else {
      userDisplay.textContent = "";
    }
  });
};

// Run user info check on load if element exists
window.addEventListener("DOMContentLoaded", () => {
  showUserInfo();
});
