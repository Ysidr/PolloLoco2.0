class PcNpc extends MovableObject {
    hp = 100;


    hurt() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    dead() {
        return this.hp === 0;
    }

    checkHealth() {
        if (this.dead()) {
            if (this.framesDead && this.framesDead.length > 0) {
                this.playAnimation(this.framesDead);
                IntervalManager.clearAllIntervals();
            }
            // this.world.level.enemies.splice(this.world.level.enemies.indexOf(this), 1);
        }
    }

    
}