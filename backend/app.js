"use strict";
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

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
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));


function check_input_root(map) {
  // ensure the input root is avaliable
  let key = Object.keys(map);// key of map
  let size = [];
  for(let i = 0; i < key.length; i++) {
    if(size.includes(parseInt(key[i],10)) == false) {
      //console.log("i",size.includes(key[i]));
      size.push(parseInt(key[i],10));
    }
    //console.log("outside check: ",key[i])
    //put the map_value into the size array
    for(let j = 0; j < map[key[i]].length; j++) {
      if(size.includes(map[key[i]][j] ) == false) {
        size.push(map[key[i]][j]);
        //console.log("inside check: ",map[key[i]][j])
      }
    }
  }
  return size;
}

/////////////////////////
/// Build Directed Map///
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
// Build undirected Map//
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
 * @return type array
 */
function dfs(root, map) {

  let discovered = [];
  let stack = [];
  let order = [];
  //ensure the input root is avaliable
  let check_root = check_input_root(map);
  if(check_root.includes(root) == false) {
    return "Your root is out of bound!"
  }

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
    if(map[temp] != undefined) {
      for(let j = 0; j < map[temp].length; j++) {
        if(discovered[map[temp][j]] != true) {
          stack.push(map[temp][j]);
        }
      }
    }
  }
  return order;
}
/////////////////
//DFS_dir Alog///
/////////////////
/**
 * 
 * @param {Number} root 
 * @param {Object} map 
 * @return type array
 */
function dfs_dir(root, map, visited) {
  
  let discovered = [];
  for(let i = 0; i < visited.length; i++) {
    discovered[visited[i]] = true;
  }
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
    if(map[temp] != undefined) {
      for(let j = 0; j < map[temp].length; j++) {
        if(discovered[map[temp][j]] != true) {
          stack.push(map[temp][j]);
        }
      }
    }
  }
  // return parseInt(order,10);
  return order

}


 function dfs_direct(root, map) {
  let key = Object.keys(map);
   let order = dfs(root, map);//array
   console.log("original", order);
   for(let i = 0; i < key.length; i++) {
    if(order.includes(parseInt(key[i], 10)) == false) {
      //console.log("key[i]", key[i]);
      let new_order = dfs_dir(parseInt(key[i],10), map, order);
      console.log("new_order",new_order);
      order = order.concat(new_order);
      console.log("order",order)
    }
   }
   return order;
 }

/////////////////
////BFS Alog/////
/////////////////
/**
 * 
 * @param {Number} root 
 * @param {Object} map 
 * 
 */
function bfs(root, map) {
  let discovered = [];
  let queue = [];
  let order = [];
  //ensure the input root is avaliable
  let check_root = check_input_root(map);
  if(check_root.includes(root) == false) {
    return "Your root is out of bound!"
  }

  queue.unshift(root);
  discovered[root] = true;
  order.push(root);
  while(queue.length != 0) {
    let temp = queue.pop();
    
    for(let j = 0; j < map[temp].length; j++) {
      if(discovered[map[temp][j]] != true) {
        discovered[map[temp][j]] = true
        queue.unshift(map[temp][j]);
        order.push(map[temp][j]);
      }
    }
  }
  return order;
}
/////////////////
////Topo Alog////
/////////////////
/**
 * 
 * @param {Number} root 
 * @param {Object} map 
 * 
 */
function topo(map) {
  let key = Object.keys(map);// key of map
  console.log("key",key);
  let indegree= [];
  let find_root = [];
  let order = [];
  let size = [];
  // find root => indegree = 0;
  // put the map_key into the size array
  for(let i = 0; i < key.length; i++) {
    if(size.includes(parseInt(key[i],10)) == false) {
      size.push(parseInt(key[i],10));
    }
    //put the map_value into the size array
    for(let j = 0; j < map[key[i]].length; j++) {
      if(size.includes(map[key[i]][j] ) == false) {
        size.push(map[key[i]][j]);
        //console.log("inside check: ",map[key[i]][j])
      }
    }
  }
  //compute every node indegree
  for(let i = 0; i < size.length; i++) {
    indegree[i] = 0;
  }  

  for(let i = 0; i < key.length; i++) {
    for(let j = 0; j < map[key[i]].length; j++) {
      indegree[ map[key[i]][j]  ]++
    }
  }

  for(let k = 0; k < indegree.length; k++) {
    if(indegree[k] == 0) {
      find_root.push(k);
    }
  }

  while(find_root.length != 0) {
    let temp = find_root.pop();
    order.push(temp);
    if(map[temp] != undefined) {
      
      for(let m = 0; m < map[temp].length; m++ ) {
        if(--indegree[ map[temp][m] ] == 0) {
          find_root.push(map[temp][m]);
        }
      }
    }
    //count++;
  }
  return order;
}

