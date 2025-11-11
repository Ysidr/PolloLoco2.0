class StatusBars extends MovableObject {
    width = 200;
    height = 50;
    img;
    imgCache = {};
    offsetX = 10;  
    offsetY = 20;   

    constructor() {
        super();
        this.x = this.offsetX;
        this.y = this.offsetY;
    }

    updatePosition() {
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.offsetX, this.y, this.width, this.height);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}