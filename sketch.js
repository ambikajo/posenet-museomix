let startPlay = false;
let resetScreen = false;

let video1;

let constraints1;

let poses1 = [];

let poseNet1;

let helFont; //variable for the font
//details for the score
let current = 0;

let final = 0;

let score = 0;
let iterations = 0;
//size of the circle on start
let size = 20;


function gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind == "videoinput") {
            console.log(deviceInfo);
        }


    }
}


function streamCameras() {
    for (var i = 0; i < 2; i++) {
        console.log(videolist[i]);

    }
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

function preload() {
    helFont = loadFont('SFCompactDisplay-Black.otf');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    //copy the device info from console to create constraints for the webcams
    constraints1 = {
        video: {
            deviceId: "b5c6c47394727cf069ffadac37b87e166d140373a6ebef530a2460efa2ab4aea",
            groupId: "428be613f540738fd77e6b7fd8203603d189d03dc6dbf34678bcd5639cae9074",
            kind: "videoinput",
            label: "C922 Pro Stream Webcam (046d:085c)"
        }
    }

    video1 = createCapture(constraints1);
    //video2 = createCapture(constraints2);
   video1.size(width, height)
    //load posenet
    poseNet1 = ml5.poseNet(video1, modelLoaded);
    poseNet1.on('pose', function (results) {
        poses1 = results;
    });


}
// When the model is loaded
modelLoaded = function () {
    console.log('Model Loaded!');
}

function draw() {
    background(120, 120, 210);
    image(video1, 0, 0,width, height);



    drawKeypoints1();
    drawSkeleton(poses1);


}

function drawKeypoints1() {
    current = final;
    final = 0;
    //initiating the poses and nose keypoint for video1
    for (let i = 0; i < poses1.length; i++) {

        let pr = poses1[i].pose.keypoints[0];
        final += pr.position.x;
        if (poses1[i].pose.score > 0.20) {
            fill(255, 0, 0, 100);
            noStroke();
            if (score <= 10){
              if (final - current > 2 && current != 0) {
                score += 1;
                size += 7;
                console.log(score);
              }
            } else {
              score =0;
              size = 0
            }


          if (poses1.length > 2){
            ellipse(pr.position.x, pr.position.y, size);
          } else {
            rectMode(CENTER)
            rect(pr.position.x, pr.position.y, size, size);
          }

        }
    }


}

function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses1.length; i++) {
        let skeleton = poses1[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            strokeWeight(1);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
