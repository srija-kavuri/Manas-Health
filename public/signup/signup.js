function navigateToLoginPage(){
  window.location.replace('/loginPage');
  // history.replaceState({}, '', '../login/login.html');
  //     // Navigate to the new page
  //   window.location.href = "../login/login.html";
}

function navigateToLandingPage(){
    // Show a confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to go back? The form data will be lost.");
      
    // If the user confirmed, navigate to the new page
    if (userConfirmed) {
      // Replace the current state, preventing the user from going back
      history.replaceState({}, '', '/');
    
      // Navigate to the new page
      window.location.href = '/';
    }
    // If the user canceled, do nothing
  }

  document.querySelector("#login").addEventListener("click", ()=>{
    navigateToLoginPage();
  })

  document.querySelector('#registerbutton').addEventListener('click', (event) => {
    event.preventDefault();
    if (validform()) {
      // Assuming "myform" is the ID of your form
      const formData = new FormData(document.querySelector('#myform'));
      console.log('Before fetch');
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then(response => {
          if(response.status===500){
            alert("Please fill all the fields!");
          }else if(response.status===400){
            
            alert('Account with the email already exists.');
          }
          else{
            return response.text()
          }
        })
        .then(data => {
          if(data==="Success"){
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
  });



function validform() {
  
  
  var fpass = document.getElementById("password").value;
  var confirmPassword = document.getElementById("reEnter").value;

  //RESET
  document.getElementById("confirmPasswordError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";

  // validation rules 
  const iscapital = /[A-Z]/.test(fpass);
  const isnumber = /[0-9]/.test(fpass);
  const isspecial = /[!@#$&]/.test(fpass);

  if ( (iscapital && isnumber && isspecial ) == false){
                document.getElementById("passwordError").innerHTML = "*Password must have a capital letter, a number, a special character, and be at least 6 characters long.";
                return false;
            }
  
  
 
  if (fpass != confirmPassword){
      document.getElementById("confirmPasswordError").innerHTML = "*Password and Confirm password must be same";
  
      return false;
  }  


  return true; // Return false if validation fails
}

