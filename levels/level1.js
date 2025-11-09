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
         {
            walk: 'audio/ES_Feet, Land, Jump, Ground - Epidemic Sound - 0000-0207.wav',
            bottleBreak: 'audio/ES_Bottle, Hit, Break With Hammer 02 - Epidemic Sound.mp3',
            hurt: 'audio/ES_Male, Hurt, Low Intensity - Epidemic Sound - 0000-0465.wav',
            die: 'audio/ES_Asian Game Character, E, Death - Epidemic Sound - 2629-3943.wav',
            bossDeath: 'audio/ES_Game, Retro Style, Boss, Vocalization - Epidemic Sound - 0000-1815.wav',
            enemyHurt: 'audio/ES_Bird, Chickens - Epidemic Sound - 0000-1473.wav',
            collect: 'audio/ES_Retro, Collect Coin Or Treasure - Epidemic Sound.mp3',
            bottleThrow: 'audio/ES_Sploshing, Plastic Bottle - Epidemic Sound - 0000-2966.wav',
            jump: 'audio/ES_Rock, Surface, Jump On - Epidemic Sound - 0692-1226.wav',
            tradeFail: 'audio/ES_Male Screams No - Epidemic Sound - 0000-2131.wav',
            tradeSuccess: 'audio/ES_Cash Register, Kaching, Money - Epidemic Sound.mp3',
            bossAlert: 'audio/ES_Demon, Large Demon Boss Approaching - Epidemic Sound.mp3',
            lose: 'audio/ES_Retro, Lose, Negative 01 - Epidemic Sound.mp3',
            win: 'audio/ES_Retro, Star, Win, Gain x8 - Epidemic Sound.mp3',
        },

        throwablesDamage = 20,
        enemyDamage = 10,
        bossDamage = 20,
        characterJumpDamage = 5,
    );
}