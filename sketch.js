

// Video and PoseNet
let video;
let poseNet;
let poses = [];

// Neural Network
let brain;

// Training interface (will be different screen in app)
let dataButton;
let dataLabel;
let trainButton;
let classificationP;

let img;

var counter = {
"Deep Lunge": 0,
"Knees to Chest": 0,
"One Leg Stand": 0,
"Pelvic Tilt": 0,
};

// function preload() {
//   img = loadImage('images/deep-lunge.jpg');
// }

function setup() {

  cnv=createCanvas(640, 480);


  cnv.center();
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.detectionType = 'single'; //console.log output will tell you this
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  title = createElement('h1', 'PHYSIONET');
  title.position(windowWidth/2-(title.width/2), windowHeight*(1/16));

  classificationP = createP('Waiting for physio input');
  classificationP.position(windowWidth/2-(classificationP.width/2), windowHeight*(10/11));;

  // The interface
  dataLabel = createSelect();
  dataLabel.option('Deep Lunge');
  dataLabel.option('Knees to Chest');
  dataLabel.option('One Leg Stand');
  dataLabel.option('Pelvic Tilt');
  dataLabel.position(windowWidth*2/6, windowHeight*(6/7));



  dataButton = createButton('add example');
  dataButton.mousePressed(addExample);
  dataButton.position(windowWidth*3/6-(dataButton.width/2), windowHeight*(6/7));


  trainButton = createButton('train model');
  trainButton.mousePressed(trainModel);
  trainButton.position(windowWidth*4/6-(trainButton.width/2), windowHeight*(6/7));

  // Create the model
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);


}

// Train the model
function trainModel() {
  brain.normalizeData();
  let options = {
    epochs: 25
  }
  brain.train(options, finishedTraining);
}

// Begin prediction
function finishedTraining() {
  classify();
}

// Classify
function classify() {
  if (poses.length > 0) {
    let inputs = getInputs();
    brain.classify(inputs, gotResults);
  }
}

function gotResults(error, results) {
  //  Log output
  classificationP.html(`${results[0].label} (${floor(results[0].confidence * 100)})%`);
  if (floor(results[0].confidence * 100)>60){
    tint(144,238,144)
  }
  else{
    tint(250,128,114)
  }
  // Classify again
  classify();
}

function getInputs() {
  let keypoints = poses[0].pose.keypoints;
  let inputs = [];
  for (let i = 0; i < keypoints.length; i++) {
    inputs.push(keypoints[i].position.x);
    inputs.push(keypoints[i].position.y);
  }
  return inputs;
}

//  Add a training example
function addExample() {
  if (poses.length > 0) {
    let inputs = getInputs();
    let target = dataLabel.value();
    brain.addData(inputs, [target]);
  }
  console.log("added example")
  counter[dataLabel.value()]+=1;
  console.log(counter[dataLabel.value()]);
  console.log(dataLabel.value());
}

// PoseNet ready
function modelReady() {
  console.log('model loaded');
}

// Draw PoseNet
function draw() {
  drawPoints()
  drawSkeleton()
  colourButton()
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

  function drawPoints(){
    image(video, 0, 0, width, height);
    strokeWeight(2);
    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
      let pose = poses[0].pose;
      for (let i = 0; i < pose.keypoints.length; i++) {
        fill(213, 0, 143);
        noStroke();
        ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 8);
      }
    }
  }

  function colourButton(){
    let r = 255;
    let g = 0;
    let b = 0;
    if (dataLabel.value() == 'Deep Lunge'){
      r = 255 - (255/20)*counter['Deep Lunge'];
      g = (255/20)*counter['Deep Lunge'];
    }else if (dataLabel.value() == 'Knees to Chest') {
      r = 255 - (255/20)*counter['Knees to Chest'];
      g = (255/20)*counter['Knees to Chest'];
    }else if (dataLabel.value() == 'One Leg Stand') {
      r = 255 - (255/20)*counter['One Leg Stand'];
      g = (255/20)*counter['One Leg Stand'];
    }else if (dataLabel.value() == 'Pelvic Tilt') {
      r = 255 - (255/20)*counter['Pelvic Tilt'];
      g = (255/20)*counter['Pelvic Tilt'];
    }
    dataButton.style('background-color', color(r, g, b));
  }
