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

document.getElementById('getStudents').addEventListener('click', ()=>{
  className = document.getElementById('floatingSelect').value;
  sectionName = document.getElementById('sectionForTeacher').value;
  console.log({sectionName, className});
  fetch('/api/getStudents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({className, sectionName})
  }).catch(err=>{
    console.log(`error getting the student details ${err}`);
})
})