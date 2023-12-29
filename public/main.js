document.querySelector('.get').addEventListener('click', () => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // console.log(isLoggedIn);
  // if (isLoggedIn === "true") {
    window.location.href = "/home";
  // } else {
    // window.location.href = "login/login.html"};
  }
);


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