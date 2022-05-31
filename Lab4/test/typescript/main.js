class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    ;
    draw() {
        console.log("X: " + this.x + " Y: " + this.y);
    }
    get X() { return this.x; }
    set X(value) {
        if (value < 0)
            throw new Error("value Cannot be less than zero!");
        this.x = value;
    }
    get Y() { return this.y; }
    set Y(value) {
        if (value < 0)
            throw new Error("value Cannot be less than zero!");
        this.y = value;
    }
}
let point = new Point(-1, -2);
let x = point.X;
point.X = 10;
point.draw();
