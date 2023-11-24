const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Routes import
// const blogRoute = require("./routes/blogRoute");
const app = express();
module.exports = app;

// CONFIGURATIONS
app.use(bodyParser.urlencoded({ extended: true })); // for parsing (form data) i.e. application/x-www-form-urlencoded//this is the middleware we talked about using req.body
app.use(bodyParser.json());



// DATABASE CONNECTION
const DB_URL = "mongodb://127.0.0.1:27017/REELO";
mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));



// ROUTES
// app.use("/api", blogRoute);
app.get("/", (req, res) => {
  res.send("it workks");
});



app.listen(4000, () => {
  console.log("on port 4000!!!");
});
