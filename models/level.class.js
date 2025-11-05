class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    throwablesDamage;
    enemyDamage;
    levelEndX = 720 * 7;

    constructor(enemies, clouds, backgroundObjects, collectables, throwablesDamage, enemyDamage) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
        this.throwablesDamage = throwablesDamage;
        this.enemyDamage = enemyDamage;
    };
}