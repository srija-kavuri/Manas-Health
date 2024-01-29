
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
    document.getElementById("className").value = userData.className;
    document.getElementById("sectionName").value = userData.sectionName;
    const currentDate = new Date();
    const hour = currentDate.getHours();
    
    let greeting;
    if (hour >= 5 && hour < 12) {
      greeting = `Good morning, ${userData.username}`;
    } else if (hour >= 12 && hour < 17) {
      greeting = `Good afternoon, ${userData.username}`;
    } else {
      greeting = `Good evening, ${userData.username}`;
    }
    document.getElementById('greetingWish').innerHTML = greeting;  
})



document.getElementById("editProfile").addEventListener('click', () => {
  // Enable the input fields
  document.getElementById("username").disabled = false;
  document.getElementById("institute").disabled = false;
  document.getElementById("className").disabled = false;
  document.getElementById("sectionName").disabled = false;
  document.getElementById("username").focus();
  document.getElementById("saveProfile").style.display = "inline-block";
});

document.getElementById("saveProfile").addEventListener('click', () => {
  const username = document.getElementById("username").value;
  const institute = document.getElementById("institute").value;
  const className = document.getElementById("className").value;
  const sectionName = document.getElementById("sectionName").value;
  document.getElementById("username").disabled = true;
  document.getElementById("institute").disabled = true;
  document.getElementById("className").disabled = true;
  document.getElementById("sectionName").disabled = true;

  if (!username || !institute || !className || !sectionName) {
    alert("Please fill in all fields");
    return;
  }

  const userData = {
    username,
    institute,
    className,
    sectionName,
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

function showHiddenCards() {
  // Select all hidden cards and toggle their visibility
  const hiddenCards = document.querySelectorAll('.card.d-none');
  hiddenCards.forEach(card => card.classList.toggle('d-none'));

  // Disable the "View More" button after revealing all cards
  const viewMoreButton = document.querySelector('.link-secondary');
  if (hiddenCards.length === 0) {
      viewMoreButton.disabled = true;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const endpoint = '/test';

  // Function to handle the click event for the General Test button
  document.getElementById("generalTest").addEventListener("click", function () {
      const category = encodeURIComponent("general");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  // Function to handle the click event for the Stress Test button
  document.getElementById("stressTest").addEventListener("click", function () {
      const category = encodeURIComponent("stress");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  // Function to handle the click event for the ADHD Test button
  document.getElementById("adhdTest").addEventListener("click", function () {
      const category = encodeURIComponent("adhd");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  // Function to handle the click event for the Anxiety Test button
  document.getElementById("anxietyTest").addEventListener("click", function () {
      const category = encodeURIComponent("anxiety");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  // Function to handle the click event for the Autism Test button
  document.getElementById("autismTest").addEventListener("click", function () {
      const category = encodeURIComponent("autism");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  // Function to handle the click event for the Dyslexia Test button
  document.getElementById("dyslexiaTest").addEventListener("click", function () {
      const category = encodeURIComponent("dyslexia");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  // Function to handle the click event for the PTSD Test button
  document.getElementById("ptsdTest").addEventListener("click", function () {
      const category = encodeURIComponent("ptsd");
      const url = `${endpoint}?category=${category}`;
      console.log(url);
      window.location.href = `${url}`;
  });

  document.getElementById("depressionTest").addEventListener("click", function () {
    const category = encodeURIComponent("depression");
    const url = `${endpoint}?category=${category}`;
    console.log(url);
    window.location.href = `${url}`;
});
});


    // Add similar event listeners for the other buttons (Depression, Dyslexia, Autism, Anxiety, PTSD)
