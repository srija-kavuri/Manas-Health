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
const School=document.getElementById("school");
const serror=document.getElementById("schoolError");
const classerror = document.getElementById("classerror");

const cerror=document.getElementById("catError");
let category;

document.getElementById('registerbutton').addEventListener('click', (e) => {
  let messages = [];
  let verify = [];
  let nmessages = [];
  let emessages = [];
  let smessages = [];
  let cmessages = [];
  e.preventDefault();
  var radioButtons = document.querySelectorAll('input[name="category"]');
  var isChecked = Array.from(radioButtons).some(function (radioButton) {
    if(radioButton.checked){
      category = radioButton.value;
      console.log(category);
    }
    return radioButton.checked;
  });
  // const teachercheckbox = document.querySelectorAll('#Teacher');
  // const studentcheckbox = document.querySelectorAll('#Student');
 
  const dropdown=document.getElementById('floatingSelect');
  const sec=document.getElementById('Section');

  if (uname.value.trim() === '') {
    nmessages.push("Please enter your name");
  } 
  else if(!isChecked){
    cmessages.push("category");
  }else if(category==='Student' && (dropdown.value==="Class" || sec.value.trim()==='')){
    if (dropdown.value==="Class"){
      console.log("no class");
     cmessages.push("class");
    }

    if (sec.value.trim()===''){
      console.log("no section");

     cmessages.push("section");
    }
   }
  else if (School.value.trim() === '') {
    smessages.push("Please enter your institute name");}
  // } else if (!teachercheckbox.ischecked && !studentcheckbox.ischecked) {
  //   cmessages.push("category is required");
  // }
    
    
   else if (!regexEmail.test(Email.value)) {
    emessages.push("email should be in the correct format (@gmail.com)");
  } else if (!regexspecial.test(pass.value)) {
    messages.push("Password must contain at least one special character");
  } else if (!regexUpperCase.test(pass.value)) {
    messages.push("Password must contain at least one uppercase letter");
  } else if (!regexDigit.test(pass.value)) {
    messages.push("Password must contain at least one digit");
  } else if (pass.value.length < 6) {
    messages.push("password must be at least 6 characters");
  } else if (pass.value !== verifypass.value) {
    verify.push("password and confirm password must be the same!");
  }

  

  if (cmessages.length > 0 || smessages.length > 0 || verify.length > 0 || messages.length > 0 || emessages.length > 0 || nmessages.length > 0) {
    passerror.innerHTML = messages.join(',');
    nerror.innerHTML = nmessages.join(', ');
    confirmPassword.innerHTML = verify.join(', ');
    eerror.innerHTML = emessages.join(', ');
    serror.innerHTML = smessages.join(', ');
    if(cmessages.length > 0){
      cerror.innerHTML = `Please select a ${cmessages.join(' and ')}`; // Display the category error
    }else{
      cerror.innerHTML = ``;
    }
  } 



     else {
      console.log("entered else block");

      const formData = new FormData(document.querySelector('#myform'));
      console.log('Before fetch');
      
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log(formDataObject);
      
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      })
      
    .then(response => {
      console.log(response.status);
      if (response.status === 500) {
        alert("An error occured please try again");
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.success) {
        localStorage.setItem("userEmail", Email.value);
        window.location.replace('/verification');
      }
         else if(data.message=== "Field(s) are empty"){
        alert("Please fill all the fields");
      }else{
        alert('Account with the email already exists.');
      }
     })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
}

})


function toggleInput(){
  var inputElement = document.getElementById("class&section");

  if (inputElement.style.display === "none") {
    inputElement.style.display = "block"; // Show the input
} 
}

function hide(){
  var inputElement = document.getElementById("class&section");

  if (inputElement.style.display === "block") {
    inputElement.style.display = "none"; // Show the input
} else {
    inputElement.style.display = "none"; // Hide the input
}
}