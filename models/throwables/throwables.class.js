class Throwables extends MovableObject {
    isTrowingLeft = false;

    constructor(world) {
        super(world);
        this.world = world;
    }

    animate() {
        this.world.character.otherDirection ? this.isTrowingLeft = true : this.isTrowingLeft = false;
        const intervalId = IntervalManager.setInterval(() => {
            if (this.isAboveGround() && !this.checkEnemyCollision()) {
                this.fly();
            } else {
                this.break();
                this.world.throwables.pop();
                IntervalManager.removeInterval(intervalId);
                IntervalManager.allFunctions.splice(IntervalManager.allFunctions.findIndex(fn => fn.fn === this.animate), 1);
                IntervalManager.allFunctions.splice(IntervalManager.allFunctions.findIndex(fn => fn.fn === this.applyGravity), 1);


            }
        }, 3000 / 60, `throwable-animate-${this.id}`);
        this.world.character.throwableCount--;
        this.world.bottleStatusBar.updateBottleStatusBar(this.world.character.throwableCount);
    }

    break() {
        this.playAnimation(this.framesBreak);
        this.world.audioManager.playSound('bottleBreak',1.0,false);
    }

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

    checkEnemyCollision() {
        return this.world.enemies.some(enemy => this.isColliding(enemy));
    }
}