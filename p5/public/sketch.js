let width = screen.availWidth - 100;
let height = screen.availHeight - 200;
let interactiveMode = 'Draw'; //Set default interactive mode
let truckImg;
let backgroundColor = "#0E852D";
let roads;
let trucks = [];
let infos;
let speed = 10; // Set default start speed
let draggableTruck;

let pinging;

function preload() {
    obstacleImg = loadImage('/public/assets/Pinne.png');
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

    createCanvas(width, height);
    background(backgroundColor);
    noSmooth();

    // Draw white points
    stroke(255);
    frameRate(30);

    let road1 = new Road([l1, l2], 125, 60, false);
    draggableObstacle = new Draggable(new Point(100,100),obstacleImg,0.8,road1);
    roads = [road1];

    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
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
    let goalRadius = 30;
    let minLineLength = 10;
    roads.forEach(road => {
        if (interactiveMode === "Drive") {
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
                else {
                    trucks.splice(trucks.indexOf(truck),1)
                    connector.remove(truck);
                }
            });
        } else if (interactiveMode === "Draw") {
            if (mouseIsPressed) {
                let tempPoint = new Point(mouseX, mouseY);
                if (tempPoint.distanceTo(road.getLast()) > minLineLength && mouseX <= width && mouseY <= height && !(mouseX < 0) && !(mouseY < 0)) {
                    road.extend(tempPoint);
                    road.display();
                }
            } else {
                noLoop();
            }
        } else if (interactiveMode === "Drag") {
            background(backgroundColor);
            road.display();
            draggableObstacle.display();
        }
    });
}

function mousePressed() {
    if (interactiveMode === "Draw") {
        if (mouseIsPressed) {
            loop();
        }
    } else if (interactiveMode === "Drive") {
        loop();
    }
}

function p5React() {
    let id = truckController.getNextTruckId()
    trucks.push(new Truck(id, new Point(0, 0), new Point(0, 0), speed, truckImg, 0.1, "Truck "+id, pinging, roads[0]));
}

function changeSpeed(val){
    speed = val;
}

function changeInteractiveMode(val){
    console.log(val);
    
    interactiveMode = val;
}