class Throwables extends MovableObject {
    

    constructor(world) {
        super(world);
        this.world = world;
        console.log('Throwables constructor - world:', world);
        console.log('Character reference:', this.world?.character);
    }

    animate() {
        const intervalId = IntervalManager.setInterval(() => {
            if (this.isAboveGround()) {
                this.fly();
            } else {
                this.break();
                IntervalManager.removeInterval(intervalId, 'throwable-animate');
            }
        }, 3000 / 60, 'throwable-animate');
        this.world.character.throwableCount--;
    }

    break() {
        this.playAnimation(this.framesBreak);
    }

    fly() {
        this.speedY -= this.acceleration;
        this.y -= this.speedY;
        this.x += this.speed;
        
        this.playAnimation(this.framesFlying);
    }

}