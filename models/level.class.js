class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    levelEndX = 720 * 7;

    constructor(enemies, clouds, backgroundObjects, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
    };
}