///////////////////////////
//Shortest path using BFS//
///////////////////////////

/**
 * 
 * @param {Number} root 
 * @param {Object} map 
 */
function Shortest(root, map) {
  let discovered = [];
  let queue = [];
  let order = [];
  queue.unshift(root);
  let shortest_path = {};
  let V_path;
  let empty_array = [];
  let key = Object.keys(map);// key of map
  let int_key = [];
  for(let i = 0; i < key.length;i++) {
    int_key[i] = parseInt(key[i],10);
  }
  console.log(key);

  //ensure the input root is avaliable
  let check_root = check_input_root(map);
  if(check_root.includes(root) == false) {
    return "Your root is out of bound!"
  }
  // ensure the input is the end node
  if(int_key.includes(root) == false) {
    console.log("int_key",int_key);
    console.log("TF",int_key.includes(root))
    return "The node is the end node."
  }


  discovered[root] = true;
  order.push(root);
  shortest_path[root] = empty_array;
  shortest_path[root].push(root);
  while(queue.length != 0) {
    let temp = queue.pop();
    
    for(let j = 0; j < map[temp].length; j++) {
      if(discovered[map[temp][j]] != true) {
      
        // because array's copy is shallow copy
        // Therefore, we have to use this method to make them be the different thing
        V_path = JSON.parse(JSON.stringify(shortest_path[temp]));
        V_path.push(map[temp][j]);
        shortest_path[map[temp][j]] = V_path;
        if (map[ map[temp][j] ] != undefined ) {
          queue.unshift(map[temp][j]);
          order.push(map[temp][j]);
          discovered[map[temp][j]] = true
        }
      }
    }

  }
  return shortest_path;
}





//////**********////////
app.post("/", async (req, res) => {
  console.log("I am in the post")
  // console.log(req.files);
  console.log("req.body", req.body);

  let root = parseInt(req.body.root, 10);
  console.log("user enter the root from html: ", root)// root is name attribute
  let calculate_type = req.body.calculate_type
  console.log("user enter the calculate type from html: ", calculate_type);

  //determine the graph is direct or undirect
  let content = req.files.file.data;
  let _text;
  let g = 0;
  for(let e of content){
    _text = _text + String.fromCodePoint(e);
    if(String.fromCodePoint(e) == '>') {
      g++;
    }
    //console.log(String.fromCodePoint(e));
  }
  console.log("text: ",_text);
  //////////////
  //create map//
  //////////////

  let undirected_map =  undiredt_createmap(_text);
  console.log("undirected graph: ", undirected_map);
  let diredt_map = diredt_createmap(_text);
  console.log("directed graph: ", diredt_map);
  //////////////////////////
  //select the right Algo.//
  //////////////////////////
  let order;
  //Directed
  if(g > 0) {
    if(calculate_type == 'DFS') {
      order = dfs_direct(root, diredt_map);
      console.log("DFS_Directed",order);
    }
    else if(calculate_type == 'Topological_Sort') {
      order = topo(diredt_map);
      console.log("Topological_Sort: ", order);
    }
    else if(calculate_type == 'Shortest_Path') {
      order = Shortest(root, diredt_map);
      console.log("shortest: ", order);
    }
    else if(calculate_type == 'BFS') {
      order = "This method not applicable.";
    }
  }
  //Undirected 
  else if(g == 0) {
    if(calculate_type == 'DFS') {
      order = dfs(root, undirected_map);
      console.log("DFS",order);
    }
    else if(calculate_type == 'BFS') {
      order = bfs(root, undirected_map);
      console.log("BFS",order);
    }
    else if(calculate_type == 'Shortest_Path') {
      order = Shortest(root, undirected_map);
      console.log("shortest: ", order);
    }
    else if(calculate_type == 'Topological_Sort') {
      order = "Topological sort must has a directeed graph."
    }
  }
 
  let output = {
    // randomValue: randomValue,
    order: order
  };

  // Convert output to JSON
  let outputString = JSON.stringify(output, null, 2);
  console.log("outputString: ", outputString);

  // Let's generate some artificial delay!
  delay(3000);
  // Send it back to the frontend.
  res.send(outputString);
});

// /**
//  * A promise that resolves after t ms.
//  * @param {Number} t 
//  */
const delay = function(t) {
  return new Promise(resolve => setTimeout(resolve, t));
};


module.exports = {
  diredt_createmap: diredt_createmap,
  undiredt_createmap: undiredt_createmap,
  dfs: dfs,
  dfs_direct: dfs_direct,
  bfs: bfs,
  topo: topo,
  Shortest: Shortest
};