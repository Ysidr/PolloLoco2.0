const level1 = new Level(
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
    enemyDamage = 5,
    characterJumpDamage = 5,

);