const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const quizPath = path.join(__dirname, 'quiz.json');

let turn = 0; // counter to send 400 in every 1 of 4 answerings

app.use(cors());

app.post("/quiz", function(req, res){
    console.log('post request');
    const readable = fs.createReadStream(quizPath);
    readable.pipe(res);
});

app.post("/answer", function(req, res) {
 console.log('post request');
  turn++;
  if (turn === 4) {
    turn = 0;
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
});



app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
