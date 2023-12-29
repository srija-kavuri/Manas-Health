// console.log("hi");
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

  document.querySelector(".login").addEventListener("click", ()=>{
    navigateToLoginPage();
  })

  document.querySelector('#registerbutton').addEventListener('click', (event) => {
    event.preventDefault();
    if (validform()) {
      // Assuming "myform" is the ID of your form
      const formData = new FormData(document.querySelector('.myform'));
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
  
function validform(){

    let fpass = document.forms['myform']['password'].value;
    // set conditions
    const iscapital = /[A-Z]/.test(fpass);
    const isnumber = /[0-9]/.test(fpass);
    const isspecial = /[!@#$&]/.test(fpass);
    let passwordError = document.getElementById('pass');
    if ( (iscapital && isnumber && isspecial ) == false){
        passwordError.innerHTML = '*The password must contain atleast 6 characters,an uppercase letter,a number and a special character.';
        passwordError.style.color = 'red';
        return false;
    }
    
    let confirm = document.forms['myform']['re-enter'].value;
    let confirmPasswordErrorHTML=document.getElementById("confirmPasswordError");
    if (fpass != confirm){
      confirmPasswordErrorHTML.innerHTML='*Password and Confirm password must be same';
      confirmPasswordErrorHTML.style.color='red';
        return false;
    }  
    return true;
    // let email=document.forms["myform"]["mail"].value;
    // let y=getElementById("email");
    // if (email.length <8 || email.length >25){
    //     y.innerHTML="email should contain atleast characters and atmost 20.";
    //     return false;
    // }
}

