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

// Graph
document.addEventListener('DOMContentLoaded', function() {
  // Get the canvas element
  var ctx = document.getElementById('myChart').getContext('2d');

  // Define data for the chart
  var data = {
      labels: ['Stress', 'ADHD', 'Depression', 'Dyslexia', 'Autism', 'Anxiety', 'PTSD'],
      datasets: [{
          label: 'Mental Health Issues',
          data: [1, 4, 3, 5, 2, 4, 3], // Numerical data (Mild: 1, Normal: 2, High: 3)
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
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
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1
                  }
              },
              y: {
                  ticks: {
                      callback: function(value, index, values) {
                          // Map numerical values to custom labels
                          const labels = [ 'Normal', 'Mild', 'Moderate', 'Severe', 'Extremely Severe'];
                          return labels[value - 1]; // Subtract 1 because arrays are zero-indexed
                      }
                  }
              }
          }
      }
  });
});
