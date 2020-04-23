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
    let myfile = document.getElementById('myfile').files[0];
    let filename = myfile.name;
    let size = myfile.size;
    console.log("file name: "+filename+"  size: "+ size)

    // let reader = new FileReader();//这是核心,读取操作就是由它完成.
    // reader.readAsText(myfile);//读取文件的内容,也可以读取文件的URL
    // reader.onload = function() {
    //   this.graph = reader.result;
    //   console.log(this.result);
    // }
    // graph = JSON.stringify(graph);
    //console.log("outside",graph);

    let order = document.getElementById("order");
    //order.innerHTML = "Please wait...";

    try {
        //delay(5000);
        let calculate_type = document.getElementById("calculate_type").value;
        let root = document.getElementById("root").value;
        
        let request = `http://127.0.0.1:5000/?calculate_type=${calculate_type}&root=${root}&graph=${graph} `;
        console.log("request: ", request);
        


        // Send an HTTP GET request to the backend
        const data = await axios.get(request);

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