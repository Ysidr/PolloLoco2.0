/**
 * @class MiniChicken
 * @extends PcNpc
 * @description Smaller chicken enemy variant with similar movement and death logic.
 */
class MiniChicken extends PcNpc {
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
     * @description Width of the mini chicken sprite.
     */
    width = 60;
    /**
     * @type {number}
     * @description Height of the mini chicken sprite.
     */
    height = 60;
    /**
     * @type {number}
     * @description Health points before the mini chicken is defeated.
     */
    hp = 5;
    /**
     * @type {boolean}
     * @description Tracks whether the mini chicken has looped back into the level.
     */
    hasReset = false;

    /**
     * @type {{top:number,bottom:number,left:number,right:number}}
     * @description Collision box adjustments for the mini chicken sprite.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * @type {string[]}
     * @description Animation frames for the walking cycle.
     */
    framesWalk = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]
    /**
     * @type {string[]}
     * @description Animation frames used when the mini chicken dies.
     */
    framesDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
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
     * @description Handles walking and death animations while moving the mini chicken.
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
     * @description Resets the mini chicken to the far right when it exits the screen.
     */
    checkPosition() {
        if (this.x < 0) {
            this.x = 5000;
            this.hasReset = true;
        }
    }

}
    

