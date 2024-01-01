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
  .then(response=>response.text())
  .then(data=>{
    if (data === "success") {
    localStorage.setItem('isLoggedIn','true');
    window.location.replace("/home");

    }else if(data==='user not found'){
      alert('no account with the entered crendentials!');
    }
    else{
      alert('login credentials did not match!');
    }
  })
  .catch(error => {
    // Handle error
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
})
