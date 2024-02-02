fetch('/api/userDetails',{
  method: 'GET',
  headers:{
    'Content-Type': 'application/json',
  },
}).then(response=>response.json())
.then(data=> {const userData = data;
  document.getElementById("username").value = userData.username;
  document.getElementById("email").innerHTML = userData.email;
  document.getElementById("institute").value = userData.institute;
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
  const className = document.getElementById('floatingSelect').value;
  const sectionName = document.getElementById('sectionForTeacher').value;
  let errormsg=[];
  const serror=document.getElementById('studenterror');
  serror.textContent='';
 if(className==='Class'){
  errormsg.push("please select a class");
 }
 else if(sectionName.trim() === ''){
    errormsg.push("please select a section");
 }
 if (errormsg.length>0){
 serror.innerHTML=errormsg.join(", ");

 }else{
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
 }
  
})

// Function to create a table based on data
function createTable(data) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ``;
  // Create a table element
  const table = document.createElement('table');
  table.id='myTable';

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
        const studentEmail = encodeURIComponent(item[key]);
        td.innerHTML = `<a href="/progress/?student=${studentEmail}" target="_blank">progress </a>`
      }else if(key==="currentStatus"){
        console.log(key);
        currentStatusText = ``;
        for(const testCategory in item[key]){
          if(testCategory!="_id"){
            console.log(testCategory);
            console.log(item[key][testCategory]);
            if(currentStatusText){
              currentStatusText+=', '
            }
            currentStatusText+=`${testCategory.toUpperCase()}-${item[key][testCategory]["severity_level"]}`;
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


document.getElementById('searchButton').addEventListener('click', (e)=> {
  const searchinput=document.getElementById('searchInput');
const searchTerm = searchinput.value.toLowerCase();
  const tables = document.getElementById('myTable');
  const rows = tables.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) { 
    const name = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
    const currentStatus = rows[i].getElementsByTagName('td')[3].textContent.toLowerCase();

    if (name.includes(searchTerm)|| currentStatus.includes(searchTerm)) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
});

document.getElementById("editProfile").addEventListener('click', () => {
  // Enable the input fields
  document.getElementById("username").disabled = false;
  document.getElementById("institute").disabled = false;
  document.getElementById("username");
  document.getElementById("saveProfile").style.display = "inline-block";
});

document.getElementById("saveProfile").addEventListener('click', () => {
  const username = document.getElementById("username").value;
  const institute = document.getElementById("institute").value;
  document.getElementById("username").disabled = true;
  document.getElementById("institute").disabled = true;

  if (!username || !institute) {
    alert("Please fill in all fields");
    return;
  }

  const userData = {
    username,
    institute,
  };

  fetch('/api/editProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => {
      if (response.ok) {
       document.getElementById("saveProfile").style.display = "none";

        console.log("Saved successfully");
      } else {
        console.log(response.status); // Log the status code
    console.log(response.statusText);
        alert("Response is not OK");
      }
    })
    .catch(error => {
      alert("Error editing your profile. Please try again");
      console.log(error);
    });
});
