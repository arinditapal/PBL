const input = document.querySelector(".input");
const form = document.querySelector(".my-form");

 // getting story name input field
form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    text = storyName.value; 

    // switching to play page
    const url = `play.html?storyname=${encodeURIComponent(text)}`;
    console.log(url);
    location.href = url;
});






