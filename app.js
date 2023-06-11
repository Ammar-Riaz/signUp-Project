// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");

// const app = express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/signUp.html");
// });

// app.post("/", (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;

//   const data = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: firstName,
//           LNAME: lastName,
//         },
//       },
//     ],
//   };

//   const jsonData = JSON.stringify(data);
//   const URL = "https://us21.api.mailchimp.com/3.0/lists/b7c2c4acdf";
//   const options = {
//     method: "POST",
//     auth: "Ammar:78fc7722c4592e961f7fe2e4e33e451d-us21",
//   };

//   const request = https.request(URL, options, (response) => {
//     if (response.statusCode === 200) {
//       res.send("Successfully Subscribed");
//     } else {
//       res.send("There is an error with signing up,Plz try again");
//     }
//     response.on("data", (data) => {
//       const parseData = JSON.parse(data);
//       console.log(parseData);
//     });
//   });

//   request.write(jsonData);
//   request.end();
// });

// app.listen(3000, () => {
//   console.log("server is running on port 3000. ");
// });

//Api key
//78fc7722c4592e961f7fe2e4e33e451d-us21

// audience id
// b7c2c4acdf

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const URL = "https://us21.api.mailchimp.com/3.0/lists/b7c2c4acdf";

  const options = {
    method: "POST",
    // auth: "Ammar:78fc7722c4592e961f7fe2e4e33e451d-us21",
  };

  const request = https.request(URL, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000.");
});
