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
document.getElementById("mental-health-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("mental-health-content");
});
document.getElementById("adhd-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("adhd-content");
});

document.getElementById("anxiety-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("anxiety-content");
});
document.getElementById("autism-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("autism-content");
});
document.getElementById("depression-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("depression-content");
});
document.getElementById("dyslexia-link").addEventListener("click", function (event) {
  event.preventDefault();
  showContent("dyslexia-content");
});
document.getElementById("ptsd-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("ptsd-content");
});

document.getElementById("stress-link").addEventListener("click", function (event) {
  event.preventDefault(); 
  showContent("stress-content");
});




function showContent(contentId) {
  var allContents = document.querySelectorAll(".content-section");
  allContents.forEach(function (content) {
      content.style.display = "none";
  });

  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
      selectedContent.style.display = "block";
  }
}
