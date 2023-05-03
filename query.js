const input = document.querySelector(".input");
const form = document.querySelector(".my-form");
const api = "http://127.0.0.1/app/stories/";

// text to speech function
const speech = story => {
    const text = story; 
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance); 
};

// full story object from database
const search = storyname => {
    const query_parameter = `?search=${storyname}`;
    const query = api + query_parameter;
    
    fetch(query)
        .then(response => response.json())
        .then(data => {
            if( data.length === 0 ){
                // if story does not exist
            }

            const story_object = data[0];
            speech(story_object.content);
        })
        .catch(error => {
            console.error(error);
        });
};

 // story name input field
form.addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    text = storyName.value; 
    search( text );
});






