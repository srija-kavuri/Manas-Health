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
      testdata=response.data;
      var questionsData = testdata.questions;
  

      var currentQuestionIndex = 0; // Track the current question index
      var selectedoptions=[];
      console.log(questionsData.length);
      const totalAttempts=questionsData.length;
      // var currrentAttempt=1;
       
      function showQuestion() {
        var submitButton = document.getElementById('nextButton'+currentQuestionIndex);
        submitButton.disabled = true;
        console.log('i have enterd showquestion function');
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
        console.log('enetred radiobutton event listner');
        var anyRadioButtonSelected=event.target.checked;
        console.log('option is selected or not'+anyRadioButtonSelected);
        var submitBtn=document.getElementById('nextButton'+currentQuestionIndex);
        submitBtn.disabled = !anyRadioButtonSelected;
        console.log('state of next button:',submitButton.disabled);
          });
          
          });
        // Hide "Prev" button for the first question
        var prevButton = document.getElementById('prevButton');
        prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
        console.log("i have exited from question loop");
        updatequestion(currentQuestionIndex);
        updateProgressBar(currentQuestionIndex);
    
      }
      function prevshowquestions(){
        console.log('i have enterd showquestion function');
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
        console.log('enetred radiobutton event listner');
        var anyRadioButtonSelected=event.target.checked;
        console.log('option is selected or not'+anyRadioButtonSelected);
        var submitBtn=document.getElementById('nextButton'+currentQuestionIndex);
        submitBtn.disabled = !anyRadioButtonSelected;
        console.log('state of next button:',submitButton.disabled);
          });
          
          });
          console.log("i have exited from question loop");
          var prevButton = document.getElementById('prevButton');
          prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
          console.log("i have exited from question loop");
          updatequestion(currentQuestionIndex);
          updateProgressBar(currentQuestionIndex);
      }
      //print array of selected options.
      console.log(selectedoptions);
     
    
      var testheading = document.getElementsByClassName('testNameContainer')[0];
    var testnamediv = document.createElement("h1");
    testnamediv.textContent = testdata.category;
    testheading.appendChild(testnamediv);
    
    
      // Create divs for each question
      
    
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
        if (testdata.category==='dyslexia'){
          var alermsg=document.createElement("span");
          alermsg.textContent="(* Rate out of 5*)";
          alermsg.id="alertmessage";
          alermsg.className=" d-flex justify-content-center";
          questionDiv.appendChild(alermsg);
         }
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
          if (testdata.category==='dyslexia'){
            radioBtn.value= optionIndex+1;
          }
          else{
          radioBtn.value = optionIndex;
          }
          radioBtn.id = "option" + index + "_" + (optionIndex + 1);
          radioBtn.classList.add("btn-check");
    
          var label = document.createElement("label");
          label.htmlFor = "option" + index + "_" + (optionIndex + 1);
          label.textContent = option;
          label.classList.add("btn",  "custom-options");
           
          radioBtn.addEventListener('change', function (event) {
          var selectedValue = event.target.value;
            console.log('Selected option:', selectedValue);
      
            // Push the selected option into the list
            selectedoptions[index] = parseInt(selectedValue);
            // console.log('Updated selectedoptions:', selectedoptions);
          });
    
          questionDiv.appendChild(radioBtn);
          questionDiv.appendChild(label);
        });
    
        var mixdiv=document.createElement("div");
        mixdiv.className="row justify-content-between";
        //prev
        var nextbuttonContainer = document.createElement('div');
        var prevbuttonContainer=document.createElement("div");
        prevbuttonContainer.className="col-6 prevdiv";
        var prevButton = document.createElement("button");
        prevButton.id = "prevButton";
        prevButton.className = "btn  custom-prevButton mt-2";
        prevButton.textContent = "Prev";
    
        prevButton.onclick = function() {
          if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            console.log('prev button calling show question function');
            prevshowquestions();
          }
        };
    
        prevbuttonContainer.appendChild(prevButton);
        mixdiv.appendChild(prevbuttonContainer);
    
    
    
        // Create the "Next" button inside each question div
        nextbuttonContainer.className=" col-6 ml-auto nextdiv ";
        var nextButton = document.createElement("button");
        nextButton.id = "nextButton"+index; 
        nextButton.className = "btn   custom-nextbutton mt-2 ";
        nextButton.textContent = "Next";
        
        
        
        nextButton.addEventListener('click', function (e) {
         
          currentQuestionIndex++;
          if (currentQuestionIndex < questionsData.length) {
             showQuestion();
            } else {
              getresult(category,selectedoptions, nextButton.id);
            // Handle form submission logic here (replace the alert)
          }
          
        });
      
        nextbuttonContainer.appendChild(nextButton);
        mixdiv.appendChild(nextbuttonContainer);
      
        // questionDiv.appendChild(mixdiv);
      //  questionDiv.appendChild(buttonContainer);
    
      //prev button 
      
        
       
        questionDiv.appendChild(mixdiv);
       document.body.appendChild(questionDiv);
        questionDiv.style.display = 'none'; // Hide all questions initially
      });
       //create a div to display question
       
       var currentquestion=document.createElement("div");
       currentquestion.id="questionProgress";
       var questiodisplay=document.createElement('h4');
    
       function updatequestion(currentQuestionIndex){
       questiodisplay.textContent="Question "+(currentQuestionIndex+1)+"   of "+questionsData.length;
        currentquestion.appendChild(questiodisplay);
        document.body.appendChild(currentquestion);
      }
     var progressdiv=document.createElement("div");
     progressdiv.className="pdiv d-flex justify-content-center mt-2";
      var pageprogress=document.createElement("div");
      pageprogress.className="progress-bar ";
    
    
      // const progressBar = document.querySelector('.progress-bar');
      function updateProgressBar(currentQuestionIndex){
        const progressPercentage=((currentQuestionIndex)/ (totalAttempts-1))* 100;
        pageprogress.style.setProperty('--width', progressPercentage);
        progressdiv.appendChild(pageprogress);
        document.body.appendChild(progressdiv);
      }
     
      // Show the first question initially
      console.log('intial question function calling');
      
      showQuestion();
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors appropriately
  });
})

async function getresult(category, userInputs, submitButtonId){
  const submitButton = document.getElementById(submitButtonId);
  submitButton.disabled = true;

  const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const date=`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`

  await fetch('http://localhost:5500/api/getPredictions',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({category, userInputs, date })
        }).then(response=>response.json())
        .then(prediction=>{
          if(prediction.success){
            let result = prediction.severity_level
            let percentage = prediction.percentage;
            result=encodeURIComponent(result);
            const url = `/result?category=${category}&result=${result}&percentage=${percentage}`;
            window.location.replace(`${url}`);
          }else{
            console.error("Error submittin the inputs", error);
            submitButton.disabled = false;

          }
        })
        .catch(error=>{
          console.log("Error sending inputs to the server", error);
          submitButton.disabled = false;

        });
}
