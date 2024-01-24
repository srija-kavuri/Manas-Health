fetch('/api/userDetails',{
  method: 'GET',
  headers:{
    'Content-Type': 'application/json',
  },
}).then(response=>response.json())
.then(data=> {const userData = data;
  document.getElementById("username").innerHTML = userData.username;
  document.getElementById("email").innerHTML = userData.email;
  document.getElementById("institute").innerHTML = userData.institute;
})

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
  fetch('/api/getStudents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({className, sectionName})
  }).then((response)=>{
    if(response.ok){
      return response.json();
    }else{
      console.log("server error");
    }
  }).then((data)=>{
    if(data.success){
      console.log(data.students);
      createTable(data.students);
    }else{
      alert("Cannot find students with the selected class and section");
    }
  })
  .catch(err=>{
    console.log(`error getting the student details ${err}`);
})
})

// Function to create a table based on data
function createTable(data) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ``;
  // Create a table element
  const table = document.createElement('table');

  // Create a header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>S.NO </th><th>STUDENT NAME</th><th>PROGRESS</th><th>CURRENT STATUS</th>';

  table.appendChild(headerRow);

    // Create rows with data
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    const serialNumberCell = document.createElement('td');
    serialNumberCell.textContent = index + 1;
    row.appendChild(serialNumberCell);


    for (const key in item) {
      const td = document.createElement('td');
      if(key==="progress"){
        var param = encodeURIComponent(item[key]);
        td.innerHTML = `<a href="/api/progress/${param}" target="_blank">progress </a>`
      }else if(key==="currentStatus"){
        console.log(key);
        currentStatusText = ``;
        for(const testCategory in item[key]){
          if(testCategory!="_id"){
            console.log(testCategory);
            console.log(item[key][testCategory]);
            currentStatusText+=`${testCategory.toUpperCase()}-${item[key][testCategory]}\n`;
          }
        }
        td.textContent=currentStatusText;
      }
      
      else{
        td.textContent = item[key];
      }
      row.appendChild(td);
    }
    table.appendChild(row);
  });

  // Append the table to the container
  tableContainer.appendChild(table);
}

  // Call the function with the backend data
