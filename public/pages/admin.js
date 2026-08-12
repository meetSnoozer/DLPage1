  const sCount = document.getElementById("saleCount");
  const sTotal = document.getElementById("saleTotal");
  const tAccounts = document.getElementById("totalAccounts");
  const sRundown = document.getElementById("sales-rundown");
  const resetButton = document.getElementById("reset");
  const playerRundown = document.getElementById("player-rundown");
  const label = document.getElementById("month");
  const currentDate = new Date();
  const currentMonthSalesTxt = document.getElementById("monthTotal")
  const lastMonthSalesTxt = document.getElementById("lastMonthTotal")
  const growthTxt = document.getElementById("growthTxt")
  const yearSaleTxt = document.getElementById("yearSale");
  console.log(currentDate);
  console.log(currentDate.getMonth());
  console.log(currentDate.getDate());
  let currentMonth = currentDate.getMonth().toString();
  
  const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#nodePassword');
const eyeIcon = document.querySelector('#eyeIcon');

togglePassword.addEventListener('click', function () {
    // Check the current type
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Change the type
    passwordInput.setAttribute('type', type);
    
    // Toggle the icon (Eye vs Eye-Slash)
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
    
    // Optional: Add a 'flicker' effect when revealing
    passwordInput.style.opacity = "0.5";
    setTimeout(() => { passwordInput.style.opacity = "1"; }, 100);
});
  //console.log(currentDate.getMonth().toString.length);
  let transactions = [];
  let players = [];
  let currentMonthCompared=[]
  let lastMonthCompared=[]
  let monthlySales=[]
  let dayLabels=[]
  let currentEmail="";
  let saleCount = 0;
  let saleTotal = 0;
  let totalAccounts = 0;
  let currentMonthSales=0;
  let lastMonthSales=0;
  let annualSales=0;
  sCount.innerHTML = `${saleCount} total sales`;
  sTotal.innerHTML = `${saleTotal} total amount`;
