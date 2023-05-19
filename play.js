const api = "http://127.0.0.1/app/stories/";
const params = new URLSearchParams(location.search);
const story = params.get('storyname');

const head = document.querySelector('.heading');
const button = document.querySelector('.button');
const gif = document.querySelector('.gif');
const video = document.querySelector('.vediobox');
const img = document.querySelector('.img');

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

        console.log('you clicked me');

        if (button.innerHTML === "Play") {
            setTimeout(() => {
                console.log('in the timeout zone');
            }, 3000);
            button.innerHTML = 'Pause';
            img.src = './gifs/boy.gif';
            speak(story);

        } else if (button.innerHTML === "Pause") {
            setTimeout(() => {
                console.log('in the timeout zone');
            }, 1000);
            button.innerHTML = 'Resume';
            img.src = './gifs/img.png';
            pauseSpeech();

        } else if (button.innerHTML === "Resume") {
            setTimeout(() => {
                console.log('in the timeout zone');
            }, 1000);
            button.innerHTML = 'Pause';
            img.src = './gifs/boy.gif';
            resumeSpeech();
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