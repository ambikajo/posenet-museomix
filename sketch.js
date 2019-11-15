let img;
let mCentre; //mural centre
let fish1;
let fish2;
let pg;
let iterations;
let x = 0;
let s = 0;
let time;
let start = 0;
//let x = 0
let video;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;
let distance; 
function preload() {
    img = loadImage("images/mural.jpeg");
    mCentre = loadImage("images/mural_centre.png");
    fish1 = loadImage("images/mural_fish.png");
    fish2 = loadImage("images/mural_fish2.png");
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    pg = createGraphics(innerWidth, innerHeight)
    time = millis()
    imageMode(CENTER);
    video = createCapture(VIDEO)
    //video.size(120, 80);
    //video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', function (results) {
        poses = results;
    })
}

function modelLoaded() {
    console.log('model ready!');
}


function draw() {
    background(255)
    image(img, width / 2, height / 2)
    image(video, width - 100, img.height, 120, 80)
    // pg.background(255)
    image(pg, width / 2, height / 2)
    //    turtleRing()
    //    midCircles()
    //    parrotMove()
    
         drawKeypoints()
    
        
     rotC()
    
   




}

function turtleRing() {
    fill(255)
    let fy = sin(x) * 10
    image(fish1, 190, 225 + fy)
    image(fish2, 1041, 225 + fy)
    if (s % 20 == 0) {
        fill(255)
        ellipse(180, 580, 100, 100)
        ellipse(1154, 398, 100, 100)
    } else {
        fill(0)
    }


}

function parrotMove() {
    pg.noStroke()
    let xl = cos(x) * 400
    let yl = sin(x) * 400
    //print(x) //- needed to understand the location of x when you want the arc to start.
    if (x > 2) {

        pg.fill(255)
        pg.ellipse(xl + width / 2, yl + height / 2, 60, 60)
        //print(pg.ellipse.length)
    }
   // x += 0.02


}



function rotC() {
    
   translate(width / 2, height / 2);
    rotate(x)
    image(mCentre, 0, 0)
    x += 0.02

}

function midCircles() {
    s += 0.5
    noStroke()
    if (s < 10) {
        fill('red')
        ellipse(511, 552, 120, 120)
    } else if (s < 15) {
        fill('white')
        ellipse(429, 416, 120, 120)
    } else if (s < 20) {
        fill('blue')
        ellipse(466, 268, 120, 120)
    } else if (s < 25) {
        fill('orange')
        ellipse(782, 268, 120, 120)
    } else if (s < 30) {
        fill('purple')
        ellipse(855, 416, 120, 120)
    } else if (s < 35) {
        fill('red')
        ellipse(762, 552, 120, 120)
    } else if (s < 40) {
        s = 0;
    }

}

function keyPressed() {
    //    if (keyCode === 82) {
    //        print("reset")
    //        x = 0;
    //        s = 0;
    //       // pg.redraw()
    //    }
    // print("YES")
}

function drawKeypoints() {
    for (let i = 0; i < poses.length; i++) {
        for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            let nX = poses[i].pose.keypoints[0].position.x;
            let nY = poses[i].pose.keypoints[0].position.y;

            if (poses[i].pose.keypoints[0].score > 0.4) {
                noStroke();
                fill(0,150);
                // translate(width/2,0)
               // ellipse(nX, nY, 10);


                if (poses.length == 2) {

                    let newX1 = poses[0].pose.keypoints[0].position.x;
                    let newX2 = poses[1].pose.keypoints[0].position.x;
                    //let noseX1 = lerp(noseX, newX1, 0.5);
                    //let noseX2 = lerp(noseX, newX2, 0.5);
                    distance = abs(newX1 - newX2);
                    print(distance);
                    fill(0);
                    // rect(-1, -1, width+1, height+1);
                    //fill(255, 100);
                    //rotC()
                    ellipse(nX, nY, 10)
                    ellipse(width / 2, height / 2, distance, distance);
                    
                } 
            } 
            // flashy();
            //ellipse(nX, nY, 100);

        }
    }

}
