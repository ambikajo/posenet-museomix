let video;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;

//let song1;
//let song2;
//let song3;
let distance;


function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', function (results) {
        poses = results;
    });
//    soundFormats('mp3', 'ogg');
//    song1 = new p5.SoundFile('bihari.mp3');
//    song2 = new p5.SoundFile('harmony.mp3');

}

function modelLoaded() {
    console.log('model ready!');
}

function draw() {
    background(50, 10);
    image(video, width / 2, height / 2);
    drawKeypoints();


}

//function keyPressed() {
//
//    song1.play()
//}

function drawKeypoints() {
    for (let i = 0; i < poses.length; i++) {
        for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            let nX = poses[i].pose.keypoints[0].position.x;
            let nY = poses[i].pose.keypoints[0].position.y;
            ellipse(nX, nY, 10);

            if (poses[i].pose.keypoints[0].score > 0.5) {
                fill(0, 255, 0, 10);
                noStroke();
            }
            if (poses.length == 2) {
                //				console.log("gello");
//                                song1.play();
//                                song2.pause();
                let newX1 = poses[0].pose.keypoints[2].position.x;
                let newX2 = poses[1].pose.keypoints[2].position.x;
                noseX1 = lerp(noseX, newX1, 0.5);
                noseX2 = lerp(noseX, newX2, 0.5);
                distance = abs(noseX1 - noseX2);
                print(abs(noseX1 - noseX2));
            } else if (poses.length < 2) {
//
//                                song2.play();
//                                song1.pause();
            }
        }
    }

}
