const express = require("express");
const expHbs = require("express-handlebars");
const nodemailer = require("nodemailer");

// Init app vars
const app = express();
const port = 3000 || process.env.PORT;

// MIDDLEWARE SETUP
// Bodyparser
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
