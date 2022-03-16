// array of words
let words = [
  "Hello",
  "Code",
  "Town",
  "Twitter",
  "Github",
  "Python",
  "Scala",
  "Coding",
  "Funny",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
];

let hardWords = [
  "Programming",
  "Javascript",
  "Destructuring",
  "Documentation",
  "Dependencies",
  "Paradigm",
];

let normalWords = [
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Leetcode",
  "Internet",
  "Styling",
  "Cascade",
  "Playing",
  "Working",
];

let easyWords = [
  "Hello",
  "Code",
  "Town",
  "Twitter",
  "Github",
  "Python",
  "Scala",
  "Coding",
  "Funny",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
];

// setting levels
const lvls = {
  easy: 5,
  normal: 3,
  hard: 2,
};

// default level
let defaultLvlName = "easy"; // change level here
let defaultLvlSeconds = lvls[defaultLvlName];

// catch selectors
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let stratBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("input.input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let checkboxEle = document.getElementsByName("dif");
let instruction = document.querySelector(".instruction");
let playAgain = document.querySelector(".play-again");

// setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLvlName;
secondsSpan.innerHTML = defaultLvlSeconds;
timeLeftSpan.innerHTML = defaultLvlSeconds;
scoreTotal.innerHTML = words.length;

// setting instruction
let instructionName = document.createElement("div");
instructionName.innerHTML = `instruction`;
instructionName.style.color = "#2196f3";
instruction.appendChild(instructionName);
for (let i = 0; i < Object.keys(lvls).length; i++) {
  let div = document.createElement("div");
  div.innerHTML = `if you choose <span>[${
    Object.keys(lvls)[i]
  }]</span> level you will submit every word in <span>[${
    Object.values(lvls)[i]
  }]</span> seconds`;
  instruction.appendChild(div);
}

// checkbox

checkboxEle.forEach(function (e) {
  e.addEventListener("change", function (e) {
    checkboxEle.forEach(function (e) {
      e.removeAttribute("checked");
    });
    e.currentTarget.setAttribute("checked", "");
    defaultLvlName = document.querySelector("input[name=dif]:checked").value;
    lvlNameSpan.innerHTML = defaultLvlName;
    defaultLvlSeconds = lvls[defaultLvlName];
    secondsSpan.innerHTML = defaultLvlSeconds;
    timeLeftSpan.innerHTML = defaultLvlSeconds;
    // change words diff
    if (defaultLvlName === "hard") {
      words = [...hardWords];
      scoreTotal.innerHTML = words.length;
    } else if (defaultLvlName === "normal") {
      words = [...normalWords];
      scoreTotal.innerHTML = words.length;
    } else if (defaultLvlName === "easy") {
      words = [...easyWords];
      scoreTotal.innerHTML = words.length;
    }
  });
});

// disable paste event
input.onpaste = function () {
  return false;
};

// start game
stratBtn.onclick = function () {
  this.remove();
  input.focus();
  // generate word function
  generateWord();
};

function generateWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // empty upcoming words
  upcomingWords.innerHTML = "";
  // generate upcoming words
  genUpcomingWords();
  // call start play function
  startPlay();
}

// generate upcoming words function
function genUpcomingWords() {
  for (let i = 0; i < words.length; i++) {
    let word = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    word.appendChild(txt);
    upcomingWords.appendChild(word);
  }
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLvlSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML -= 1;
    // stop timer
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      // compare words
      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        // empty input field
        input.value = "";
        // increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          generateWord();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("congratulions");
          span.append(spanTxt);
          finishMessage.appendChild(span);
          //remove upcoming words
          upcomingWords.remove();
          // play again button
          playAgain.style.display = "block";
          playAgain.onclick = function () {
            location.reload();
          };
          // // add data to local storage
          // saveToLs();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.append(spanTxt);
        finishMessage.appendChild(span);
        // play again button
        playAgain.style.display = "block";
        playAgain.onclick = function () {
          location.reload();
        };
        // // add data to local storage
        // saveToLs();
      }
    }
  }, 1000);
}

// function saveToLs() {
//   localStorage.setItem("score", scoreGot.innerHTML);
//   localStorage.setItem("date", `${new Date().getFullYear()}`);
// }
