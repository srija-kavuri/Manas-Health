const student = (window.location.pathname).split('/').pop()

fetch(`/api/student/progress/${student}`,{
  method: 'GET',
  headers:{
    'Content-Type': 'application/json',
  },
}).then(response=>response.json())
.then(data=> {
  if(data.success){
    const studentResults = data.progress;
    console.log(studentResults);
  }
})