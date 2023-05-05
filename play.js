const api = "http://127.0.0.1/app/stories/";
const params = new URLSearchParams(location.search);
const story = params.get('storyname');
const head = document.querySelector('.head');
const button = document.querySelector('.button');

// button
button.addEventListener('click', e => {
    if (button.innerHTML === 'play') {
        button.innerHTML = 'pause';
    } else {
        button.innerHTML = 'play';
    }
});


// heading on the page
const heading = title => {
    let html = `<h1 class="title">${title}</h1>`;
    head.innerHTML = html;
};


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
            heading(story_object.title);
            //speech(story_object.content);
        })
        .catch(error => {
            console.error(error);
        });
};

search( story );