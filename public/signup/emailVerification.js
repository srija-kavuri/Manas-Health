document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById("emailInput").value = localStorage.getItem("userEmail");
})



function toggleInput(){
    var emailElement = document.getElementById("emailInput");
    var confirmBtn = document.getElementById("confirmEmailBtn");

    emailElement.disabled = false;

    if (confirmBtn.style.display === "none"){
        confirmBtn.style.display = "block";
    }
}

function sendMail(){
    var confirmBtn = document.getElementById("confirmEmailBtn");
    var emailElement = document.getElementById("emailInput");
    emailElement.disabled = true;

    if(confirmBtn.style.display === "block"){
        confirmBtn.style.display = "none";
    }
    const email = document.getElementById('emailInput').value;

    fetch('/api/changeemail', {
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    }).then(response=>response.json())
    .then(status=>{if(status.success){
        console.log("otp sent to updated email");
        const newEmail = document.getElementById("emailInput").value 
        localStorage.removeItem("userEmail");
        localStorage.setItem("userEmail", newEmail);
    }else{
        alert("error seding otp to the updated email");
    }}).catch(()=>{
        console.log('Error sending request to the server');
    })
}

function resendOTP(){
  fetch('/api/resendotp', {
    method:'POST',
    headers: {
    'Content-Type': 'application/json',
    },
}).then(response=>response.json())
.then(status=>{if(status.success){
    console.log("otp resent");
}else{
    alert("error reseding otp");
}}).catch(()=>{
    console.log('Error sending request to the server');
})
}

document.querySelector('#verifyButton').addEventListener('click', (event)=>{
  event.preventDefault();
    const otpValue = document.getElementById('inputOTP').value;
    fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({otp: otpValue}),
    })
    .then(response=>response.json())
    .then(response=>{
      if(response.success){
      window.location.replace("/home");
      }else{
        alert("Wrong otp");
      }
    })
  })