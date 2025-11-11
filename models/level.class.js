/**
 * @class Level
 * @description Defines the entities, assets, and balance values for a playable level.
 */
class Level {
    /**
     * @type {PcNpc[]}
     * @description Enemy instances included in the level.
     */
    enemies;
    /**
     * @type {Cloud[]}
     * @description Cloud instances used for parallax backgrounds.
     */
    clouds;
    /**
     * @type {BackgroundObject[]}
     * @description Static background layers composing the scenery.
     */
    backgroundObjects;
    /**
     * @type {Collectable[]}
     * @description Collectible items that can be picked up by the player.
     */
    collectables;
    /**
     * @type {Object.<string, string>}
     * @description Mapping of sound identifiers to audio file paths used in the level.
     */
    sounds;
    /**
     * @type {number}
     * @description Damage dealt by throwable projectiles within this level.
     */
    throwablesDamage;
    /**
     * @type {number}
     * @description Damage inflicted by regular enemies.
     */
    enemyDamage;
    /**
     * @type {number}
     * @description Damage inflicted by the end boss.
     */
    bossDamage;
    /**
     * @type {number}
     * @description Damage the character deals when jumping on enemies.
     */
    characterJumpDamage;
    /**
     * @type {number}
     * @description Horizontal position marking the end of the level.
     */
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