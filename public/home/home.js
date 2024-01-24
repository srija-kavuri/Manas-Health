console.log(window.location.pathname);
fetch('/api/userDetails',{
  method: 'GET',
  headers:{
    'Content-Type': 'application/json',
  },
}).then(response=>response.json())
.then(data=> {const userData = data;
  console.log(userData);
  document.getElementById("username").innerHTML = userData.username;
  document.getElementById("email").innerHTML = userData.email;
  document.getElementById("institute").innerHTML = userData.institute;
})



// console.log(userData);

function logout() {
  fetch('/api/logout', {
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then(response=>{
    if(response.ok){
    window.location.replace('/login');
    }else{
     alert("Response is not ok");
    }
  })
  .catch(error=>{
    alert("Error logging out. Please try again.");
    console.log(error);
  })
}
