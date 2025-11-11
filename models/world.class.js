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
    bossDamage = level1.bossDamage;
    characterJumpDamage = level1.characterJumpDamage;
    sounds = level1.sounds;
    inputs;
    canvas;
    ctx;
    cameraX = 0;
    audioManager = new AudioManager();
    gameIsOver = false;

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
        this.playBackgroundMusic();
    }

    setWorld() {
        this.character.world = this;
        this.character.hpStatusBar = this.hpStatusBar;
        this.enemies.forEach((enemy) => {
            enemy.world = this;
        });
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
        Object.entries(this.sounds).forEach(([key, value]) => {
            this.audioManager.loadSound(key, value);
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwables);
        this.addObjectsToMap(this.level.collectables);
        this.ctx.restore();

        [this.hpStatusBar, this.bottleStatusBar, this.coinStatusBar].forEach((bar) => {
            if (bar) {
                bar.updatePosition(this.cameraX);
                this.addToMap(bar);
            }
        });

        requestAnimationFrame(() => this.draw());
    }

    playBackgroundMusic() {
        this.audioManager.playSound('backgroundMusic', 0.2, true);
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
        }, 50, 'collision-check');
    }

    checkAllEnemyCollisions(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isColliding(enemy, true) && this.character.speedY < 0) {
                this.jumpOnEnemy(enemy);
            } else {
                if (this.character.speedY >= 0) {
                    this.damageByEnemy(enemy);
                }
            }
        }
        if (this.throwables.length > 0) {
            this.checkThrowables(enemy);
        }
    }

    jumpOnEnemy(enemy) {
        enemy.hurt(this.characterJumpDamage);
        this.character.lastBounceTime = new Date().getTime();
        this.audioManager.playSound('coin', 1.0, false, null, 200);
        this.character.coinCount += 1;
        this.character.speedY = 25;
        console.log('Character jumped on enemy!')
    }

    damageByEnemy(enemy) {
        const now = new Date().getTime();
        if (now - this.character.lastBounceTime < 500) {
            return;
        }
        enemy instanceof Endboss ? this.character.hurt(this.bossDamage) : this.character.hurt(this.enemyDamage);
        this.audioManager.playSound('hurt', 1.0, false, null, 200);
    }

    checkThrowables(enemy) {
        this.throwables.forEach((throwable) => {
            if (throwable.isColliding(enemy)) {
                enemy.hurt(this.throwablesDamage);
                this.throwables.splice(this.throwables.indexOf(throwable), 1);
                console.log('Enemy hit by bottle', enemy);
            }
        });
    }

    checkCollectables() {
        this.level.collectables.forEach((collectable) => {
            if (this.character.isColliding(collectable)) {
                this.collectableUpdate(collectable);
            }
        });
    }

    collectableUpdate(collectable) {
        this.audioManager.playSound('collect');
        if (collectable instanceof CoinCollectable) {
            this.updateCoinCollectable(collectable);
        } else if (collectable instanceof BottleCollectable) {
            this.updateBottleCollectable(collectable);
        }
        this.level.collectables.splice(this.level.collectables.indexOf(collectable), 1);
    }

    updateCoinCollectable(collectable) {
        this.character.coinCount += collectable.value;
        console.log(this.character.coinCount);
        this.coinStatusBar.updateCoinStatusBar(this.character.coinCount);
        this.coinRespawn();
    }

    updateBottleCollectable(collectable) {
        this.character.throwableCount += collectable.value;
        this.bottleStatusBar.updateBottleStatusBar(this.character.throwableCount);
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


}