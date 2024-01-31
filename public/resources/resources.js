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

const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
window.addEventListener("load", function () {
  showContent("resources-content");
});
document.getElementById("resources-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("resources-content");
});
document.getElementById("deep-breathing-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("deep-breathing-content");
});
document.getElementById("PMR-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("PMR-content");
});

document.getElementById("visualization-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("visualization-content");
});

document.getElementById("mindfulness-meditation-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("mindfulness-meditation-content");
});
document.getElementById("yoga-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("yoga-content");
});
document.getElementById("aromatherapy-link").addEventListener("click", function (event) {
  event.preventDefault();
  showContent("aromatherapy-content");
});
document.getElementById("music-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("music-content");
});

document.getElementById("reading-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("reading-content");
});
document.getElementById("nature-walks-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("nature-walks-content");
});
document.getElementById("social-connection-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("social-connection-content");
});
document.getElementById("aerobic-exercise-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("aerobic-exercise-content");
});
document.getElementById("strength-training-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("strength-training-content");
});
document.getElementById("Tai-Chi-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("Tai-Chi-content");
});
document.getElementById("mindful-walking-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("mindful-walking-content");
});
document.getElementById("dance-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("dance-content");
});
document.getElementById("group-exercise-classes-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("group-exercise-classes-content");
});
document.getElementById("interval-training-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("interval-training-content");
});
document.getElementById("diet-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("diet-content");
});
document.getElementById("emergency-contacts-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("emergency-contacts-content");
});



function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


function showContent(contentId) {
  var allContents = document.querySelectorAll(".content-section");
  allContents.forEach(function (content) {
      content.style.display = "none";
  });

  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
      selectedContent.style.display = "block";
      scrollToTop();
  }
}

