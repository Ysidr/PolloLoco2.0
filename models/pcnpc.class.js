/**
 * @class PcNpc
 * @extends MovableObject
 * @description Base class for player characters and NPCs, handling shared health and death logic.
 */
class PcNpc extends MovableObject {
    /**
     * @type {number}
     * @description Current health points of the entity.
     */
    hp = 100;
    /**
     * @type {number}
     * @description Timestamp of the last successful hit.
     */
    lastHit = 0;
    /**
     * @type {number}
     * @description Reference x-position for comparing against other characters.
     */
    characterX = 0;
    /**
     * @type {boolean}
     * @description Indicates whether the entity is currently playing its death animation.
     */
    isDying = false;
    /**
     * @type {boolean}
     * @description Indicates whether the entity's death sequence has completed.
     */
    isDead = false;


    /**
     * @function hurt
     * @param {number} damage - Amount of damage to subtract from health.
     * @description Applies damage with a brief invulnerability cooldown.
     */
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

    /**
     * @function dead
     * @returns {boolean} True if health has dropped to zero.
     */
    dead() {
        return this.hp === 0;
    }

    /**
     * @function checkHealth
     * @description Updates animations, plays sounds, and handles death state transitions.
     */
    checkHealth() {
        if (this.dead()) {
            this.isDying = true;
            this.playDeathAnimationAndRemove();
        } else {
            if (this.isHurt()) {
                this.playAnimation(this.framesHurt);
                if (this instanceof Endboss) {
                    this.world.audioManager.playSound('bossHurt');
                }
            }
        }
        if (this instanceof Character) {
            this.hpStatusBar.updateHPStatusBar(this.hp);
        }
    }

    /**
     * @function isHurt
     * @returns {boolean} True if the invulnerability window after the last hit has not yet elapsed.
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        timeSinceLastHit = timeSinceLastHit / 100;
        return timeSinceLastHit < 5;
    }

    /**
     * @function playDeathAnimationAndRemove
     * @description Executes the appropriate death behavior for different entity types.
     */
    playDeathAnimationAndRemove() {
        if (this.framesDead && this.framesDead.length > 0) {
            switch (true){
                case this instanceof Endboss && this.isDead:
                    this.gameOverWin();
                    break;
                case this instanceof Character:
                    this.gameOverLost();
                    break;
                case this instanceof Chicken || this instanceof MiniChicken:
                    this.removeEnemy();
                    break;
            }
        }
    }

    /**
     * @function gameOverWin
     * @description Handles game end sequence when the player defeats the end boss.
     */
    gameOverWin() {
        this.world.audioManager.playSound('bossDeath');
        IntervalManager.clearAllIntervals();
        gameOver("win")
        this.world.gameIsOver = true;
    }

    /**
     * @function gameOverLost
     * @description Handles game end sequence when the player character dies.
     */
    gameOverLost() {
        this.world.audioManager.playSound('die');
        IntervalManager.clearAllIntervals();
        gameOver("lost")
        this.world.gameIsOver = true;
    }

    /**
     * @function removeEnemy
     * @description Removes enemy entities from the world once their death animation finishes.
     */
    removeEnemy() {
        if (this.isDead && this.world.enemies.includes(this)) {
            this.world.audioManager.playSound('enemyHurt');
            this.world.enemies.splice(this.world.enemies.indexOf(this), 1);
        }
    }
}