const assert = require("assert");
const myLib = require("../backend/app.js");

// Testing undirected dfs - 1
describe("Find dfs order in undirected graph_1.", () => {
  it("should return dfs order", () => {
    let map = {
      '1': [ 2, 5 ],
      '2': [ 1, 3, 4 ],
      '3': [ 2 ],
      '4': [ 2, 6 ],
      '5': [ 1, 6 ],
      '6': [ 4, 5, 7 ],
      '7': [ 6 ]
    };
    let root = 1;
    let result = [1,5,6,7,4,2,3];
    assert.equal(JSON.stringify(myLib.dfs(root, map)), JSON.stringify(result));
  });
});
// Testing undirected dfs - 2
describe("Find dfs order in undirected graph_2.", () => {
  it("should return dfs order", () => {
    let map = {
      '1': [ 2, 5 ],
      '2': [ 1, 3, 4 ],
      '3': [ 2 ],
      '4': [ 2, 6 ],
      '5': [ 1, 6 ],
      '6': [ 4, 5, 7 ],
      '7': [ 6 ]
    };
    let root = 4;
    let result = [4,6,7,5,1,2,3];
    assert.equal(JSON.stringify(myLib.dfs(root, map)), JSON.stringify(result));
  });
});
// Testing undirected dfs - 3
describe("Find dfs order in undirected graph_3.", () => {
  it("should return root out of bound", () => {
    let map = {
      '1': [ 2, 5 ],
      '2': [ 1, 3, 4 ],
      '3': [ 2 ],
      '4': [ 2, 6 ],
      '5': [ 1, 6 ],
      '6': [ 4, 5, 7 ],
      '7': [ 6 ]
    };
    let root = 9;
    let result = "Your root is out of bound!";
    assert.equal(JSON.stringify(myLib.dfs(root, map)), JSON.stringify(result));
  });
});
// Testing directed dfs - 1
describe("Find dfs order in directed graph_1.", () => {
  it("should return dfs order", () => {
    let map = { '0': [ 1 ], '1': [ 2, 3 ], '3': [ 4, 6 ], '5': [ 6 ] };
    let root = 0;
    let result = [0,1,3,6,4,2,5];
    assert.equal(JSON.stringify(myLib.dfs_direct(root, map)), JSON.stringify(result));
  });
});
// Testing directed dfs - 2
describe("Find dfs order in directed graph_2.", () => {
  it("should return dfs order", () => {
    let map = { '2': [ 3 ], '3': [ 1 ], '4': [ 0, 1 ], '5': [ 0, 2 ] };
    let root = 5;
    let result = [5,2,3,1,0,4];
    assert.equal(JSON.stringify(myLib.dfs_direct(root, map)), JSON.stringify(result));
  });
});
// Testing directed dfs - 3
describe("Find dfs order in directed graph_2.", () => {
  it("should return root out of bound", () => {
    let map = { '2': [ 3 ], '3': [ 1 ], '4': [ 0, 1 ], '5': [ 0, 2 ] };
    let root = 9;
    let result =  "Your root is out of bound!";
    assert.equal(JSON.stringify(myLib.dfs_direct(root, map)), JSON.stringify(result));
  });
});
// Testing undirected bfs - 1
describe("Find bfs order in undirected graph_1.", () => {
  it("should return bfs order", () => {
    let map = {
      '1': [ 2, 3, 4 ],
      '2': [ 1, 5, 9 ],
      '3': [ 1, 5 ],
      '4': [ 1, 7 ],
      '5': [ 2, 3, 6, 8 ],
      '6': [ 5 ],
      '7': [ 4 ],
      '8': [ 5 ],
      '9': [ 2 ]
    };
    let root = 5;
    let result = [5, 2, 3, 6, 8, 1, 9, 4, 7];
    assert.equal(JSON.stringify(myLib.bfs(root, map)), JSON.stringify(result));
  });
});
// Testing undirected bfs - 2
describe("Find bfs order in undirected graph_2.", () => {
  it("should return bfs order", () => {
    let map = {
      '1': [ 2, 5 ],
      '2': [ 1, 3, 4 ],
      '3': [ 2 ],
      '4': [ 2, 6 ],
      '5': [ 1, 6 ],
      '6': [ 4, 5, 7 ],
      '7': [ 6 ]
    };
    let root = 4;
    let result = [4,2,6,1,3,5,7];
    assert.equal(JSON.stringify(myLib.bfs(root, map)), JSON.stringify(result));
  });
});
// Testing topo - 1
describe("Find topological order in directed graph_1.", () => {
  it("should return dfs order", () => {
    let map = {
      '2': [ 3 ], '3': [ 1 ], '4': [ 0, 1 ], '5': [ 0, 2 ]
    };
    let result = [5,2,3,4,1,0];
    assert.equal(JSON.stringify(myLib.topo(map)), JSON.stringify(result));
  });
});
// Testing topo - 2
describe("Find topological order in directed graph_2.", () => {
  it("should return dfs order", () => {
    let map = {
      '0': [ 1 ], '1': [ 2, 3 ], '3': [ 4, 6 ], '5': [ 6 ]
    };
    let result = [5,0,1,3,6,4,2];
    assert.equal(JSON.stringify(myLib.topo(map)), JSON.stringify(result));
  });
});
