
document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    history.replaceState({}, '', '../index.html');
    console.log('working')
})





// document.addEventListener("scroll", function () {
//     var titleContainer = document.querySelector(".title-container");
//     var mainTitle = document.getElementById("mainTitle");
//     var scrolled = window.scrollY > 0;

//     if (scrolled) {
//         titleContainer.classList.add("scrolled");
//         mainTitle.classList.add("title-scrolled");
//     } else {
//         titleContainer.classList.remove("scrolled");
//         mainTitle.classList.remove("title-scrolled");
//     }
// });




// document.addEventListener('scroll',() =>{
//     const header = document.querySelector('header');
//     if(window.scrollY>0){
//         header.classList.add('scrolled');
//     }else{
//         header.classList.remove('scrolled');
//     }
// })

// document.addEventListener('scroll',() =>{
//     const nav = document.querySelector('nav');
//     if(window.scrollY>0){
//         nav.classList.add('scrolled');
//     }else{
//         nav.classList.remove('scrolled');
//     }
// })