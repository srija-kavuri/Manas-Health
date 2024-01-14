document.querySelector('#verifyButton').addEventListener('click', ()=>{
  const otpValue = document.getElementById('otp').value;
  console.log(otpValue);
  fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({otp: otpValue}),
  })
  .then(response=>response.text())
  .then(response=>{
    if(response==="verified"){
    window.location.replace("/home");
    }else{
      alert("Wrong otp");
    }
  })
})