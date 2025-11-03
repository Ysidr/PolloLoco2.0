class BackgroundObject extends MovableObject {


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.width = 720;
        this.height = 480;
        this.x = x;
        this.y = 0;
    }
}