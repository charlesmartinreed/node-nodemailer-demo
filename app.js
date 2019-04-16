const express = require("express");
const expHbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

// Init app vars
const app = express();
const port = 3000 || process.env.PORT;

// MIDDLEWARE SETUP

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars
app.engine("handlebars", expHbs());
app.set("view engine", "handlebars");

// Setup static folder
// app.use(express.static("./public"));
app.use("/public", express.static(path.join(__dirname, "public")));

// ROUTES
app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const { name, company, email, phone, message } = req.body;
  const output = `
		<p>You have a new contact request</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${name}</li>
			<li>Name: ${company}</li>
			<li>Name: ${email}</li>
			<li>Name: ${phone}</li>
		</ul>
		<h3>Message</h3>
		<p>${message}</p>
	`;

  // sending via nodemailer - set up transporter, options, execute sendMail method on transporter
  let transporter = nodemailer.createTransport({
    host: "mail.traversymedia.com",
    port: 587,
    secure: false,
    auth: {
      user: "test@traversymedia.com",
      pass: "123abc"
    },
    tls: {
      // necessary if we're transporting from local host, not mail server
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Nodemailer Contact" <test@traversymedia.com>',
    to: "techguyinfo@gmail.com",
    subject: "Node Contact Request",
    text: "Hello world!",
    html: output
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // what happens once the form is submitted
    res.render("contact", { msg: "Email has been sent successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
