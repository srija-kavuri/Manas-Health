const urlParams = new URLSearchParams(window.location.search);

const category = encodeURIComponent(urlParams.get('category'));
const result = encodeURIComponent(urlParams.get('result'));
let percentage = Math.round(urlParams.get('percentage'));

let progressStartValue = 0,    
    progressEndValue;   
    speed = 10;
if(category==='general_test'){
    console.log("yes");
    percentage=25;
    speed=10;
}
if(percentage===0){
    percentage = 1;
}

progressEndValue=percentage;


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
    document.getElementById('testCategory').innerHTML = category;


    
let progress = setInterval(() => {
    progressStartValue++;
    if(category==='general_test'){
    progressValue.textContent = `${result}`;
    }else{
        progressValue.textContent = `${progressStartValue}%`;
    }
    circularProgress.style.background = `conic-gradient(#006a6e ${progressStartValue * 3.6}deg, #ededed 0deg)`

    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }    
    }, speed);
        } else {
            console.log(response.message);
        }

        // const adviceArray = [
        //     "We regret to inform you that the recent test results indicate a severe outcome. It's important to address this situation promptly and proactively.",
        //     "Schedule an appointment with your healthcare provider to discuss the results and gain a comprehensive understanding.",
        //     "Timely action is crucial to address the severity of the situation.",
        //     "Inform your close family members and friends about the situation.",
        //     "Seek emotional support from your loved ones during this challenging time.",
        //     "Prioritize your mental health and consider seeking counseling or therapy."
        // ];
        const adviceArray = response.data.message;

        // Create an unordered list element
    const ulElement = document.createElement('ul');

    // Iterate through the array and create list items with bullet points
    adviceArray.forEach((advice, index) => {
        const liElement = document.createElement('li');
        liElement.textContent = advice;
        liElement.style.fontSize = '18px';
        ulElement.appendChild(liElement);
    });

    // Append the unordered list to the body
    document.getElementById('message').appendChild(ulElement);
    })
    .catch(error => {
        console.error("error fetching the data", error);
    });

    document.getElementById('progress').addEventListener('click', ()=>{
        window.location.replace('http://localhost:5500/progress');
    })