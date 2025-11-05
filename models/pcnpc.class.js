class PcNpc extends MovableObject {
    hp = 100;
    lastHit = 0;

    


    hurt(damage) {
        if (new Date().getTime() - this.lastHit > 500) {
            this.hp -= damage;
            if (this.hp < 0) {
                this.hp = 0;
            }
            this.lastHit = new Date().getTime();
        }
        return;

    }

    dead() {
        return this.hp === 0;
    }

    checkHealth() {
        if (this.dead()) {
            if (this.framesDead && this.framesDead.length > 0) {
                if (this instanceof Endboss) {
                    this.world.audioManager.playSound('bossDeath');
                } else if (this instanceof Chicken) {
                    this.world.audioManager.playSound('enemyHurt');
                } else if (this instanceof Character) {
                    this.world.audioManager.playSound('die');
                    IntervalManager.clearAllIntervals();
                }
                switch (this instanceof Endboss) {
                    case true:
                        this.world.audioManager.playSound('bossDeath');
                        IntervalManager.clearAllIntervals();
                        break;
                    default:
                        this.world.audioManager.playSound('die');
                        IntervalManager.clearAllIntervals();
                        break;
                }
            }
        } else {
            if (this.isHurt()) {
                this.playAnimation(this.framesHurt);
                console.log(this.hp);
            }
        }
        if (this instanceof Character) {
            this.hpStatusBar.updateHPStatusBar(this.hp);
        }
    }

    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit  ;
        timeSinceLastHit = timeSinceLastHit / 100;
        return timeSinceLastHit < 5;
    }


}