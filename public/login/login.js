function navigateToSignupPage(){
  window.location.href = "../signup/signup.html";
}

function navigateToLandingPage(){
  // Show a confirmation dialog
  const userConfirmed = window.confirm("Are you sure you want to go back? The form data will be lost.");
    
  // If the user confirmed, navigate to the new page
  if (userConfirmed) {
    // Replace the current state, preventing the user from going back
    history.replaceState({}, '', '../index.html');
  
    // Navigate to the new page
    window.location.href = '../index.html';
  }else {
    // If the user canceled, prevent the default behavior (e.g., navigation)
    event.preventDefault();
  }
  // If the user canceled, do nothing
}

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
    if(data==="success"){
      history.replaceState({}, '', '../index.html');

      window.location.href="../home.html";
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
