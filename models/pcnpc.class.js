class PcNpc extends MovableObject {
    hp = 100;
    lastHit = 0;
    characterX = 0;
    isDying = false;
    isDead = false;








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
            this.isDying = true;
            this.playDeathAnimationAndRemove();
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
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        timeSinceLastHit = timeSinceLastHit / 100;
        return timeSinceLastHit < 5;
    }

    playDeathAnimationAndRemove() {
        if (this.framesDead && this.framesDead.length > 0) {
            if (this instanceof Endboss && this.isDead) {
                this.gameOverWin()
            }

            else if (this instanceof Character) {
                this.gameOverLost();
            }
            else if (this instanceof Chicken || this instanceof MiniChicken) {
                this.removeEnemy()
            }
        }
    }

    gameOverWin() {
        this.world.audioManager.playSound('bossDeath');
        IntervalManager.clearAllIntervals();
        gameOver("win")

    }

    gameOverLost() {
        this.world.audioManager.playSound('die');
        IntervalManager.clearAllIntervals();
        gameOver("lost")
    }

    removeEnemy() {
        if (this.isDead && this.world.enemies.includes(this)) {
            this.world.audioManager.playSound('enemyHurt');
            this.world.enemies.splice(this.world.enemies.indexOf(this), 1);
        }
    }


}