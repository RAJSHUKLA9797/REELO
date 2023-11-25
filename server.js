const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Question = require("./schemas/question");

const app = express();
module.exports = app;
const port = process.env.PORT | 4000;
// CONFIGURATIONS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE CONNECTION
const DB_URL = "mongodb://127.0.0.1:27017/REELO";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB" + err));

// functions
function shuffler(questionSet) {
  const shuffledQueSet = [...questionSet];
  for (let i = shuffledQueSet.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQueSet[i], shuffledQueSet[j]] = [
      shuffledQueSet[j],
      shuffledQueSet[i],
    ];
  }
  return shuffledQueSet;
}

function getRandomQues(questionSet, targetScore) {
  let shuffledQueSet = shuffler(questionSet);
  let currentSum = 0;
  let selectedQues = [];
  // in case of empty array formed, the code will shuffle the array again and again for 100 times and try to find a fit
  // if even in 100 shuffles we dont get any element in the array we can say with some confidence that it is not possible
  // to have such a distribution
  let iter = 100;
  while (currentSum !== targetScore) {
    shuffledQueSet.forEach((question) => {
      if (
        currentSum + question.marks <= targetScore &&
        !selectedQues.includes(question)
      ) {
        selectedQues.push(question);
        currentSum += question.marks;
      }
    });
    if (currentSum !== targetScore) {
      currentSum = 0;
      selectedQues = [];
      shuffledQueSet = shuffler(shuffledQueSet);
      iter--;
    }
    if (!iter) {
      break;
    }
  }
  return currentSum === targetScore ? selectedQues : [];
}

function separator(questionSet, attribute, value) {
  let newSet = [];
  for (let question of questionSet) {
    if (question[attribute] === value) {
      newSet.push(question);
    }
  }
  return newSet;
}

// routes
app.post("/generate", async (req, res) => {
  const questionSet = await Question.find({});
  // TODO: Add a separation by topic if required
  let hard = separator(questionSet, "difficulty", "Hard");
  let medium = separator(questionSet, "difficulty", "Medium");
  let easy = separator(questionSet, "difficulty", "Easy");

  let easySelect = getRandomQues(easy, req.body.easy);
  let mediumSelect = getRandomQues(medium, req.body.medium);
  let hardSelect = getRandomQues(hard, req.body.hard);
  if (!easySelect.length | !mediumSelect.length | !hardSelect.length) {
    res.json({
      message:
        "couldnt form an appropriate paper with the given distribution, try changing the distribution",
    });
  } else {
    const result = [...easySelect, ...mediumSelect, ...hardSelect];
    res.json(result);
  }
});

app.get("/", async (req, res) => {
  res.send(
    `Make a post request on "http://localhost:${port}/generate" with fields marks, easy, medium, hard`
  );
});

app.listen(port, () => {
  console.log(`Server live at URL "http://localhost:${port}/"`);
});
