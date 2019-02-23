class Info{
    constructor(position, text,stroke, strokeWeight){
        this.position = position;
        this.text = text;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
    }

    setPosition(newPosition){
        this.position = newPosition;
    }


    display(){
        stroke(this.stroke)
        strokeWeight(this.strokeWeight);
        push()
        translate(this.position.x,this.position.y);
        text(this.text,0,0);
        pop();
    }
}