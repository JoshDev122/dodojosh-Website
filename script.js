// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDaec3LnWAKdgqsXn4q1cu2u3z0QsumLNs",
  authDomain: "bo3modtoolhelper.firebaseapp.com",
  projectId: "bo3modtoolhelper",
  storageBucket: "bo3modtoolhelper.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Register
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Account created: " + userCredential.user.email);
            window.location.href = "login.html";
        })
        .catch(error => {
            alert(error.message);
        });
}

// Login
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            window.location.href = "index.html";
        })
        .catch(error => {
            alert(error.message);
        });
}

// Forgot Password
function resetPassword() {
    const email = document.getElementById("forgot-email").value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch(error => {
            alert(error.message);
        });
}

// Check if logged in
function checkLogin() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "login.html";
        }
    });
}

// Logout
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    });
}