tAccounts.innerHTML = `${totalAccounts} accounts`;
class transaction{
    constructor(amount,date,item,buyer){
        this.amount = amount;
        this.date = date;
        this.item = item;
        this.buyer=buyer;
    }
}
class playerInfo{
  constructor(username,email,status){
    this.username = username;
    this.email = email;
    this.status = status;
  }
}

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
  import { getFirestore, collection,getDocs} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
  import { doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';





 const firebaseConfig = {
    apiKey: "AIzaSyCtDBFbZ9QBhqchyaPVAce145IMPzekYWA",
    authDomain: "dlpage-e807c.firebaseapp.com",
    projectId: "dlpage-e807c",
    storageBucket: "dlpage-e807c.firebasestorage.app",
    messagingSenderId: "216742989828",
    appId: "1:216742989828:web:c8193623b5ecc8a1862551"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const collectionRef = collection(db,"DataScapeSales");
  const firebaseQuery = await getDocs(collectionRef);
  firebaseQuery.forEach((doc)=>{
    const samp = new transaction(doc.data().amount,doc.data().date,doc.data().item,doc.data().buyer);
    console.log(samp);
    transactions.push(samp);

  })

tAccounts.innerHTML = `${totalAccounts} accounts`;


function resetDisplay(month){
  let selectedMonth=month;

  saleCount=0;
  saleTotal = 0;
  const elements = document.getElementsByClassName("tempContainer");
  while(elements.length>0){
    elements[0].parentNode.removeChild(elements[0]);
  }
//const tCont = document.querySelectorAll(".tempContainer");
  label.innerHTML=monthNames[month-1];


transactions.forEach(e=>{
  
  const month = e.date.slice(4,6);
  if(month!=selectedMonth){
    return;
  }
    console.log(e.item)
    const newDiv = document.createElement('div');
    const newRow = document.createElement('tr');
    const rowDate = document.createElement('th');
    const rowItem = document.createElement('th');
    const rowAmount = document.createElement('th');
    const rowName = document.createElement('th');
    
    newDiv.className = "top-inner-container";
    //const newDate = document.createElement('p');
    //const newItem = document.createElement('p');
    //const newAmount = document.createElement('p');
    

    const dt = `${e.date.slice(0,4)}-${e.date.slice(4,6)}-${e.date.slice(6,8)}`
    //newDate.textContent = dt;
    //newItem.textContent = e.item;
    //newAmount.textContent = e.amount;
    rowDate.textContent = dt;
    rowItem.textContent = e.item;
    rowAmount.textContent=e.amount;
    rowName.textContent=e.buyer;
    newRow.appendChild(rowDate);
    newRow.appendChild(rowItem);
    newRow.appendChild(rowAmount);
    newRow.appendChild(rowName);

    //newDiv.appendChild(newDate);
    //newDiv.appendChild(newItem);
    //newDiv.appendChild(newAmount);
    //const temp = document.createElement('div');
    //temp.className="tempContainer";
    //temp.appendChild(newRow);
    newRow.className="tempContainer";
    sRundown.appendChild(newRow);
    saleCount++;
    saleTotal+=e.amount;
})
sCount.innerHTML = `${saleCount} total sales`;
  sTotal.innerHTML = `${saleTotal} total amount`;
}
function rbut(){
  resetDisplay(1);
}
resetButton.onclick=rbut;
const mmm = 
resetDisplay(currentDate.getMonth()+1);
const monthSelector = document.getElementById("mSelect");
monthSelector.value = currentMonth;
monthSelector.addEventListener("change",function(event){
  console.log(event.target.value);
  resetDisplay(event.target.value);
})
function changePage(indexId){
  console.log(indexId);
}
function openEditModal(username, email, status) {
    const modal = new bootstrap.Modal(document.getElementById('editPlayerModal'));
    document.getElementById('editUsername').value = username;
    document.getElementById('editPlayerId').value = email; // Using email as ID based on your code
    document.getElementById('editStatus').value = status;
    currentEmail = email;
    modal.show();
}
async function loadPlayerInfo() {
   const playerCollection = collection(db,"DataScapePlayerBase");
  const playerQuery = await getDocs(playerCollection);
  playerQuery.forEach((doc)=>{
    const playerObject = new playerInfo(doc.data().username,doc.id,doc.data().status);
    players.push(playerObject);
  })
  players.forEach(element => {
    console.log(element);
    const newRow = document.createElement('tr');
    const rowName = document.createElement('th');
    const rowEmail = document.createElement('th');
    const rowStatus = document.createElement('th');
    const rowSettings = document.createElement('th');
    rowName.textContent = element.username;
    rowEmail.textContent = element.email;
    rowStatus.textContent=element.status;
    const accountEditor = document.createElement('button');
    //accountEditor.classList.add("fas", "fa-cog", "me-2");
    accountEditor.innerHTML = '<i class="fas fa-cog"></i>';
    accountEditor.className = "btn-neon btn-sm";
    accountEditor.onclick = () => openEditModal(element.username, element.email, element.status);
    rowSettings.appendChild(accountEditor);
    newRow.appendChild(rowName);
    newRow.appendChild(rowEmail);
    newRow.appendChild(rowStatus);
    newRow.appendChild(rowSettings);
    newRow.className = "playerEntry";
    playerRundown.appendChild(newRow);
  });
  
}
export function showPlayerBase(){
  if(players.length==0){
loadPlayerInfo();
  }  
}

export async function updateInfo(){
  const updatedUsername = document.getElementById('editUsername').value;
      const updatedStatus = document.getElementById('editStatus').value;
      const updatedPassword = document.getElementById('nodePassword').value;
  players.forEach(element => {
    if(element.email==currentEmail){
      
      element.username = updatedUsername;
      element.status=updatedStatus;
    }
  });
  const elements = document.getElementsByClassName("playerEntry");
  while(elements.length>0){
    elements[0].parentNode.removeChild(elements[0]);
  }
  const playerDocRef = doc(db, "DataScapePlayerBase", currentEmail);

    try {
        // This only overwrites the fields listed below
        await updateDoc(playerDocRef, {
            username: updatedUsername,
            status: updatedStatus
        });
        if(updatedPassword!=""){
          changePassword(updatedPassword);
        }
        console.log("⚡ Data Overwritten: Other sectors preserved.");
    } catch (error) {
        console.error("Critical failure during sync:", error);
    }
  players.forEach(element => {
    console.log(element);
    const newRow = document.createElement('tr');
    const rowName = document.createElement('th');
    const rowEmail = document.createElement('th');
    const rowStatus = document.createElement('th');
    const rowSettings = document.createElement('th');
    rowName.textContent = element.username;
    rowEmail.textContent = element.email;
    rowStatus.textContent=element.status;
    const accountEditor = document.createElement('button');
    //accountEditor.classList.add("fas", "fa-cog", "me-2");
    accountEditor.innerHTML = '<i class="fas fa-cog"></i>';
    accountEditor.className = "btn-neon btn-sm";
    accountEditor.onclick = () => openEditModal(element.username, element.email, element.status);
    rowSettings.appendChild(accountEditor);
    newRow.appendChild(rowName);
    newRow.appendChild(rowEmail);
    newRow.appendChild(rowStatus);
    newRow.appendChild(rowSettings);
    newRow.className = "playerEntry";
    playerRundown.appendChild(newRow);
  });
}
  async function changePassword(newPassword) {
    try{
      await sendPasswordResetEmail(auth,currentEmail);
      alert("Password Reset Link Sent To The User Email.");
    }
    catch(error){
      alert("Error: "+error.message)
    }
  }
   const ctx = document.getElementById('salesChart').getContext('2d');


export function getDailySales(){
  let mn = currentDate.getMonth()+1;
  console.log(mn)
  let monthSt = mn<10 ? `0${mn}` : `${mn}`;
  let lastMonth = mn>1 ?  mn-1 : 12;
  let lastMonthSt = lastMonth<10 ? `0${lastMonth}` : `${lastMonth}`
  dayLabels=[]
  lastMonthCompared=[]
  currentMonthCompared=[]
  currentMonthSales=0
  lastMonthSales=0
  for(let i =1;i<=currentDate.getDate();i++){
    dayLabels.push(i.toString());
    currentMonthCompared.push(0);
    lastMonthCompared.push(0);
  }
  transactions.forEach(element => {
    //console.log(`${element.date.slice(6,8)}: ${element.amount}`)
    const month = element.date.slice(4,6);
  if(month==monthSt){
    let transactionDate=element.date.slice(6,8);
    let dateParsed = parseInt(transactionDate,10);
    currentMonthCompared[dateParsed-1]+=element.amount;
    currentMonthSales+=element.amount;
  }
 if(month==lastMonthSt){
  let transactionDate=element.date.slice(6,8);
    let dateParsed = parseInt(transactionDate,10);
    lastMonthCompared[dateParsed-1]+=element.amount;
    lastMonthSales+=element.amount;
 }
  });
  let growth = (currentMonthSales-lastMonthSales)/lastMonthSales
  let growthRate = Math.round(growth*100)/100;
  lastMonthSalesTxt.textContent = `Php ${lastMonthSales}`;
  currentMonthSalesTxt.textContent = `Php ${currentMonthSales}`
  growthTxt.textContent = `${growthRate*100}%`;
const salesChart = new Chart(ctx, {
    type: 'line', // The chart type
    data: {
        labels: dayLabels, // Days of the month
        datasets: [
    {
        label: `Current Month (${monthNames[mn-1]})`,
        data: currentMonthCompared,
        
        // --- NEON GREEN SETTINGS ---
        borderColor: '#39FF14', // Neon Green Line
        backgroundColor: 'rgba(57, 255, 20, 0.2)', // Neon Glow Fill
        pointBackgroundColor: '#39FF14', // Color of the dots
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#39FF14',
        // ---------------------------
        
        fill: true,
        tension: 0.4 
    },
    {
        label: `Last Month (${monthNames[lastMonth-1]})`,
    data: lastMonthCompared,
    
    // --- EDIT APRIL LINE COLOR HERE ---
    borderColor: '#BF00FF',          // Bold Neon Violet Line
    backgroundColor: 'rgba(191, 0, 255, 0.15)',
    borderWidth: 2,                          // Make it slightly thinner than the neon line
    borderDash: [5, 5],                      // The "dashed" look helps distinguish "past" from "present"
    // ----------------------------------

    fill: false,
    tension: 0.4,
    pointRadius: 0
    }
]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: 'white' } // Matches dark theme
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#bdc3c7' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: '#bdc3c7' },
                grid: { display: false }
            }
        }
    }
});

 


}
//sales chart
const annualChart = document.getElementById('annualReport').getContext('2d');
   
