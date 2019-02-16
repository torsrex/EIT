const log = console.log;
const app = new PIXI.Application({
    width: screen.availWidth,         // default: 800
    height: screen.availHeight - 130,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1       // default: 1
}
);

c = new Charm(PIXI);

document.body.appendChild(app.view);

let texture = PIXI.Texture.from('truck.svg');
let truck = new PIXI.Sprite(new PIXI.Texture(texture));

truck.interactive = true;
truck.buttonMode = true;
truck.anchor.set(0.5);
truck.x = 300;
truck.y = 300;

/*let curve = [
    [truck.x, truck.y],   //Start position
    [truck.x+100, truck.y+100],                   //Control point 1
    [truck.x-100, truck.y-100],                    //Control point 2
    [truck.x, truck.y],                     //End position
];*/

let curve = [
    //First curve
    [[truck.x, truck.y], [truck.x + 75, truck.y + 500], [truck.x + 200, truck.y + 500], [truck.x + 300, truck.y + 300]],

    //Second curve
    [[truck.x + 300, truck.y + 300], [truck.x + 250, truck.y + 100], [truck.x + 100, truck.y + 100], [truck.x, truck.y]]
];


c.walkCurve(
    truck,            //The sprite
    curve,                //The Bezier curve array
    300,                          //Total duration, in frames
    "smoothstep",                 //Easing type
    true,                         //Should the path loop?
    true,                         //Should the path yoyo?
    1000                          //Delay in milliseconds between segments
);


app.stage.addChild(truck);

const onDragStart = event => {
    truck.data = event.data;
    truck.dragging = true;
};

const onDragEnd = event => {
    delete truck.data;
    truck.dragging = false;
};

const onDragMove = event => {
    if (truck.dragging === true) {
        const newPosition = truck.data.getLocalPosition(truck.parent);
        truck.x = newPosition.x;
        truck.y = newPosition.y;
    };
};

truck.on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)


function gameLoop() {

    //Create the loop
    requestAnimationFrame(gameLoop);

    //Update charm
    c.update();

    //Optionally, you probably also need to render Pixi's root
    //container. If your root container is called `stage` you could
    //update it like this:
    //PIXI.renderer.render(stage);
}

gameLoop()