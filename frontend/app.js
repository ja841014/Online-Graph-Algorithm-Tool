const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require('fs');
// in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
const bodyParser = require("body-parser");
const morgan = require("morgan");

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

app.get('/', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  console.log(form);
  res.send(form);
  });


app.post("/",(req, res) => {
  try {
    if(req.files) {
      let file = req.files.file; // file is file_name which we define in the index.html
      let filename = file.name;
      //mv() => move()
      file.mv('/Users/laicunhao/Desktop/EE599/project/nodejs_template-master/uploads/'+ filename, function(err) {
        if(err) {
          console.log("err occured")
          res.send(err);
        }
        else {
          console.log("File Upload");
          res.send("sucessful");
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


