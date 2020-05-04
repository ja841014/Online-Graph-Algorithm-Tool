# Online Graph Algorithm Tool

EE599 - Computing and Software for Systems Engineers - Spring 2020

University of Southern California Viterbi School of Engineering

Final Project - a full-stackimplementation of a Online Graph Algorithm Tool

Author: Chun-Hao, Lai

[Online Graph Algorithm Tool](https://graphonline.ru/en/)
# Introduction

In this project, the user enters a graph which is in text format in the frontend and asks to run an algorithm on this graph (DFS, BFS, Topological Sort and Shortest Path) The algorithm is run on the backend and the result will be sent back to the user. Besides, when users upload their text file, they can see their original graphical output on their screen.

# Running this package

To download, install, and test this package, run:

```bash
git clone https://github.com/ja841014/EE599_Project.git
cd nodejs_template-master
npm install
```

## Running Backend
```bash
cd backend
node app.js
```

## Running Frontend
```bash
cd frontend
node app.js
```
Then open your browser to [http://localhost:3000](http://localhost:3000)

# Feature
## Text file Format
Directed Graph Sample

<img alt="Frontend" src="https://github.com/ja841014/EE599_Project/blob/master/frontend/Directed_Graph_Sample.png" width="400">

Undirected Graph Sample

<img alt="Frontend" src="https://github.com/ja841014/EE599_Project/blob/master/frontend/Undirected_Graph_Sample.png" width="400">

# Demo
<img alt="Frontend" src="https://github.com/ja841014/EE599_Project/blob/master/frontend/frontend_appearance.png">
We can click the dropdown menu to choose an algorithm.
<img alt="Frontend" src="https://github.com/ja841014/EE599_Project/blob/master/frontend/DEMO_Select.png">
After we press the upload button, we can see our result on the screen.
<img alt="Frontend" src="https://github.com/ja841014/EE599_Project/blob/master/backend/DEMO_TOPO.png">


# Directory Structure

The files and directories are as follows:

```
.
├── README.md
├── backend
│   └── app.js
├── frontend
│   │── app.js
│   └── public
│       │── index.html
│       │── script.js
│       └── style.css
├── package-lock.json
├── package.json
└── test
    └── mocha_test.js
    
```
