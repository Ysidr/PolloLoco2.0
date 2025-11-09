let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken(),
            new Endboss(),
        ],

        [
            new Cloud(),
            new Cloud()
        ],

        // BackgroundObject
        [

        ],
        // Collectables
        [
            new CoinCollectable(),
            new CoinCollectable(),
            new CoinCollectable(),
            new CoinCollectable(),
            new CoinCollectable(),
            new CoinCollectable(),
            new BottleCollectable(),
            new BottleCollectable(),
            new BottleCollectable(),
            new BottleCollectable(),
        ],
        throwablesDamage = 20,
        enemyDamage = 10,
        bossDamage = 20,
        characterJumpDamage = 5,
    );
}