"use strict";
// const aws = require('aws-sdk');
// const multerS3 = require("multer-s3");
// const multer = require("multer");
const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));

// We need cors middleware to bypass CORS security in browsers.
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

let port = 5000;
let map;


// function BFS(head) {

// }


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
      console.log("req.query", req.query)
      //console.log("res", res);
      //console.log("req.body", req.body)

      handleGet(res, res, req.query);
    }
  });
  



  // app.post("/", async function(req, res) {
  //   console.log("I got a post query!");
  //   console.log("req:",req);
    
  //   // console.log(req.query);
  //   // console.log(req.body);
  //   //console.log(res)
  //   if (req.query && Object.keys(req.query).length > 0) {
  //     console.log("I got a post query!");
  //     //console.log("req.query", req.query)
  //     //console.log("req.body", req.body)

  //     //handleGet(res, res, req.query);
  //   }
  // });




// listen the port
  app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
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
  
  let root;
  let calculate_type
  let result = "13425";
  let graph;
  console.log("query: ", JSON.stringify(query));
  // If there was a query (a query string was sent)
  if (
    query !== undefined &&
    query.calculate_type !== undefined &&
    query.root !== undefined &&
    query.graph !== undefined
  ) {
    calculate_type =  query.calculate_type;
    root = query.root;
    graph = query.graph;
  } 
  else {
    error = "ERROR: calculate_type or root not provided";
  }
  //let data = fs.readFileSync('/Users/laicunhao/Desktop/EE599/project/nodejs_template-master/uploads/test.txt', 'utf-8');

  // Generate the output
  let output = {
    // randomValue: randomValue,
    calculate_type: calculate_type,
    root: root,
    result:result,
    graph:graph,
    error: error
  };

  // Convert output to JSON
  let outputString = JSON.stringify(output, null, 2);
  console.log("outputString: ", outputString);

  // Let's generate some artificial delay!
  await delay(2000);

  // Send it back to the frontend.
  res.send(outputString);
}



  // function createmap() {
  //   let data = fs.readFileSync('/Users/laicunhao/Desktop/EE599/project/nodejs_template-master/uploads/test.txt', 'utf-8');
  //   for (const ch of data){
  //   console.log(ch)
  //   }
  // }
  
  //createmap();
