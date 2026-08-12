
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtDBFbZ9QBhqchyaPVAce145IMPzekYWA",
    authDomain: "dlpage-e807c.firebaseapp.com",
    projectId: "dlpage-e807c",
    storageBucket: "dlpage-e807c.firebasestorage.app",
    messagingSenderId: "216742989828",
    appId: "1:216742989828:web:c8193623b5ecc8a1862551"
  };
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
const loginButton = document.getElementById("login-btn");
const resetEmail = document.getElementById("resetEmail");
var uname = document.getElementById("username");
var password= document.getElementById("password");
let passwordResetModal;
let confirmModal;
loginButton.onclick=async()=>{
  if(username.value=="adminBackPage1111"&&password.value=="supermax1234"){
    window.location.href = "admin-page.html";
    return;
  }

  
  const creds = await signInWithEmailAndPassword(auth, uname.value, password.value)

  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(user.emailVerified){
 console.log(user);
    console.log("login successfull...");
    localStorage.setItem("uname",uname.value);
    //localStorage.setItem("email",email.value);
    window.location.href = "user-page.html";
    }
    else{
      alert("unverified account");
  

    }
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

document.addEventListener('DOMContentLoaded', function() {
    confirmModal = new bootstrap.Modal(document.getElementById('resetConfirmModal'));
});
function confirmInstance() {
    // If not initialized, initialize it now
    if (!confirmModal) {
        const modalElement = document.getElementById('resetConfirmModal');
        if (modalElement) {
            confirmModal = new bootstrap.Modal(modalElement);
        }
    }
    return confirmModal;
}
function resetSent() {
  
    const modal = confirmInstance();
    if (modal) {
        modal.show(); // This will no longer be undefined
    } else {
        console.error("Modal element 'confirmModal' not found in DOM");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    passwordResetModal = new bootstrap.Modal(document.getElementById('resetModal'));
});
function getModalInstance() {
    // If not initialized, initialize it now
    if (!passwordResetModal) {
        const modalElement = document.getElementById('resetModal');
        if (modalElement) {
            passwordResetModal = new bootstrap.Modal(modalElement);
        }
    }
    return passwordResetModal;
}
function showConfirm(title, message, onConfirm) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    
    const confirmBtn = document.getElementById('modalConfirmBtn');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    newConfirmBtn.addEventListener('click', () => {
        onConfirm();
        getModalInstance().hide(); // Use the getter
    });
    
    const modal = getModalInstance();
    if (modal) {
        modal.show(); // This will no longer be undefined
    } else {
        console.error("Modal element 'confirmModal' not found in DOM");
    }
}
export function tryPasswordReset(){
  showConfirm("Password Reset","Type your account email below to receive the password reset link.",()=>{})
}
export async function sendResetLink() {
  try{
    await sendPasswordResetEmail(auth, resetEmail.value)
     console.log("RESET EMAIL SENT SUCCESSFULLY")
    resetSent("Reset Link Sent","Check your email to reset your account password",()=>{})
  }
  catch(error){
    console.log(error.code)
  }
  
    
  
}
window.tryPasswordReset = tryPasswordReset;
window.sendResetLink = sendResetLink;