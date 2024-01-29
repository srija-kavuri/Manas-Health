const urlParams = new URLSearchParams(window.location.search);
let student;
if(urlParams){
  student = encodeURIComponent(urlParams.get('student'));
}

fetch(`/api/student/progress/?student=${student}`,{
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