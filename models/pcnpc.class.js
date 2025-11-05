class PcNpc extends MovableObject {
    hp = 100;
    lastHit = 0;


    hurt() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        }
        this.lastHit = new Date().getTime();

    }

    dead() {
        return this.hp === 0;
    }

    checkHealth() {
        if (this.dead()) {
            if (this.framesDead && this.framesDead.length > 0) {
                this.playAnimation(this.framesDead);
                if (this instanceof Endboss) {
                    this.world.audioManager.playSound('bossDeath');
                } else if (this instanceof Chicken) {
                    this.world.audioManager.playSound('enemyHurt');
                } else if (this instanceof Character) {
                    this.world.audioManager.playSound('die');
                }
                switch (this instanceof Endboss) {
                    case true:
                        this.world.audioManager.playSound('bossDeath');
                        break;
                    default:
                        this.world.audioManager.playSound('die');
                        break;
                }
                IntervalManager.clearAllIntervals();
            }
            // this.world.level.enemies.splice(this.world.level.enemies.indexOf(this), 1);
        } else {
            if (this.isHurt()) {
                this.playAnimation(this.framesHurt);
                console.log('is hurt');
            }
        }
        this.hpStatusBar.updateHPStatusBar(this.hp);
    }

    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        timeSinceLastHit = timeSinceLastHit / 100;
        return timeSinceLastHit < 5;
    }


}