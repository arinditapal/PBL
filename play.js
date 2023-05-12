const api = "http://127.0.0.1/app/stories/";
const params = new URLSearchParams(location.search);
const story = params.get('storyname');

const head = document.querySelector('.heading');
const button = document.querySelector('.button');
const gif = document.querySelector('.gif');
const video = document.querySelector('.vediobox');

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

const heading = title => {
    head.innerHTML = title;
};


const toggleSpeech = story => {
    button.addEventListener('click', () => {

        let html = '';

        if (button.innerHTML === "Play") {
            html = '<img class="gif" src="./gifs/boy_speaking.gif"></img>';
            video.innerHTML = html;
            speak(story);
            button.innerHTML = "Pause";

        } else if (button.innerHTML === "Pause") {
            html = '<img class="img" src="./gifs/img.png" alt="My GIF">';
            video.innerHTML = html;
            pauseSpeech();
            button.innerHTML = "Resume";

        } else if (button.innerHTML === "Resume") {
            html = '<img class="gif" src="./gifs/boy_speaking.gif"></img>';
            video.innerHTML = html;
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