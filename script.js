import express from "express";
import fetch from "node-fetch";

const app = express();

//The port number is 3000
let listener = app.listen(3000, function () {
    console.log(
      "Your app is listening on http://localhost:" + listener.address().port //message that is displayed
    );
  });