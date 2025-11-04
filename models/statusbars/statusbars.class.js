class StatusBars extends MovableObject {
    width = 200;
    height = 50;
    img;
    imgCache = {};
    offsetX = 10;  // Fixed position from left
    offsetY = 20;   // Fixed position from top

    constructor() {
        super();
        // Set initial position (will be updated in draw)
        this.x = this.offsetX;
        this.y = this.offsetY;
    }

    // This method is called from World.draw()
    updatePosition() {
        // No need to adjust for camera here since we're drawing in screen space
        // The position is set directly in screen coordinates
    }

    draw(ctx) {
        // Draw directly to screen coordinates (not affected by camera)
        ctx.drawImage(this.img, this.offsetX, this.y, this.width, this.height);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}