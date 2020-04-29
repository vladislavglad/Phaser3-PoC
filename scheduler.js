function hideContent() {
    let myDiv = document.getElementById("gameContainer");
    myDiv.style.display = "none"

    document.getElementById("myDiv1").style.display = "block";
}

function displayContent() {
    document.getElementById("myDiv1").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
}

function switchContent(div1, div2) {
    document.getElementById(`${div1}`).style.display = "none";
    document.getElementById(`${div2}`).style.display = "block";
}