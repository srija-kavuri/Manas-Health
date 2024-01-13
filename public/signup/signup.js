const pass=document.getElementById("password");
const verifypass=document.getElementById("reEnter");
const mform=document.getElementById("myform");
const err=document.getElementById("passerror");
const confirmPassword=document.getElementById("confirmPasswordError");
const passerror=document.getElementById("passwordError");
const regexspecial = /[!@#$&]/;
const regexUpperCase = /[A-Z]/;
const regexDigit = /\d/;
const regexEmail=/gmail\.com/;
const uname=document.getElementById("username");
const nerror=document.getElementById("nameError");
const Email=document.getElementById("email");
const eerror=document.getElementById("emailError");

document.querySelector("#registerbutton").addEventListener('click', (e) => {
let messages=[];
let verify=[];
let nmessages=[];
let emessages=[];


 if (!regexspecial.test(pass.value)) {
    e.preventDefault();
    messages.push("Password must contain at least one special character");
    // return false;
  }
else if (!regexUpperCase.test(pass.value)) {
    messages.push("Password must contain at least one uppercase letter");
    // return false;
  } 
else if (!regexDigit.test(pass.value)) {
    messages.push("Password must contain at least one digit");
    // return false;
  } 
else if(pass.value.length < 6){
    messages.push("password atleast contain 6 characters");
}
else if (pass.value !=verifypass.value){
  verify.push("password and confirm password must be same!");
}
else if(uname.value.trim==='' || uname.value.trim===null){
    nmessages.push("username is required");
}
else if(!regexEmail.test(Email.value)){
 emessages.push("email should be in correct format(@gmail.com)");
}
    if(verify.length>0 || messages.length>0 || emessages.length>0 || nmessages.length>0){

    e.preventDefault();
    passerror.innerHTML=messages.join(',');
    nerror.innerHTML=nmessages.join(', ');
    confirmPassword.innerHTML=verify.join(', ');
    eerror.innerHTML=emessages.join(', ');
    
}
     else {

      e.preventDefault();
      const formData = new FormData(document.querySelector('#myform'));
  console.log('Before fetch');
  console.log(formData);
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
    // body: formData,
  })
    .then(response => {
      if (response.status === 500) {
        alert("Please fill all the fields!");
      } else if (response.status === 400) {

        alert('Account with the email already exists.');
      } else {
        return response.text();
      }
    })
    .then(data => {
      if (data === "Success") {
        // localStorage.setItem('isLoggedIn','true');
        window.location.replace('/verification');
      }
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
}



  
})