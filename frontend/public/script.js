function initialize() {

  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";
}

initialize();

document.getElementById("submit").onclick = function() {
  submit();
};


async function submit() {
    console.log("In submit!")

    let graph;

    var formData = new FormData();
    let myfile = document.getElementById('myfile').files[0];
    let calculate_type = document.getElementById("calculate_type").value;
    let root = document.getElementById("root").value;
    
    formData.append("file", myfile);
    formData.append("calculate_type", calculate_type);
    formData.append("root", root);
    let filename = myfile.name;
    console.log(filename);
    let size = myfile.size;
  
    let reader = new FileReader();//read operation done it by this
    reader.readAsText(myfile);//reading the content
    reader.onload = function() {
      graph = reader.result;
      d3.select("#graph").graphviz()
      .renderDot(graph);
      console.log(graph);
    }

    let order = document.getElementById("order");
    order.innerHTML = "Please wait...";

    try {
        const data = await axios.post('http://127.0.0.1:5000', formData)
        
        console.log("data.data.order: ", JSON.stringify(data.data.order, null, 2))
        order.innerHTML = "Your " +calculate_type+ " order is: " + JSON.stringify(data.data.order, null, 2)
      } catch (error) {
        console.log("error: ", error);
      }
    
}

//reference
// https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
// https://stackoverrun.com/cn/q/12618653  graph