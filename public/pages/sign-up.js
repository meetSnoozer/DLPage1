 var email = document.getElementById("email")
  var password = document.getElementById("password")
  var username = document.getElementById("username")
  var regButton = document.getElementById("tryReg");
  function getCode() {
  return `${Math.floor(Math.random() * 10000)}`.padStart(4, '0');
}

console.log(getCode());
  regButton.onclick = function(){
    localStorage.setItem("username",username.value);
    localStorage.setItem("password",password.value);
    localStorage.setItem("email",email.value);
    localStorage.setItem("code",getCode());
    window.location.href = "code.html";
    
    return false;
  }