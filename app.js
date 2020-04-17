let myLib = require("./lib/my_lib.js");
let game = require("./lib/game.js");

function main() {
  let msg = myLib.HelloWorld();
  // let  msg2 = myLib.FindMax([2,3,4,5,6]);
   let TD_ = game.towerdefence();
  console.log("TD: ", TD_);
  console.log("msg: ", msg);
}

main();
