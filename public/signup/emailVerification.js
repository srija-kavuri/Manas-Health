function toggleInput(){
    var emailElement = document.getElementById("emailInput");
    var confirmBtn = document.getElementById("confirmEmailBtn");

    emailElement.disabled = false;

    if (confirmBtn.style.display === "none"){
        confirmBtn.style.display = "block";
    }
    else{
        confirmBtn.style.display = "none";
    }
}

