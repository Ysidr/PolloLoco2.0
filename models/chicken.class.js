/**
 * @class Chicken
 * @extends PcNpc
 * @description Enemy chicken with patrol behavior and basic hit handling.
 */
class Chicken extends PcNpc {
    /**
     * @type {number}
     * @description Initial horizontal position in the world.
     */
    x = 700;
    /**
     * @type {number}
     * @description Vertical position aligned to the ground level.
     */
    y;
    /**
     * @type {number}
     * @description Width of the chicken sprite.
     */
    width = 80;
    /**
     * @type {number}
     * @description Height of the chicken sprite.
     */
    height = 90;
    /**
     * @type {number}
     * @description Hit points remaining before the chicken dies.
     */
    hp = 5;
    /**
     * @type {boolean}
     * @description Tracks whether the chicken has looped back into the level.
     */
    hasReset = false;

    /**
     * @type {{top:number,bottom:number,left:number,right:number}}
     * @description Collision box adjustments for the chicken sprite.
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    /**
     * @type {string[]}
     * @description Animation frames for the walking cycle.
     */
    framesWalk = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    /**
     * @type {string[]}
     * @description Animation frames used when the chicken dies.
     */
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