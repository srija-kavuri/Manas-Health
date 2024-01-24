fetch('/api/student/progress',{
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