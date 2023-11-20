
document.addEventListener('scroll',() =>{
    const header = document.querySelector('header');
    if(window.scrollY>0){
        header.classList.add('scrolled');
    }else{
        header.classList.remove('scrolled');
    }
})

document.addEventListener('scroll',() =>{
    const nav = document.querySelector('nav');
    if(window.scrollY>0){
        nav.classList.add('scrolled');
    }else{
        nav.classList.remove('scrolled');
    }
})

document.addEventListener("scroll", function () {
    var titleContainer = document.querySelector(".title-container");
    var mainTitle = document.getElementById("mainTitle");
    var scrolled = window.scrollY > 0;

    if (scrolled) {
        titleContainer.classList.add("scrolled");
        mainTitle.classList.add("title-scrolled");
    } else {
        titleContainer.classList.remove("scrolled");
        mainTitle.classList.remove("title-scrolled");
    }
});

var slideIndex = 0;

DisplaySlides();

function DisplaySlides()
{
    var slides = document.getElementsByClassName("image");

    var dots = document.getElementsByClassName("dot");

    for (var i = 0; i < slides.length; i += 1)
    {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length)
    {
        slideIndex = 1;
    }

    for (var i = 0; i < dots.length; i += 1)
    {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";

    dots[slideIndex-1].className += " active";

    setTimeout(DisplaySlides, 10000); //changes the image every 3 seconds
}