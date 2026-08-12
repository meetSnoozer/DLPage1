import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
  import { getFirestore, collection,getDocs,doc,updateDoc,deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';


import { 
    getAuth, 
    deleteUser, 
    EmailAuthProvider, 
    reauthenticateWithCredential,
    updatePassword 
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
 const firebaseConfig = {
    apiKey: "AIzaSyCtDBFbZ9QBhqchyaPVAce145IMPzekYWA",
    authDomain: "dlpage-e807c.firebaseapp.com",
    projectId: "dlpage-e807c",
    storageBucket: "dlpage-e807c.firebasestorage.app",
    messagingSenderId: "216742989828",
    appId: "1:216742989828:web:c8193623b5ecc8a1862551"
  };

class PlayerDetails{
    constructor(username,highesLevel,coins,highscores,skins,bestTimes,achievements){
        this.username = username,
        this.highesLevel = highesLevel,
        this.coins = coins,
        this.highscores = highscores,
        this.skins = skins,
        this.bestTimes = bestTimes,
        this.achievements = achievements
    }
}
const detailList = []
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const db = getFirestore(app);
    const collectionRef = collection(db,"DataScapePlayerBase");
    const firebaseQuery = await getDocs(collectionRef);
    var uname = localStorage.getItem("uname");
    console.log(uname)
    let username = "";
    firebaseQuery.forEach(doc=>{
        let id = doc.id;
        if(id==uname){
            const user = new PlayerDetails(
                doc.data().username,
                doc.data().highesLevel,
                doc.data().coins,
                doc.data().highscores,
                doc.data().skins,
                doc.data().bestTimes,
                doc.data().achievements
        )
        detailList.push(user)
        }
    })
console.log(detailList[0])

console.log(`Username: ${detailList[0].username}`);

const coinCount = document.getElementById("coins");
const hLevel = document.getElementById("hlevel");
const ach = document.getElementById("ach");
const skinCount = document.getElementById("skins");
const accountInfo = document.getElementsByClassName("accountInfo")
const accountSettings = document.getElementsByClassName("accountSettings")
const statView = document.getElementById("stats")
const settingsView = document.getElementById("settings")
const accEmail = document.getElementById("mgr-email")
const accName = document.getElementById("mgr-username")
const confirmPassword = document.getElementById("confirmPassword")
const oldPassword = document.getElementById("oldPassword")
const passwordField = document.getElementById("mgr-password");
const passwordField1 = document.getElementById("mgr-password1");
const oldPasswordField = document.getElementById("mgr-password2")
const passwordError=document.getElementById("passwordError")
let passChange = false;
let unameChange = false;
let changeType = ""
accName.value = detailList[0].username;
coinCount.textContent = detailList[0].coins;
hLevel.textContent = detailList[0].highesLevel;
ach.textContent = detailList[0].achievements.length;
skinCount.textContent = detailList[0].skins.length;
accEmail.value=uname;
const welcomeLabel = document.getElementById("welcome");
const offName = document.getElementById("offcanvasUsername");
offName.textContent = `${detailList[0].username}`
welcomeLabel.textContent = `Welcome, ${detailList[0].username} !`


const achContainer = document.getElementById("achievement-container");
const achievements = detailList[0].achievements; // This is your array

// Clear container first
achContainer.innerHTML = "";

if (achievements && achievements.length > 0) {
    achievements.forEach(achName => {
        if(achName!=""){
            const card = document.createElement("div");
        card.className = "ach-card";
        
        card.innerHTML = `
            <i class="fas fa-award ach-icon"></i>
            <span class="ach-name">${achName}</span>
        `;
        
        achContainer.appendChild(card);
        }
        // Create the card element
        
    });
} else {
    achContainer.innerHTML = `<h4 style="opacity: 0.5; border: none;">No data logged in sector.</h4>`;
}
const skinContainer = document.getElementById("skin-container");
const skins = detailList[0].skins; // This is your array from Firestore

// Clear container
skinContainer.innerHTML = "";

if (skins && skins.length > 0) {
    skins.forEach(skinName => {
        const card = document.createElement("div");
        card.className = "skin-card";
        
        // We'll use a generic user/suit icon for skins
        card.innerHTML = `
            <i class="lni lni-shield skin-icon"></i>
            <span class="skin-name">${skinName}</span>
        `;
        
        skinContainer.appendChild(card);
    });
} else {
    skinContainer.innerHTML = `<h4 style="opacity: 0.5; border: none;">No skins detected in inventory.</h4>`;
}

let confirmationModal;
let responseModal;
document.addEventListener('DOMContentLoaded', function() {
    confirmationModal = new bootstrap.Modal(document.getElementById('confirmModal'));
});
function getModalInstance() {
    // If not initialized, initialize it now
    if (!confirmationModal) {
        const modalElement = document.getElementById('confirmModal');
        if (modalElement) {
            confirmationModal = new bootstrap.Modal(modalElement);
        }
    }
    return confirmationModal;
}
function getResponseInstance() {
    // If not initialized, initialize it now
    if (!responseModal) {
        const modalElement = document.getElementById('changeResponse');
        if (modalElement) {
            responseModal = new bootstrap.Modal(modalElement);
        }
    }
    return responseModal;
}
// Function to trigger the custom confirmation
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
function showIndicator(title, message, onConfirm) {
    document.getElementById('modalTitle1').innerText = title;
    document.getElementById('modalMessage1').innerText = message;
    
    
    const modal = getResponseInstance();
    if (modal) {
        modal.show(); // This will no longer be undefined
    } else {
        console.error("Modal element 'confirmModal' not found in DOM");
    }
}
export function logOut(){
    localStorage.removeItem("uname")
    window.location.href="login.html";
    
}
export function showSettings(){
    
    accountSettings.classList.remove("active")
    accountInfo.classList.remove("active")
    accountSettings.classList.add("active")

}
export function editableUsername(){
    accName.removeAttribute('readonly');
    accName.readOnly=false;
}
export function editablePassword(){
    confirmPassword.classList.remove("inactive")
    oldPassword.classList.remove("inactive")
    passwordField.removeAttribute('readonly');
    passwordField.readOnly = false;
}
function checkPassword(){
    if(passwordField.value!=passwordField1.value){
        passwordError.classList.add("active");
    }
    else if(passwordField1.value==passwordField.value){
        passwordError.classList.remove("active");
    }
}
export function tryChanges(){
    checkPassword();
    let usernameChanges = detailList[0].username==accName.value ? "" : `Username : ${detailList[0].username} -> ${accName.value} \n`
    let passwordChanges = passwordField.value=="" ? "" : `Password : ********`
    changeType = "credential"
    passChange = passwordField.value!=""
    unameChange = detailList[0].username!=accName.value
    console.log(`password changed: ${passChange}`)
    console.log(`username changed: ${unameChange}`)
    if((passwordField.value!=""&&passwordField.value==passwordField1.value)||detailList[0].username!=accName.value){
        showConfirm(
        "UPDATE_CREDENTIALS", 
        `Verify system rewrite: Are you sure you want to apply the following update your profile data?\n\n${usernameChanges}${passwordChanges}`,

        () => {
            console.log("Update logic executing...");
            // Call your actual update function here: 
            // performUpdate(); 
        }
    );
    }
    
}
export function tryDelete(){
    changeType = "delete"
    showConfirm(
        "TERMINATE_ACCOUNT", 
        "WARNING: This action is irreversible.\n\n All user data will be removed from the system. Do you wish to proceed?", 
        () => {
            console.log("Account deletion logic executing...");
            // Call your actual delete function here:
            // performDeletion();
        }
    );
}
export async function applyChanges(){
    if(changeType == "delete"){
        console.log(`Delete Email: ${localStorage.getItem('uname')}`)
        performFullAccountDeletion();
        showIndicator("Account Deleted","We are sad to see you go. See you again!",() => {
            console.log("Update logic executing...");
            // Call your actual update function here: 
            // performUpdate(); 
        });
    }
    if(changeType == "credential"){
        let changes = ""
        if(unameChange){
            updateUsername();
            changes+="Username has been updated on the system.\n\n"
        }
        if(passChange){
            performSilentUpdate(oldPasswordField.value,passwordField.value)
            console.log("change Password")
            changes+=`Password for ${localStorage.getItem('uname')} has been updated`
        }
        showIndicator("Account Updated",changes,() => {
            console.log("Update logic executing...");
            // Call your actual update function here: 
            // performUpdate(); 
        });
    }
}
async function performSilentUpdate(oldPassword, newPassword) {
    // Optional: Start a loading spinner here
    // setUpdating(true); 

    try {
        const user = auth.currentUser;
        const email = localStorage.getItem('uname');
        const credential = EmailAuthProvider.credential(email, oldPassword);

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
    } catch (error) {
        // Handle specific "wrong password" errors
        if (error.code === 'auth/wrong-password') {
            alert("The old password you entered is incorrect.");
        } else {
            alert("Error: " + error.message);
        }
    } finally {
        // setUpdating(false);
    }
}
async function updateUsername() {
    const newUsername = accName.value;
    const userDoc = doc(db,"DataScapePlayerBase",localStorage.getItem('uname'))
    try{
        await updateDoc(userDoc,{
            username: newUsername
        })
    }
    catch{
        alert("Username Update Failed");
    }
}
async function performFullAccountDeletion() {
    const user = auth.currentUser;
    const email = localStorage.getItem('uname'); // Your doc ID
    const password =document.getElementById("mgr-password2")

    if (!user) {
        alert("No user is currently logged in.");
        return;
    }

    try {
        // 1. Re-authenticate (Required by Firebase for account deletion)
        const credential = EmailAuthProvider.credential(email, password.value);
        await reauthenticateWithCredential(user, credential);

        // 2. Delete Firestore Document
        const userDocRef = doc(db, "DataScapePlayerBase", email);
        await deleteDoc(userDocRef);
        console.log("Firestore data wiped.");

        // 3. Delete Authentication Account
        await deleteUser(user);
        console.log("Auth account deleted.");

        // 4. Cleanup and Redirect
        localStorage.removeItem("uname");
        window.location.href = "login.html"; // or login.html

    } catch (error) {
        console.error("Deletion failed:", error);
        if (error.code === 'auth/wrong-password') {
            alert("Incorrect password. Deletion cancelled.");
        } else {
            alert("Error during account termination: " + error.message);
        }
    }
}
window.tryDelete = tryDelete
window.editableUsername = editableUsername;
window.logOut = logOut;
window.showSettings = showSettings;
window.editablePassword = editablePassword;
window.tryChanges = tryChanges
window.applyChanges = applyChanges