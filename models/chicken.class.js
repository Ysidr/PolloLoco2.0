class Chicken extends PcNpc {
    x;
    y;
    width = 80;
    height = 90;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    framesWalk = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.framesWalk);
        this.speed = 0.15 + Math.random() * 0.5,

        this.x = 700 + Math.random() * 300;
        this.y = 480 - this.height - 40;

        this.animate();
    }
    

    animate() {
        IntervalManager.setInterval(() => {
            this.playAnimation(this.framesWalk);
        }, 10000 / 60, 'chicken-animate');
        this.moveLeft();
    }

}