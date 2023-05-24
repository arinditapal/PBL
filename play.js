// creating search api for database and receiving story title from query
const api = "http://127.0.0.1/app/stories/";
const params = new URLSearchParams(location.search);
const story = params.get("storyname");

const head = document.querySelector(".heading");
const button = document.querySelector(".button");
const gif = document.querySelector(".gif");
const video = document.querySelector(".vediobox");
const img = document.querySelector(".img");

let folder = "lady";
img.src = "/lady/img.png";

const synth = window.speechSynthesis;
let voice = synth.getVoices()[0];

let storyText = "";

function fetchStory() {
  const query_parameter = `?search=${story}`;
  const query = api + query_parameter;

  fetch(query)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        // if story does not exist
        console.log("no such story exits");
        return;
      }

      // taking the closest match
      const story_object = data[0];

      // setting h1
      head.innerText = story_object.title;

      storyText = story_object.content;
    })
    .catch((error) => {
      console.error(error);
    });
}

// setting and playing story
function speak() {
  if (story === "") {
    return;
  }

  const utterance = new SpeechSynthesisUtterance();
  utterance.text = storyText;
  utterance.voice = voice;
  synth.speak(utterance);
}

let stopped = true;

// play puase the voice
button.addEventListener("click", () => {
  if (stopped) {
    synth.cancel();
    speak();
    button.innerText = "Pause";
    img.src = `./${folder}/video.gif`;
    stopped = false;
    return;
  }

  if (button.innerText === "Play") {
    synth.resume();

    button.innerText = "Pause";
    img.src = `./${folder}/video.gif`;
  } else if (button.innerText === "Pause") {
    synth.pause();

    button.innerText = "Resume";
    img.src = `./${folder}/img.png`;
  } else if (button.innerText === "Resume") {
    synth.resume();

    button.innerText = "Pause";
    img.src = `./${folder}/video.gif`;
  }
});

// set the voice to male or female
function setVoice() {
  const voices = speechSynthesis.getVoices();
//   console.log(voices);
  //   console.log(voices[0]);
  //   console.log(voices[0].gender);

  let femaleVoices = voices.filter(function (voice) {
    return (
      voice.name.toLowerCase().includes("female") ||
      voice.voiceURI.toLowerCase().includes("female")
    );
  });

  // speechSynthesis.cancel();

//   console.log(femaleVoices);

  if (femaleVoices.length === 0) {
    console.log("no female voice available");
    folder = "boy";
  } else {
    console.log("got some female voices");
    // speechSynthesis.cancel();
    // let voice = femaleVoices[0];
    // utterance.voice = voice;
    voice = femaleVoices[0];
    console.log(voice);
    folder = "lady";
  }
  img.src = `./${folder}/img.png`;
}

// setStoryText();
fetchStory();

setVoice();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = setVoice;
}
