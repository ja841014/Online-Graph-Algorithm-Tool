
//const fs = require('fs');




function initialize() {

  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";
}

initialize();

document.getElementById("submit").onclick = function() {
  submit();
};

// const delay = function(t) {
//   return new Promise(resolve => setTimeout(resolve, t));
// };



async function submit() {
    console.log("In submit!")

    let graph;

    var formData = new FormData();
    let myfile = document.getElementById('myfile').files[0];
    //var formData = new FormData(document.querySelector('form'));
    formData.append("file", myfile);


    //console.log(myfile)
    let filename = myfile.name;
    let size = myfile.size;
    console.log("file name: "+filename+"  size: "+ size)

  
    // let reader = new FileReader();//这是核心,读取操作就是由它完成.
    // reader.readAsText(myfile);//读取文件的内容,也可以读取文件的URL
    // // //console.log('tt',reader.readAsText(myfile));
    // reader.onload = function() {
    //   //let temp = reader.result;
    //   graph = reader.result;
    //   //graph = ArrayBuffer.transfer(reader.result);
    //   //console.log(this.result);
    //   console.log(graph);
    //   //return graph;
    // }
    // graph = JSON.stringify(graph);
    // console.log("outside",graph);

    // function uploadFile(myfile) {
    //   return new Promise(function(resolve, reject) {
    //   let reader = new FileReader()
    //   reader.readAsText(myfile)
    //   reader.onload = function() {
    //       resolve(this.result)
    //       }
    //   })
    // }
    //   uploadFile(file).then(function(result){
      
    //   //处理 result
    // })
 

    // const readUploadedFileAsText = () => {
    //   const temporaryFileReader = new FileReader();
    
    //   return new Promise((resolve, reject) => {
    //     temporaryFileReader.onerror = () => {
    //       temporaryFileReader.abort();
    //       reject(new DOMException("Problem parsing input file."));
    //     };

    //     temporaryFileReader.readAsText(myfile);
    //     temporaryFileReader.onload = () => {
    //       resolve(temporaryFileReader.result);
    //       //console.log(temporaryFileReader.result);
    //     };
    //     // temporaryFileReader.readAsText(myfile);
    //   });
    // };
    // let store;

    // let handlepromise = async () => {
    //   store = await this.readUploadedFileAsText();
    //   console.log("do u get", store);
    // }


  // readUploadedFileAsText()
  //   .then(response => {
  //     //console.log("response: ", response);
  //     //store = response;
  //     console.log("response", response);
  //     //store = JSON.stringify(response);
  //   })
  //   .catch(e => {
  //     console.log("error: ", e);
  //   });


    // const handleUpload = async (event) => {
    //   const file = event.target.files[0];
    //   //const fileContentDiv = document.querySelector('div#file-content')
    //   //var store;
    //   try {
    //     const fileContents = await readUploadedFileAsText(myfile)  
    //     //fileContentDiv.innerHTML = fileContents
    //     store = fileContents;
    //     console.log("store",store);

    //   } catch (e) {
    //     //fileContentDiv.innerHTML = e.message
    //     store = e.message;
    //   }
    // }
    









    

    let order = document.getElementById("order");
    //order.innerHTML = "Please wait...";

    try {
        //delay(5000);
        let calculate_type = document.getElementById("calculate_type").value;
        let root = document.getElementById("root").value;
        
        let request = `http://127.0.0.1:5000/?calculate_type=${calculate_type}&root=${root}&graph=${graph} `;
        console.log("request: ", request);
        

      //let testt = 567;
        // Send an HTTP GET request to the backend
        const data = await axios.get(request);
        //const data2 = await axios.post('http://127.0.0.1:5000', testt)
        // const data2 = await axios.post('http://127.0.0.1:5000', formData, {
        //   headers: {'Content-Type': 'multipart/form-data'}
        // });



        console.log("data.data: ", JSON.stringify(data.data, null, 2));
        
        // order.innerHTML = data.data.result;
    
        // // Display the random value
        // random_value_element.innerHTML = "Here is your random number: " + data.data.randomValue;
      } catch (error) {
        console.log("error: ", error);
      }
    
}

//reference
// https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload