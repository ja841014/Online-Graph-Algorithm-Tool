const express = require("express");
const app = express();
const upload = require('express-fileupload')

let port = 3000;
//make everything under public folder avaliable to the outside world
app.use(express.static("public"));
app.use(upload());
http = require('http').Server(app).listen(port, err=> {
  console.log(`Listening on port: ${port}`);
});

//listen on particular port
// anything being sent on this machine a port 3000 we get it and then sent back as a response


//whenever the request comes on this route "/" , my webserver call callback function
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});



app.post("/", (req, res) => {
  try {
    if(req.files) {
      //res.send("Server received the file.");
      console.log(req.files);
      let file = req.files.file; // file is file_name which we define in the index.html
      let filename = file.name;
      //console.log(filename);
      //mv() => move()
      file.mv('/Users/laicunhao/Desktop/EE599/project/nodejs_template-master/uploads/'+ filename, function(err) {
        if(err) {
          console.log("err occured")
          res.send(err);
        }
        else {
          // res.send("File Upload");
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
