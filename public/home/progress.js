const username=sessionStorage.getItem("username");
const email = sessionStorage.getItem("emial");
const institute= sessionStorage.getItem("institute");
const className= sessionStorage.getItem("className");
const sectionName= sessionStorage.getItem("sectionName");
document.getElementById("username").innerHTML = username; 
  document.getElementById("email").innerHTML = email; 
  document.getElementById("institute").innerHTML = institute;
    document.getElementById("className").innerHTML = className;
    document.getElementById("sectionName").innerHTML = sectionName;
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
const urlParams = new URLSearchParams(window.location.search);
let student;
if(urlParams){
  student = encodeURIComponent(urlParams.get('student'));
}



// Graph
document.addEventListener('DOMContentLoaded',async function() {
  let studentResults;
  let history;
  // Get the canvas element
await fetch(`/api/student/progress/?student=${student}`,{
  method: 'GET',
  headers:{
    'Content-Type': 'application/json',
  },
}).then(response=>response.json())
.then(data=> {
  if(data.success){
    studentResults = data.progress;

    history = data.history;
    console.log(studentResults);
    document.getElementById('noProgress').style.display='none';
  }
})
var ctx = document.getElementById('myChart').getContext('2d');

//   studentResults = [
//       { category: 'stress', percentage: 2, date: '22-03-2005' },
//       { category: 'depression', percentage: 1, date: '23-04-2004' },
//       { category: 'adhd', percentage: 1, date: '26-05-2003' },
//       { category: 'general_test', percentage: 1, date: '20-05-1999' }
//   ];

if(studentResults &&studentResults.length>0){

  // Filter the data to exclude 'general_test'
  const filteredList = studentResults.filter(obj => obj.category !== 'general_test');

  // Define data for the chart
  var categorylist = [];
  var percentagelist = [];
  var datelist = filteredList.map(item => item.date);

  filteredList.forEach(obj => {
      const capitalizedCategory = obj.category.charAt(0).toUpperCase() + obj.category.slice(1);
      // Store the capitalized category and score in their respective arrays
      categorylist.push(capitalizedCategory);
      percentagelist.push(obj.percentage);
  });

  var labelWithDate = categorylist.map((category, index) => `${category} : ${datelist[index]}`);
  var data = {
      labels: labelWithDate,
      datasets: [{
          label: 'Percentage',
          data: percentagelist,
          backgroundColor: 'skyblue',
          borderWidth: 1,
          date: datelist
      },
    ]
  };

  // Create the chart
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  barThickness: 10,
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1
                  }
              },
              y: {
                  max:100,
                  grid:{
                    display:false,
                  },
                  ticks: {
                      stepSize:10
                  }
              }
          },
          plugins: {
              legend: {
                  display: true,
                  position: 'top',
              },
              
          },
          layout: {
              padding: {
                  left: 50,
                  right: 50,
                  top: 0,
                  bottom: 0
              }
          },
      }
  });
//   to render history
  createTable(history)

}});

function createTable(data) {
    console.log(data)
  data.forEach((item)=>Reflect.deleteProperty(item, '_id'));
  data.forEach((item)=>Reflect.deleteProperty(item, 'userInputs'));
  data.forEach((item)=>Reflect.deleteProperty(item, 'percentage'));
  console.log(data);

    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ``;
    // Create a table element
    const table = document.createElement('table');
    table.id='myTable';
  
    // Create a header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>S.NO </th><th>Test category</th><th>status</th><th>date</th>';
  
    table.appendChild(headerRow);
  
      // Create rows with data
    data.forEach((item, index) => {
      const row = document.createElement('tr');
      const serialNumberCell = document.createElement('td');
      serialNumberCell.textContent = index + 1;
      row.appendChild(serialNumberCell);
  
  
      for (const key in item) {
        const td = document.createElement('td');
        // if(key==="progress"){
        //   const studentEmail = encodeURIComponent(item[key]);
        //   td.innerHTML = `<a href="/progress/?student=${studentEmail}" target="_blank">progress </a>`
        // }else if(key==="currentStatus"){
        //   currentStatusText = ``;
        //     console.log(item[key]);
        //     item[key].forEach(Element=>{
        //       if(currentStatusText){
        //         currentStatusText+=', '
        //       }
        //       currentStatusText +=`${Element.category.toUpperCase()}-${Element.severity_level}`;
        //     })
  
        //   td.textContent=currentStatusText;
        // }
        
        if(key!="percentage"&& key!="userInputs"&& key!='_id'){
          td.textContent = item[key];
        }
        row.appendChild(td);
      }
      table.appendChild(row);
    });
  
    // Append the table to the container
    tableContainer.appendChild(table);
  }
  

