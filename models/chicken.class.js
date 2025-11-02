class Chicken extends MovableObject {
    x;
    y;
    width = 80;
    height = 90;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 300;
        this.y = 480 - this.height- 40;
    }
}