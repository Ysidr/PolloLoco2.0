/**
 * @class Chicken
 * @extends PcNpc
 * @description Enemy chicken with patrol behavior and basic hit handling.
 */
class Chicken extends PcNpc {
    x = 700;
    y;
    width = 80;
    height = 90;
    hp = 5;
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
    framesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

    /**
     * @constructor
     * @description Preloads animations, randomizes speed and position, and starts animation loop.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.framesWalk);
        this.loadImages(this.framesDead);
        this.speed = 0.15 + Math.random() * 0.5,
            !this.hasReset ? this.x = 700 + Math.random() * 3000 : this.x = this.x;
        this.y = 480 - this.height - 40;

        this.animate();
    }


    /**
     * @function animate
     * @description Handles walking and death animations while moving the chicken.
     */
    animate() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.checkHealth();
            this.checkIfDying();
            this.checkPosition();
        }, 10000 / 60, `${className}chicken-animate`);
        this.moveLeft();
    }

    /**
     * @function checkIfDying
     * @description Plays the appropriate animation depending on whether the chicken is dying.
     */
    checkIfDying() {
        if (this.isDying) {
            let i = 0;
            if (i < this.framesDead.length) {
                this.playAnimation(this.framesDead);
                i++;
            }
            this.isDead = true;
        } else {
            this.playAnimation(this.framesWalk);
        }
    }

    /**
     * @function checkPosition
     * @description Resets the chicken to the far right when it exits the screen.
     */
    checkPosition() {
        if (this.x < 0) {
            this.x = 5000;
            this.hasReset = true;
        }
    }


}