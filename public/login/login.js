document.querySelector("#signUp").addEventListener("click", ()=>{
  window.location.replace('/signupPage');
})

document.querySelector('#loginButton').addEventListener('click', (event)=>{
  event.preventDefault();
  const formData = new FormData(document.querySelector('#form'));
  console.log(formData);
  fetch('/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response=>{
    if(response.status === 302){
      window.location.replace(response.url);
    }else{
      return response.text();
    }
  })
  // .then(response=>response.text())
  .then(data=>{
    if(data==='user not found'){
      alert('no account with the entered crendentials!');
    }
    else if(data==='Wrong password'){
      alert('login credentials did not match!');
    }
  })
  .catch(error => {
    // Handle error
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
})
function sendEmail()
{
  email = document.querySelector('#inputEmail').value;
  console.log(JSON.stringify({email}));
  fetch('/sendForgotPasswordMail', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email}),
  }).then(response=>response.text())
  .then(response=>{if(response=='sent'){
    console.log("sent");
  }})
}
document.querySelector('#sendOTP').addEventListener('click', sendEmail)
document.querySelector('#resendOTP').addEventListener('click', sendEmail)

document.querySelector('#verifyOTP').addEventListener('click', ()=>{
  otp = document.querySelector('#inputOTP').value
  fetch('/verifyForgotPasswordOTP', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify({otp}),
  }).then(response=>response.text())
  .then(response=>{if(response=='verified'){
    console.log("verified");
  }})
})