export function getMonthlySales(){

  monthlySales=[]
  annualSales=0;
  for(let i =1;i<=12;i++){
    monthlySales.push(0)
  }
  transactions.forEach(element => {
    //console.log(`${element.date.slice(6,8)}: ${element.amount}`)
    const month = element.date.slice(4,6);
    let monthInt = parseInt(month,10);
    monthlySales[monthInt-1]+=element.amount;
    annualSales+=element.amount;
  });
  yearSaleTxt.textContent = `Php ${annualSales}`
const salesChart = new Chart(annualChart, {
    type: 'line', // The chart type
    data: {
        labels: monthNames, // Days of the month
        datasets: [
    {
        label: `${currentDate.getFullYear()} Sales Report`,
        data: monthlySales,
        
        // --- NEON GREEN SETTINGS ---
        borderColor: '#39FF14', // Neon Green Line
        backgroundColor: 'rgba(57, 255, 20, 0.2)', // Neon Glow Fill
        pointBackgroundColor: '#39FF14', // Color of the dots
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#39FF14',
        // ---------------------------
        
        fill: true,
        tension: 0.4 
    },
    
]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: 'white' } // Matches dark theme
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#bdc3c7' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: '#bdc3c7' },
                grid: { display: false }
            }
        }
    }
});

 


}

window.updateInfo = updateInfo;
window.showPlayerBase = showPlayerBase;
window.getDailySales = getDailySales;
window.getMonthlySales = getMonthlySales;