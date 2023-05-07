const api = "http://127.0.0.1/app/stories/";
const params = new URLSearchParams(location.search);
const story = params.get('storyname');

const head = document.querySelector('.heading');
const button = document.querySelector('.button');

const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

const speak = story => {
  utterance.text = story;
  synth.speak(utterance);
}

const pauseSpeech = () => {
  synth.pause();
}

const resumeSpeech = () => {
  synth.resume();
}

// heading on the page
const heading = title => {
    head.innerHTML = title;
};

// text to speech function
const toggleSpeech = story => {
    button.addEventListener('click', () => {
        if (button.innerHTML === "Play") {
            speak(story);
            button.innerHTML = "Pause";
        } else if (button.innerHTML === "Pause") {
            pauseSpeech();
            button.innerHTML = "Resume";
        } else if (button.innerHTML === "Resume") {
            resumeSpeech();
            button.innerHTML = "Pause";
        }
    })
}

// full story object from database
const search = storyname => {
    const query_parameter = `?search=${storyname}`;
    const query = api + query_parameter;
    
    fetch(query)
        .then(response => response.json())
        .then(data => {
            if( data.length === 0 ){
                // if story does not exist
                console.log('no such story exits');
            }

            // taking the closest match
            const story_object = data[0];
            heading(story_object.title);
            // speakTitle(story_object.title);
            toggleSpeech(story_object.content);
        })
        .catch(error => {
            console.error(error);
        });
};

search( story );