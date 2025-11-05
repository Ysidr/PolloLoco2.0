class MiniChicken extends PcNpc {
    x = 700;
    y;
    width = 80;
    height = 90;
    hp = 5;
    hasReset = false;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    framesWalk = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]
    framesDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.framesWalk);
        this.loadImages(this.framesDead);
        this.speed = 0.15 + Math.random() * 0.5,
        !this.hasReset ? this.x = 700 + Math.random() * 3000 : this.x = this.x;
        this.y = 480 - this.height - 40;

        this.animate();
    }


    animate() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.checkHealth();
            this.playAnimation(this.framesWalk);
            this.checkPosition();
        }, 10000 / 60, `${className}chicken-animate`);
        this.moveLeft();
    }

    checkPosition() {
        if (this.x < 0) {
            this.x = 5000;
            this.hasReset = true;
        }
    }

}
    

