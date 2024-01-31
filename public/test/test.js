let testdata;
const urlParams = new URLSearchParams(window.location.search);

// Get individual parameter values
const category = encodeURIComponent(urlParams.get('category'));
const endpoint = '/api/getQuestions';

// Construct the URL with the category as a query parameter
const url = `${endpoint}?category=${category}`;

// Fetch the data from the server
document.addEventListener('DOMContentLoaded', ()=>{
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(response => {
    if(response.success){
    testdata = response.data;
    var questionsData = testdata.questions;
  

  var currentQuestionIndex = 0; // Track the current question index
  var selectedoptions=[];
  function showQuestion() {
    var submitButton = document.getElementById('nextButton'+currentQuestionIndex);
    submitButton.disabled = true;
    var questionsContainers = document.querySelectorAll('.question-container');

    questionsContainers.forEach(function(container, index) {
      container.style.display = index === currentQuestionIndex ? 'block' : 'none';
    });

    // Update the "Next" button to show the next question or submit the form
    var submitButton = document.getElementById('nextButton'+currentQuestionIndex);
    var buttonText = currentQuestionIndex === questionsContainers.length - 1 ? 'Submit' : 'Next';
     submitButton.textContent = buttonText;

    var radioButtons=document.querySelectorAll('input[name="question'+currentQuestionIndex+'"]');
    radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function (event) {
    var anyRadioButtonSelected=event.target.checked;
    var submitBtn=document.getElementById('nextButton'+currentQuestionIndex);
    submitBtn.disabled = !anyRadioButtonSelected;
      });
      
      });
    // Hide "Prev" button for the first question
    var prevButton = document.getElementById('prevButton');
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    updatequestion(currentQuestionIndex);
  }
  
  var currentquestion=document.createElement("div");
   currentquestion.id="questionProgress";
   var questiodisplay=document.createElement('h4');
   
   function updatequestion(currentQuestionIndex){
   questiodisplay.textContent="Question "+(currentQuestionIndex+1)+"   of "+questionsData.length;
    currentquestion.appendChild(questiodisplay);
    document.body.appendChild(currentquestion);
  }

  var testheading = document.getElementsByClassName('testNameContainer')[0];
var testnamediv = document.createElement("h1");
testnamediv.textContent = testdata.category;
testheading.appendChild(testnamediv);
  // Create divs for each question
  var buttonContainer = document.getElementById("buttonContainer");

  questionsData.forEach(function(data, index) {
    var questionDiv = document.createElement("div");
    questionDiv.className = "question-container p-3";
    questionDiv.id = "question" + (index + 1);
    var questionNo = document.createElement("h2");
    questionNo.textContent = "Question " + (index + 1);
    var questionTitle = document.createElement("h3");
    questionTitle.textContent = data.question;
    questionTitle.classList.add("p-4");
    questionDiv.appendChild(questionNo);

    var questionIcon = document.createElement("div");
    questionIcon.innerHTML = `
      <div class="question-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-dash-lg custom-line" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h30a.5.5 0 0 1 0 1H1A.5.5 0 0 1 1 8"/>
        </svg>
      </div>
    `;
    questionIcon.className = "question-icon";
    questionDiv.appendChild(questionIcon);
    questionDiv.appendChild(questionTitle);
    data.options.forEach(function(option, optionIndex) {
      var radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "question" + index;
      if(testdata.category==="dyslexia"){
        radioBtn.value=optionIndex+1;
      }
      else{
        radioBtn.value = optionIndex;
      }
      radioBtn.id = "option" + index + "_" + (optionIndex + 1);
      radioBtn.classList.add("btn-check");

      var label = document.createElement("label");
      label.htmlFor = "option" + index + "_" + (optionIndex + 1);
      label.textContent = option;
      label.classList.add("btn", "btn-lg", "custom-options");
       
      radioBtn.addEventListener('change', function (event) {
      var selectedValue = event.target.value;
  
        // Push the selected option into the list
        selectedoptions[index] = selectedValue;
      });

      questionDiv.appendChild(radioBtn);
      questionDiv.appendChild(label);
    });

    // Create the "Next" button inside each question div
    
    var nextButton = document.createElement("button");
    nextButton.id = "nextButton"+index; 
    nextButton.className = "btn btn-primary justify-content-end custom-nextbutton mt-5 me-4 ms-4 ";
    nextButton.textContent = "Next";
    
    
    
    nextButton.addEventListener('click', function (e) {
      
      currentQuestionIndex++;
      if (currentQuestionIndex < questionsData.length) {
        console.log(selectedoptions);

         showQuestion();
        } else {
        //inputs submission 
        console.log(selectedoptions);
        getresult(testdata.category, selectedoptions);
      }
    });
  
    questionDiv.appendChild(nextButton);


  //prev button 
    var prevButton = document.createElement("button");
    prevButton.id = "prevButton";
    prevButton.className = "btn btn-primary  mt-4 me-4 mb-4 custom-prevButton";
    prevButton.textContent = "Prev";

    prevButton.onclick = function() {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;

      
        showQuestion();
      }
    };

    questionDiv.appendChild(prevButton);



    // Append question div to the document
    document.body.appendChild(questionDiv);
    questionDiv.style.display = 'none'; // Hide all questions initially
  });

  // Show the first question initially
  showQuestion();
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors appropriately
  });
})

async function getresult(category, userInputs){
  const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const date=`${day}-${month}-${year} ${day} ${hours}:${minutes}:${seconds}`

  await fetch('http://localhost:5500/api/getPredictions',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({category, userInputs, date })
        }).then(response=>response.json())
        .then(prediction=>{
          if(prediction.success){
            let result = prediction.severity_level;
            result=encodeURIComponent(result);
            const url = `/result?category=${category}&result=${result}`;
            window.location.replace(`${url}`);
          }else{
            console.error("Error submittin the inputs", error);
          }
        })
        .catch(error=>{
          console.log("Error sending inputs to the server", error);
        });
}
