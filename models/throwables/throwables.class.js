class Throwables extends MovableObject {
    isTrowingLeft = false;

    constructor(world) {
        super(world);
        this.world = world;
        this.world.audioManager.playSound('bottleThrow', 0.5, false, 1000);
    }

    animate() {
        this.world.character.otherDirection ? this.isTrowingLeft = true : this.isTrowingLeft = false;
        const intervalId = IntervalManager.setInterval(() => {
            if (this.isAboveGround() && !this.checkEnemyCollision()) {
                this.fly();
            } else {
                this.break();
                IntervalManager.removeInterval(intervalId, 'throwable-animate');
            }
        }, 3000 / 60, 'throwable-animate');
        this.world.character.throwableCount--;
        this.world.bottleStatusBar.updateBottleStatusBar(this.world.character.throwableCount);
    }

    break() {
        this.playAnimation(this.framesBreak);
        this.world.audioManager.playSound('bottleBreak');
    }

    fly() {
        this.speedY -= this.acceleration;
        this.y -= this.speedY;
        this.isTrowingLeft ? this.x -= this.speed : this.x += this.speed;

        this.playAnimation(this.framesFlying);
    }

    checkEnemyCollision() {
        return this.world.enemies.some(enemy => this.isColliding(enemy));
    }
}