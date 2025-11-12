/**
 * @class Throwables
 * @extends MovableObject
 * @description Base class for throwable projectiles that handles shared behaviors like animation and collision checks.
 */
class Throwables extends MovableObject {
    /**
     * @type {boolean}
     * @description Indicates whether the throwable should travel to the left.
     */
    isTrowingLeft = false;

    /**
     * @constructor
     * @param {World} world - The active game world managing the throwable instances.
     */
    constructor(world) {
        super(world);
        this.world = world;
    }

    /**
     * @function animate
     * @description Runs the throwable's flight loop until it collides with an enemy or the ground.
     */
    animate() {
        this.world.character.otherDirection ? this.isTrowingLeft = true : this.isTrowingLeft = false;
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            if (this.isAboveGround() && !this.checkEnemyCollision()) {
                this.fly();
            } else {
               this.bottleHitGround();
            }
        }, 3000 / 60, `${className}-throwable-animate`);
        this.world.character.throwableCount--;
        this.world.bottleStatusBar.updateBottleStatusBar(this.world.character.throwableCount);
    }

    bottleHitGround() {
        this.break();
        if (this.world.throwables.length > 0) {
            this.world.throwables.pop();
        }
        IntervalManager.removeInterval(this.id,`${className}-throwable-animate`);
        IntervalManager.allFunctions.splice(IntervalManager.allFunctions.findIndex(fn => fn.fn === this.animate), 1);
        IntervalManager.allFunctions.splice(IntervalManager.allFunctions.findIndex(fn => fn.fn === this.applyGravity), 1);
    }

    /**
     * @function break
     * @description Triggers the breaking animation and plays the corresponding sound effect.
     */
    break() {
        this.playAnimation(this.framesBreak);
        this.world.audioManager.playSound('bottleBreak',1.0,false);
    }

    /**
     * @function fly
     * @description Updates the projectile's position while in flight and plays the throw animation.
     */
    fly() {
        if (!this.throwSoundPlayed) {
            this.world.audioManager.playSound('bottleThrow', 0.5, false);
            this.throwSoundPlayed = true;
        }
        this.speedY -= this.acceleration;
        this.y -= this.speedY;
        this.isTrowingLeft ? this.x -= this.speed : this.x += this.speed;

        this.playAnimation(this.framesFlying);
    }

    /**
     * @function checkEnemyCollision
     * @returns {boolean} True if the throwable is colliding with any enemy.
     * @description Detects collisions with enemies to determine whether to trigger the break sequence.
     */
    checkEnemyCollision() {
        return this.world.enemies.some(enemy => this.isColliding(enemy));
    }
}