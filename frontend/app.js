const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require('fs');
const utf8 = require('utf8');
// in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
const bodyParser = require("body-parser");
const morgan = require("morgan");
const encoding = require("encoding");

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
// //make everything under public folder avaliable to the outside world
 app.use(express.static("public"));
// http = require('http').Server(app).listen(port, err=> {
//   console.log(`Listening on port: ${port}`);
// });

//listen on particular port
// anything being sent on this machine a port 3000 we get it and then sent back as a response
/////////////////////////
/// Build dirested Map///
/////////////////////////
/**
 * 
 * @param {String} content 
 */
function diredt_createmap(content) {
  let graph={};
  
  let ancestor;
  for (let ch of content){
    let parsed = parseInt(ch, 10);
    if(ch == '\n'){
      //console.log("switch line");
      ancestor = undefined;
    }
    if(!isNaN(parsed)) {//if the char is the num, print out
      if(ancestor != undefined && graph[ancestor] == null) {
        let array = [];
        graph[ancestor] = array;
        graph[ancestor].push(parsed);
      }
      else if(ancestor != undefined && graph[ancestor] != null) {
        graph[ancestor].push(parsed);
      }
      ancestor = parsed;
    }
  }
  /// sort the adjancecy nodes ///
  let key = Object.keys(graph);
  for(let i = 0; i < key.length; i++) {
    graph[key[i]].sort();
  }
  return graph;
}




/////////////////////////
// Build undirested Map//
/////////////////////////
/**
 * 
 * @param {String} content 
 */
function undiredt_createmap(content) {
  let graph={};
  
  let ancestor;
  for (let ch of content){
    let parsed = parseInt(ch, 10);
    if(ch == '\n'){
      //console.log("switch line");
      ancestor = undefined;
    }
    if(!isNaN(parsed)) {//if the char is the num, print out
      if(ancestor != undefined && graph[ancestor] == null) {
        let array = [];
        graph[ancestor] = array;
        graph[ancestor].push(parsed);
      }
      else if(ancestor != undefined && graph[ancestor] != null) {
        graph[ancestor].push(parsed);
      }
      ancestor = parsed;
    }
  }
  // create from the single path to double path
  let key = Object.keys(graph);
  for(let i = 0; i < key.length; i++) {
    for(let j = 0; j < graph[key[i]].length; j++){
      let temp = graph[key[i]][j];
      //console.log(graph[temp]);
      if(graph[temp] == undefined) {
        graph[temp] = [];
        graph[temp].push(parseInt(key[i], 10));
      }
      else {
        if(graph[temp].includes(parseInt(key[i], 10)) ==  false) {
          graph[temp].push(parseInt(key[i], 10));
        }
      }
    }
  }
  /// sort the adjancecy nodes ///
  for(let i = 0; i < key.length; i++) {
    graph[key[i]].sort();
  }
  return graph;
}
/////////////////
////DFS Alog/////
/////////////////
/**
 * 
 * @param {Number} root 
 * @param {Object} map 
 */
function dfs(root, map) {
  let key_ = Object.keys(map);
  //console.log(key_);
  let discovered = [];
  let stack = [];
  let order = [];
  stack.push(root);
  while(stack.length != 0) {
    let temp = stack.pop();
    if(discovered[temp] == true) {// already visited
      continue;
    }
    else { // visiting now
      discovered[temp] = true;
      order.push(temp);
    }
    for(let j = 0; j < map[temp].length; j++) {
      if(discovered[map[temp][j]] != true) {
        stack.push(map[temp][j]);
      }
    }
  }
  return order;
}











//whenever the request comes on this route "/" , my webserver call callback function
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.htsml");
//   console.log("hi,there ",req.files);

// });

app.get('/', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  console.log(form);
  res.send(form);
  });



app.post("/",(req, res) => {
  try {
    if(req.files) {
      //res.send("Server received the file.");
      // console.log("files",req.files);
      // //console.log("req.query ",req.query);
      // console.log("req.body",req.body);//這個可以拿到DFS ROOT
      // let root = parseInt(req.body.root, 10);
      // console.log("user enter the root from html: ", root)// root is name attribute
      // let calculate_type = req.body.calculate_type
      // console.log("user enter the calculate type from html: ", calculate_type);
      let file = req.files.file; // file is file_name which we define in the index.html
      let filename = file.name;

      // //////////////////////
      // //extract the graph///
      // //////////////////////
      // let content = req.files.file.data;
      // let _text;
      // for(let e of content){
      //   _text = _text + String.fromCodePoint(e);
      //   //console.log(String.fromCodePoint(e));
      // }
      // console.log("text: ",_text);
      // //////////////
      // //create map//
      // //////////////
      // let undirected_map =  undiredt_createmap(_text);
      // console.log("undirested graph: ", undirected_map);
      // let diredt_map = diredt_createmap(_text);
      // console.log("directed graph: ", diredt_map);
      // //////////////////////////
      // //select the right Algo.//
      // //////////////////////////
      // let order;
      // if(calculate_type == 'DFS') {
      //   order = dfs(root, undirected_map);
      //   console.log(order);
      // }
      
      //////////////
      //mv() => move()
      file.mv('/Users/laicunhao/Desktop/EE599/project/nodejs_template-master/uploads/'+ filename, function(err) {
        if(err) {
          console.log("err occured")
          res.send(err);
        }
        else {


          console.log("File Upload");
          


          res.send("haha");
          //  res.send({
          //   status: true,
          //   message: "File Upload",
          //    data: {
          //     name: file.name,
          //     mimetype: file.mimetype,
          //     size: file.size,
          //     data: file.data
          //   }
          //  } );

        }
      });
    }
    else {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    }
  }
  catch(err) {
    res.status(500).send(err);
  }
});


