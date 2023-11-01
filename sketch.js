
let graph;
let input;
let button;
let transactionAmountSlider;
let transcationSizeFilter;

let globalTranslation;
let zoomScale = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  input = createInput("");
  input.position(10,10);

  button = createButton("Submit");
  button.position(input.width+10,10);
  button.mousePressed(handleSubmission);
  
  transactionAmountSlider = createSlider();
  transcationSizeFilter = createSlider();
  dasdsa



  globalTranslation = createVector(width/2,height/2);
  graph = new Graph();
}

function draw() {
  background(30);
  // circle(width/2,height/2,10000);
  if(graph.transactionsLoaded == true) {  
    push(); 
      // scale(zoomScale);
      // translate(globalTranslation);
      graph.render();
    

    pop();
  }


}

function handleSubmission() {
 
  if(input.value().slice(0,2) !=  "0x") {
    window.alert("Please give an address or a contract");
  } else {
    //check if there is already a graph active
    if(graph.transactionsLoaded == true) {
      window.alert(`There is already a graph loaded at address: ${graph.createShortHand(graph.address)}`)
      return;
    }

    const address = input.value().trim()
    graph.address = address;
    
    //Fetch the accounts history here
    graph.requestAccountHistory(address);
    // shortHand = createShortHand(address);
  }

}

//Moved controller.js code out into the app file

// function mouseDragged(e) {
//    globalTranslation.x += e.movementX;
//    globalTranslation.y += e.movementY;
// }

// function mouseWheel(e) {
//   zoomScale -= e.delta/1000;
// } 

function mousePressed() {
 
  if(graph.transactionsLoaded == true) {
    graph.selectNode(globalTranslation);
    graph.selectPanel();
  } else {
    return;
  }

}
