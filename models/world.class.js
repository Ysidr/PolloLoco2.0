class World {

    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    level = level1;
    hpStatusBar = new HpStatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    collectables = level1.collectables;
    throwables = [];
    throwablesDamage = level1.throwablesDamage;
    enemyDamage = level1.enemyDamage;
    characterJumpDamage = level1.characterJumpDamage;
    inputs;
    canvas;
    ctx;
    cameraX = 0;
    audioManager = new AudioManager();


    constructor(canvas, inputs) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.inputs = inputs;

        // Initialize throwables after this is fully constructed
        this.throwables = [];
        this.loadSounds();

        this.draw();
        this.setWorld();
        this.initializeBackgroundObjects();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.character.hpStatusBar = this.hpStatusBar;
    }

    initializeBackgroundObjects() {
        let currentBackgroundX = -720;
        for (let i = 0; i < 5; i++) {
            this.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', currentBackgroundX),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', currentBackgroundX),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', currentBackgroundX),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', currentBackgroundX),
                new BackgroundObject('img/5_background/layers/air.png', currentBackgroundX + 720),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', currentBackgroundX + 720),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', currentBackgroundX + 720),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', currentBackgroundX + 720)
            );
            currentBackgroundX += 1440;
        }
    }

    loadSounds() {
        this.audioManager.loadSound('walk', 'audio/ES_Feet, Land, Jump, Ground - Epidemic Sound - 0000-0207.wav');
        this.audioManager.loadSound('bottleBreak', 'audio/ES_Bottle, Hit, Break With Hammer 02 - Epidemic Sound.mp3');
        this.audioManager.loadSound('hurt', 'audio/ES_Male, Hurt, Low Intensity - Epidemic Sound - 0000-0465.wav');
        this.audioManager.loadSound('die', 'audio/ES_Asian Game Character, E, Death - Epidemic Sound - 2629-3943.wav');
        this.audioManager.loadSound('bossDeath', 'audio/ES_Game, Retro Style, Boss, Vocalization - Epidemic Sound - 0000-1815.wav');
        this.audioManager.loadSound('enemyHurt', 'audio/ES_Bird, Chickens - Epidemic Sound - 0000-1473.wav');
        this.audioManager.loadSound('collect', 'audio/ES_Retro, Collect Coin Or Treasure - Epidemic Sound.mp3');
        this.audioManager.loadSound('bottleThrow', 'audio/ES_Sploshing, Plastic Bottle - Epidemic Sound - 0000-2966.wav');
        this.audioManager.loadSound('jump', 'audio/ES_Rock, Surface, Jump On - Epidemic Sound - 0692-1226.wav');
        this.audioManager.loadSound('tradeFail', 'audio/ES_Male Screams No - Epidemic Sound - 0000-2131.wav');
        this.audioManager.loadSound('tradeSuccess', 'audio/ES_Cash Register, Kaching, Money - Epidemic Sound.mp3');

    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw world objects with camera translation
        this.ctx.save();
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwables);
        this.addObjectsToMap(this.level.collectables);
        this.ctx.restore();

        // Draw status bars in screen space (not affected by camera)
        [this.hpStatusBar, this.bottleStatusBar, this.coinStatusBar].forEach((bar) => {
            if (bar) {
                bar.updatePosition(this.cameraX);
                this.addToMap(bar);
            }
        });

        requestAnimationFrame(() => this.draw());
    }


    addObjectsToMap(objects) {
        if (!Array.isArray(objects)) {
            objects = [objects];
        }

        objects.forEach((obj) => {
            this.addToMap(obj);
        });

    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }

        // Draw rectangle around movable objects
        if (mo.drawRectangle && mo instanceof Character || mo instanceof Endboss || mo instanceof Chicken || mo instanceof Throwables || mo instanceof CoinCollectable) {
            mo.drawRectangle(this.ctx);
            mo.drawCollisionBox(this.ctx);
        }
    }

    checkCollisions() {
        IntervalManager.setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.checkAllEnemyCollisions(enemy);
            });
            if (this.collectables.length > 0) {
                this.checkCollectables();
            }
        }, 200, 'collision-check');
    }

    checkAllEnemyCollisions(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isColliding(enemy, true).bottom) {
                enemy.hurt(this.characterJumpDamage);
                this.audioManager.playSound('enemyHurt', 1.0, false, null, 200);
                this.character.speedY = 25;

                console.log('Character jumped on enemy!')
                if (enemy.hp <= 0) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            } else {
                this.character.hurt(this.enemyDamage);
                this.audioManager.playSound('hurt', 1.0, false, null, 200);
            }
        }
        if (this.throwables.length > 0) {
            this.checkThrowables(enemy);
        }
    }

    checkThrowables(enemy) {
        this.throwables.forEach((throwable) => {
            if (throwable.isColliding(enemy)) {
                enemy.hurt(this.throwablesDamage);
                this.throwables.splice(this.throwables.indexOf(throwable), 1);
                console.log('Enemy hit by bottle', enemy);
                if (enemy.hp <= 0) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                    console.log('Enemy HP:', enemy.hp);
                }
                this.audioManager.playSound('enemyHurt');
            }
        });
    }

    checkCollectables() {
        this.level.collectables.forEach((collectable) => {
            if (this.character.isColliding(collectable)) {
                this.audioManager.playSound('collect');
                if (collectable instanceof CoinCollectable) {
                    this.updateCoinCollectable(collectable);
                } else if (collectable instanceof BottleCollectable) {
                    this.updateBottleCollectable(collectable);
                }
                this.level.collectables.splice(this.level.collectables.indexOf(collectable), 1);
            }
        });
    }

    updateCoinCollectable(collectable) {
        this.character.coinCount += collectable.value;
        console.log(this.character.coinCount);
        this.coinStatusBar.updateCoinStatusBar(this.character.coinCount);
        this.coinRespawn();
    }

    coinRespawn() {
        const coins = this.level.collectables.filter(item => item instanceof CoinCollectable);

        if (coins.length < 5) {
            const coinsToAdd = 5 - coins.length;
            const minX = 100;
            const maxX = 3000;
            const groundY = 480 - 90;

            for (let i = 0; i < coinsToAdd; i++) {
                const newCoin = new CoinCollectable();
                newCoin.x = minX + Math.random() * (maxX - minX);
                newCoin.y = groundY - newCoin.height;
                this.level.collectables.push(newCoin);
            }
            console.log(`Coins in game: ${this.level.collectables.filter(item => item instanceof CoinCollectable).length}`);
        }

        setTimeout(() => this.coinRespawn(), 1000);
    }

    updateBottleCollectable(collectable) {
        this.character.throwableCount += collectable.value;
        this.bottleStatusBar.updateBottleStatusBar(this.character.throwableCount);
    }
}