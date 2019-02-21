function setup() {
  let d = 70;
  let p1 = new Point(d-20, d);
  let p2 = new Point(d-32, d * 2);
  let p3 = new Point(d * 2, d * 3);
  let p4 = new Point(d * 3, d * 4);

  let l1 = new Line(p1, p2);
  let l2 = new Line(p2, p3);
  let l3 = new Line(p3, p4);

  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(720, 400);
  background(0);
  noSmooth();

  // Draw white points
  stroke(255);

  road = new Road([l1, l2, l3], 255)
  truck  = new Truck(0, new Point(100, 100), p1, 10 ,155);
  road.display()
}

function draw() {
  //ellipse(50, 50, 80, 80);
  console.log("Distance to point: "+truck.position.distanceTo(truck.goalPoint))
  if(truck.position.distanceTo(truck.goalPoint)<=10){
    console.log("GetPoint.x: "+road.getPoint().x+" GetPoint.y: "+road.getPoint().y+"   travelcounter"+truck.getTravelCounter());
    
    truck.setNewGoalPoint(road.getPoint(truck.getTravelCounter()))
  }
  
  if (mouseIsPressed) {
    road.extend(new Point(mouseX, mouseY))
    road.display();

    truck.drive();
    truck.display();
  }
}