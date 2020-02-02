



# physNet  
## Hackathon submission for RoyalHackaway

## to run
npm install
npm start

## Inspiration
Physiotherapy costs the NHS **millions** of pounds every year and a significant amount of time. It has been shown to be a cost-effective way of speeding up patient recovery for a large number of conditions including back pain (the largest source of productivity loss), Parkinson's, rehabilitation after a heart attack and cystic fibrosis.

We wanted to improve access to this valuable treatment whilst retaining a high quality of treatment.

## What it does
Our web app allows physiotherapists to work with their patients to develop good form and technique. It then gives the patient feedback on their form in a simple and intuitive way. We have designed our app to be accessible to those with poor hearing and sight.

## How I built it
Our solution uses two **state of the art neural networks**. The first (**posenet**) is responsible for estimating body position from a video input. It identifies **16 independent features** to form a skeleton so that one could determine where for example a person's ankle was. It essentially draws a stick man over people in the frame. The second is a classifier that differentiates between various poses made by the patient (and posenet algorithm). The idea is that it encodes the expertise of the physiotherapist, allowing the patient to improve their technique with feedback from the algorithm.

We used tensorflow.js (and a wrapper called ml5) for the neural networks, p5 for our animation and a node.js server to serve our app.
