import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

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
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);

// ===== LOGIN =====
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  document.getElementById("login-status").textContent = "Logging in...";

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html"; // CHANGE THIS to your real homepage filename
    })
    .catch(error => {
      document.getElementById("login-status").textContent = error.message;
    });
};

// ===== REGISTER =====
window.register = function () {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const displayName = document.getElementById("register-name").value;
  document.getElementById("register-status").textContent = "Creating account...";

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateProfile(userCredential.user, { displayName: displayName });
      window.location.href = "index.html"; // CHANGE THIS to your real homepage filename
    })
    .catch(error => {
      document.getElementById("register-status").textContent = error.message;
    });
};

// ===== RESET PASSWORD =====
window.resetPassword = function () {
  const email = document.getElementById("forgot-email").value;
  document.getElementById("reset-status").textContent = "Sending reset email...";

  sendPasswordResetEmail(auth, email)
    .then(() => {
      document.getElementById("reset-status").textContent = "Password reset email sent!";
    })
    .catch(error => {
      document.getElementById("reset-status").textContent = error.message;
    });
};

// ===== LOAD DASHBOARD =====
window.loadDashboard = function () {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      document.getElementById("user-email").textContent = user.email;
      document.getElementById("user-name").textContent = user.displayName || "New Player";
      if (user.photoURL) {
        document.getElementById("profile-pic").src = user.photoURL;
      } else {
        document.getElementById("profile-pic").src = "default-avatar.png";
      }
    }
  });
};

// ===== UPDATE PROFILE PICTURE =====
window.uploadProfilePic = function () {
  const file = document.getElementById("profile-upload").files[0];
  if (!file) return alert("Select a file first.");
  const user = auth.currentUser;
  const storageRef = ref(storage, 'profile-pictures/' + user.uid);

  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then(url => {
      updateProfile(user, { photoURL: url }).then(() => {
        document.getElementById("profile-pic").src = url;
      });
    });
  });
};

// ===== LOGOUT =====
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};
