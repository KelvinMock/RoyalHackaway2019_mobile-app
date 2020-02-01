// Step 1: Create an image classifier with MobileNet
const classifier = ml5.imageClassifier('MobileNet', onModelReady);

// Step 2: select an image
const img = document.querySelector("#myImage")

// Step 3: Make a prediction
let prediction = classifier.predict(img, gotResults);

// Step 4: Do something with the results!
function gotResults(err, results) {
  console.log(results);
  // all the amazing things you'll add

}