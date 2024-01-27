const category = encodeURIComponent((window.location.pathname).split('/').pop());

const endpoint = '/getQuestions';

// Construct the URL with the category as a query parameter
const url = `${endpoint}?category=${category}`;

// Fetch the data from the server
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if(data.success){
    console.log(data);
    }
    // Your code to use the data goes here
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors appropriately
  });

