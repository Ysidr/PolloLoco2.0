class Cloud extends MovableObject {
    width = 250;
    height = 150;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.y = 10+ Math.random() * 50;
        this.x = Math.random() * 800;

        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}