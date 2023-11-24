const express = require("express");
const mongoose = require("mongoose");
const questions = require("./questions_dataset_seeds");
const Question = require("../schemas/question");

mongoose.connect("mongodb://127.0.0.1:27017/REELO");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connection open!!!!");
});

const seedDB = async () => {
  await Question.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const c = new Question(questions[i]);
    c.save();
  }
};

seedDB();
