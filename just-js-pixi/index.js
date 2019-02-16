const log = console.log();
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
truck.x = 500;
truck.y = 500;

let curve = [
    [truck.x, truck.y],   //Start position
    [108, 32],                    //Control point 1
    [176, 32],                    //Control point 2
    [196, 160]                    //End position
];


c.followCurve(
    truck,            //The sprite
    curve,                //The Bezier curve array
    120,                  //Duration, in milliseconds
    "smoothstep",         //Easing type
    true,                 //Should the tween yoyo?
    1000                  //Delay, in milliseconds, before it yoyos
);


app.stage.addChild(truck);


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