function hideContent() {
    let myDiv = document.getElementById("gameContainer");
    myDiv.style.display = "none"

    document.getElementById("myDiv1").style.display = "block";
}

function displayContent() {
    document.getElementById("myDiv1").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
}