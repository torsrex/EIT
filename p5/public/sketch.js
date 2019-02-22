let width = window.innerWidth;       // default: 800
let height = window.innerHeight;      // default: 600
let radio;
let truckImg;
let backgroundColor;
let roads;
let trucks;

function setup() {
  let d = 5;
  let p1 = new Point(d , d);
  let p2 = new Point(d - 5, d * 2);
  let p3 = new Point(d * 2, d * 3);

  let l1 = new Line(p1, p2);
  let l2 = new Line(p2, p3);
  backgroundColor = (204, 102, 0);
  createCanvas(width, height);
  background(backgroundColor);
  noSmooth();
  radio = createRadio();
  radio.option('Draw');
  radio.option('Drive');
  radio.style('width', '60px');
  textAlign(CENTER);

  truckImg = loadImage('/public/assets/truck.png'); // Load the image

  // Draw white points
  stroke(255);

  road1 = new Road([l1, l2], 255, 60, false);
  road2 = new Road([l1, l2], 0, 5, true);
  roads = [road1, road2];
  truck1 = new Truck(0, new Point(0, 0), new Point(0, 0), 5, 155, 2, truckImg, 0.1);
  truck2 = new Truck(0, new Point(0, 0), new Point(0, 0), 7, 100, 2, truckImg, 0.1);
  trucks = [truck1, truck2];

  imageMode(CENTER);
}

function draw() {
  var val = radio.value();
  let goalRadius = 30;
  let minLineLength = 10;
  background(backgroundColor);



  roads.forEach(road => {
    road.display();
    if (val === "Drive") {
      trucks.forEach(truck => {
        if ((road.lines.length + 1) !== truck.getTravelCounter()) {
          if (truck.position.distanceTo(truck.goalPoint) <= goalRadius) {
            truck.setNewGoalPoint(road.getPoint(truck.getTravelCounter()))
          }
          truck.drive();
        }
        truck.display();
      });
    } else if (val === "Draw") {
      if (mouseIsPressed) {
        tempPoint = new Point(mouseX, mouseY);

        if (tempPoint.distanceTo(road.getLast()) > minLineLength && mouseX <= width && mouseY <= height && !(mouseX < 0) && !(mouseY < 0)) {
          road.extend(tempPoint);
        }
      }
    }
  });
}

