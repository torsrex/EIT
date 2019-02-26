let width = screen.availWidth;       // default: 800
let height = screen.availHeight;      // default: 600
let radio;
let truckImg;
let backgroundColor;
let roads;
let trucks = [];
let infos;


let pinging;

function preload() {
  pinging = loadAnimation('/public/assets/pingingAsset02.png', '/public/assets/pingingAsset07.png');
  pinging.playing = false;
}


/**
 * The statements in the setup() function are only executed once.
 * These execute when the program begins.
 */
function setup() {
  let d = 5;
  let p1 = new Point(d, d);
  let p2 = new Point(d - 5, d * 2);
  let p3 = new Point(d * 2, d * 3);

  let l1 = new Line(p1, p2);
  let l2 = new Line(p2, p3);
  backgroundColor = (204, 102, 255);
  createCanvas(width, height);
  background(backgroundColor);
  noSmooth();
  radio = createRadio();
  radio.option('Draw');
  radio.option('Drive');
  radio.style('width', '60px');

  truckImg = loadImage('/public/assets/truck.png'); // Load the image

  // Draw white points
  stroke(255);

  road1 = new Road([l1, l2], 125, 60, false);
  roads = [road1];
  trucks.push(new Truck(trucks.length, new Point(0, 0), new Point(0, 0), 5, truckImg, 0.1, "I am a slow truck!",pinging));

  imageMode(CENTER);
  textAlign(CENTER);
  textSize(25);
  background(backgroundColor);
  noLoop();
}



/**
 * The main draw function. 
 * Everything rendered in the browser must pass this function.
 * 
 * From documentation:
 * 
 * The statements in draw() are executed until the program is stopped. 
 * Each statement is executed in sequence and after the last line is read, the first line is executed again.
 * (https://p5js.org/examples/structure-setup-and-draw.html)
 */
function draw() {
  console.time();
  let val = radio.value();
  let goalRadius = 30;
  let minLineLength = 10;
  roads.forEach(road => {
    if (val === "Drive") {
      background(backgroundColor);
      road.display();
      trucks.forEach(truck => {
        if ((road.lines.length + 1) !== truck.getTravelCounter()) {
          if (truck.position.distanceTo(truck.goalPoint) <= goalRadius) {
            truck.setNewGoalPoint(road.getPoint(truck.getTravelCounter()))
          }
          truck.drive();
          truck.display();
        }
      });
    } else if (val === "Draw") {
      if (mouseIsPressed) {
        tempPoint = new Point(mouseX, mouseY);

        if (tempPoint.distanceTo(road.getLast()) > minLineLength && mouseX <= width && mouseY <= height && !(mouseX < 0) && !(mouseY < 0)) {
          road.extend(tempPoint);
          road.display();
        }
      }else{
        noLoop();
      }
    }
  });
  console.timeEnd();
}

function mousePressed() {
  let val = radio.value();
  if (val === "Draw"){
    if (mouseIsPressed) {
      loop();
    }
  }else if(val === "Drive"){
    loop();
  }
}

function p5React(){
  trucks.push(new Truck(trucks.length, new Point(0, 0), new Point(0, 0), random(10), truckImg, 0.1, "I am a slow truck!",pinging));
  forEach
}
