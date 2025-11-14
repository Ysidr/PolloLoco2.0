/**
 * @class Level
 * @description Defines the entities, assets, and balance values for a playable level.
 */
class Level {
    enemies;
    clouds;
    collectables;
    sounds;
    throwablesDamage;
    enemyDamage;
    bossDamage;
    characterJumpDamage;
    levelEndX = 720 * 7;

    /**
     * @constructor
     * @param {PcNpc[]} enemies - Enemy instances for the level.
     * @param {Cloud[]} clouds - Cloud instances populating the background.
     * @param {BackgroundObject[]} backgroundObjects - Static background objects.
     * @param {Collectable[]} collectables - Collectible items available.
     * @param {Object.<string, string>} sounds - Audio asset mapping for the level.
     * @param {number} throwablesDamage - Damage output of throwables.
     * @param {number} enemyDamage - Damage inflicted by standard enemies.
     * @param {number} bossDamage - Damage inflicted by the boss.
     * @param {number} characterJumpDamage - Damage dealt by character jump attacks.
     */
    constructor(enemies, clouds, backgroundObjects, collectables, sounds, throwablesDamage, enemyDamage, bossDamage, characterJumpDamage) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
        this.sounds = sounds;
        this.throwablesDamage = throwablesDamage;
        this.enemyDamage = enemyDamage;
        this.bossDamage = bossDamage;
        this.characterJumpDamage = characterJumpDamage;
    };
}