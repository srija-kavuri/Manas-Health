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