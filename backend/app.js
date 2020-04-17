"use strict";
const aws = require('aws-sdk');
const multerS3 = require("multer-s3");
const multer = require("multer");
const express = require("express");
const app = express();

// We need cors middleware to bypass CORS security in browsers.
const cors = require("cors");

app.use(express.static("static"));
app.use(cors());

let port = 5000;

/**
 * The default path
 */
app.get("/", async function(req, res) {
    if (req.query && Object.keys(req.query).length > 0) {
      console.log("I got a query!");
      //handleGet(res, res, req.query);
    }
  });
  
// listen the port
  app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
  });


  /**
 * A promise that resolves after t ms.
 * @param {Number} t 
 */
const delay = function(t) {
  return new Promise(resolve => setTimeout(resolve, t));
};


/**
 * The default path
 */
app.get("/", async function(req, res) {
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("I got a query!");
    //console.log(req.query)
    handleGet(res, res, req.query);
  }
});


//-----------------------------------------------------------------------------
/**
 * Handles a Get request
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} query 
 */
async function handleGet(req, res, query) {
  let error = "NO_ERROR";
  // let randomValue;
  // let min_value;
  // let max_value;

  console.log("query: ", JSON.stringify(query));
  // If there was a query (a query string was sent)
  // if (
  //   query !== undefined &&
  //   query.min_value !== undefined &&
  //   query.max_value !== undefined
  // ) {
  //   // Convert min_value and max_value from String to integer
  //   min_value = parseInt(query.min_value);
  //   max_value = parseInt(query.max_value);

  //   // Generate a random number
  //   randomValue = generateRandomNumber(min_value, max_value);
  //   console.log("randomValue: ", randomValue);
  // } else {
  //   error = "ERROR: min_value or max_value not provided";
  // }
  let test = "return test";
  // Generate the output
  let output = {
    // randomValue: randomValue,
    // min_value: min_value,
    // max_value: max_value,
    error: error,
    test: test
  };

  // Convert output to JSON
  let outputString = JSON.stringify(output, null, 2);
  console.log("outputString: ", outputString);

  // Let's generate some artificial delay!
  await delay(3000);

  // Send it back to the frontend.
  res.send(outputString);
}
