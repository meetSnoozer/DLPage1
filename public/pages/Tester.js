  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 import { getFirestore, collection,setDoc,doc,addDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

  //import 'dotenv/config';
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtDBFbZ9QBhqchyaPVAce145IMPzekYWA",
    authDomain: "dlpage-e807c.firebaseapp.com",
    projectId: "dlpage-e807c",
    storageBucket: "dlpage-e807c.firebasestorage.app",
    messagingSenderId: "216742989828",
    appId: "1:216742989828:web:c8193623b5ecc8a1862551"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
    console.log("Firebase initialized", auth);
  const db = getFirestore(app);
console.log("db initialized", db);



  var email = document.getElementById("email")
  var password = document.getElementById("password")
  var username = document.getElementById("username")
  var regButton = document.getElementById("tryReg");

/*
const db = getFirestore(app);
const collectionRef = collection(db,"DataScapePlayerBase");
    const firebaseQuery = await getDocs(collectionRef);

*/
    const dt ={
      username: username,
      highesLevel: 0,
      coins: 0,
      highscores:[],
      skins:[],
      bestTimes:[],
      achievements:[]
    }
   
  
    regButton.onclick = async()=>{
      const docRef = await setDoc(doc(db, "DataScapePlayerBase",email.value), {
       username: username.value,
      highesLevel: 0,
      coins: 0,
      highscores:[],
      skins:[],
      bestTimes:[],
      achievements:[]
    });
    }
async function createDocument() {
  try {
    const docRef = await setDoc(doc(db, "DataScapePlayerBase",email), {
       username: username,
      highesLevel: 0,
      coins: 0,
      highscores:[],
      skins:[],
      bestTimes:[],
      achievements:[]
    });

    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}
  /*
  function(){
    console.log(`Email : ${email.value}`)
    console.log(`Password : ${password.value}`)
    console.log(`Username : ${username.value}`)
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
})
  } 
  function showDetails(){
    console.log(`Email : ${email}`)
    console.log(`Password : ${password}`)
    console.log(`Username : ${username}`)
    
  }*/