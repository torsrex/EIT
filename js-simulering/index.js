window.onload = function() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    var view = paper.view;
    var project = paper.project;

    // Create a Paper.js Path to draw a line into it:
    var path = new paper.Path();
    // Give the stroke a color
    path.strokeColor = 'black';
    var start = new paper.Point(100, 100);
    // Move to start and draw a line from there
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([ 200, -50 ]));


    view.onFrame = function(event) { 
    for (var i = 0; i < project.activeLayer.children.length; i++) { 
        var item = project.activeLayer.children[i]; 
         
        path.rotate(1)
        item.strokeColor = "red";
        console.log(item)
    } 
} 
    // Draw the view now:
    paper.view.draw();
}