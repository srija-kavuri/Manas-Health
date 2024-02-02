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

  // Get the canvas element
  var ctx = document.getElementById('myChart').getContext('2d');
await fetch(`/api/student/progress/?student=${student}`,{
  method: 'GET',
  headers:{
    'Content-Type': 'application/json',
  },
}).then(response=>response.json())
.then(data=> {
  if(data.success){
    studentResults = data.progress;
    console.log(studentResults);
  }
})
  studentResults = [
      { category: 'stress', score: 2, date: '22-03-2005' },
      { category: 'depression', score: 1, date: '23-04-2004' },
      { category: 'adhd', score: 1, date: '26-05-2003' },
      { category: 'general_test', score: 1, date: '20-05-1999' }
  ];

  // Filter the data to exclude 'general_test'
  const filteredList = studentResults.filter(obj => obj.category !== 'general_test');

  // Define data for the chart
  var categorylist = [];
  var scorelist = [];
  var datelist = filteredList.map(item => item.date);

  filteredList.forEach(obj => {
      const capitalizedCategory = obj.category.charAt(0).toUpperCase() + obj.category.slice(1);
      // Store the capitalized category and score in their respective arrays
      categorylist.push(capitalizedCategory);
      scorelist.push(obj.score);
  });

  var data = {
      labels: categorylist,
      datasets: [{
          label: 'Mental Health Issues',
          data: scorelist,
          backgroundColor: 'skyblue',
          borderWidth: 1,
          date: datelist
      }]
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
                  ticks: {
                      callback: function(value, index, values) {
                          // Map numerical values to custom labels
                          const labels = ['Normal', 'Mild', 'Moderate', 'Severe', 'Extremely Severe'];
                          return labels[value - 1]; // Subtract 1 because arrays are zero-indexed
                      }
                  }
              }
          },
          plugins: {
              legend: {
                  display: true,
                  position: 'top',
                 
              }
          },
          layout: {
              padding: {
                  left: 50,
                  right: 50,
                  top: 0,
                  bottom: 0
              }
          },
          scales: {
              x: {
                  grid: {
                      display: false
                  }
              },
              y: {
                  grid: {
                      display: false
                  }
              }
          }
      }
  });
});