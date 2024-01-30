const urlParams = new URLSearchParams(window.location.search);

const category = encodeURIComponent(urlParams.get('category'));
const result = encodeURIComponent(urlParams.get('result'));
const url = `/api/result?category=${category}&result=${result}`;

fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error("response is not ok");
            // Return a rejected promise to trigger the catch block with the error
            return Promise.reject('Error fetching data');
        }
    })
    .then(response => {
        if (response.success) {
            console.log(response.data);
            let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");
    progressValue.innerHTML = result;

let progressStartValue = 0,    
    progressEndValue = response.data.value;   
    speed = 10;
    
let progress = setInterval(() => {
    progressStartValue++;

    // progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`

    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }    
}, speed);
        } else {
            console.log(response.message);
        }
    })
    .catch(error => {
        console.error("error fetching the data", error);
    });
