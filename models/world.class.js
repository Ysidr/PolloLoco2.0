/**
 * @class World
 * @description Central game controller handling rendering, entities, interactions, and audio.
 */
class World {

    /**
     * @type {Character}
     * @description Player-controlled character instance.
     */
    character = new Character();
    /**
     * @type {PcNpc[]}
     * @description List of enemies present in the current level.
     */
    enemies = level1.enemies;
    /**
     * @type {Cloud[]}
     * @description Background cloud objects for parallax effect.
     */
    clouds = level1.clouds;
    /**
     * @type {BackgroundObject[]}
     * @description Layered scenery elements composing the environment.
     */
    backgroundObjects = level1.backgroundObjects;
    /**
     * @type {Level}
     * @description Current level configuration.
     */
    level = level1;
    /**
     * @type {HpStatusBar}
     * @description HUD element reflecting the character's health.
     */
    hpStatusBar = new HpStatusBar();
    /**
     * @type {BottleStatusBar}
     * @description HUD element showing available throwable bottles.
     */
    bottleStatusBar = new BottleStatusBar();
    /**
     * @type {CoinStatusBar}
     * @description HUD element displaying collected coins.
     */
    coinStatusBar = new CoinStatusBar();
    /**
     * @type {?BossHpStatusBar}
     * @description HUD element for the boss health, instantiated on encounter.
     */
    bossHpStatusBar;
    /**
     * @type {Collectable[]}
     * @description Collectible items available in the level.
     */
    collectables = level1.collectables;
    /**
     * @type {Throwables[]}
     * @description Active throwable projectiles in flight.
     */
    throwables = [];
    /**
     * @type {number}
     * @description Damage dealt by throwable projectiles.
     */
    throwablesDamage = level1.throwablesDamage;
    /**
     * @type {number}
     * @description Damage taken from standard enemies.
     */
    enemyDamage = level1.enemyDamage;
    /**
     * @type {number}
     * @description Damage inflicted by the end boss.
     */
    bossDamage = level1.bossDamage;
    /**
     * @type {number}
     * @description Damage applied when the character jumps on an enemy.
     */
    characterJumpDamage = level1.characterJumpDamage;
    /**
     * @type {Object.<string, string>}
     * @description Mapping of sound identifiers to audio asset paths.
     */
    sounds = level1.sounds;
    /**
     * @type {Inputs}
     * @description Input state manager shared with the player character.
     */
    inputs;
    /**
     * @type {HTMLCanvasElement}
     * @description Canvas element used for rendering.
     */
    canvas;
    /**
     * @type {CanvasRenderingContext2D}
     * @description 2D rendering context for the canvas.
     */
    ctx;
    /**
     * @type {number}
     * @description Horizontal camera offset applied during rendering.
     */
    cameraX = 0;
    /**
     * @type {AudioManager}
     * @description Handles playback of in-game audio.
     */
    audioManager = new AudioManager();
    /**
     * @type {boolean}
     * @description Indicates whether the game has reached a terminal state.
     */
    gameIsOver = false;

    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - Canvas element where the game is rendered.
     * @param {Inputs} inputs - Input manager providing control state.
     * @description Sets up rendering, loads resources, and starts the game loop.
     */
    constructor(canvas, inputs) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.inputs = inputs;
        this.throwables = [];
        this.loadSounds();
        this.draw();
        this.setWorld();
        this.initializeBackgroundObjects();
        this.checkCollisions();
        this.playBackgroundMusic();
    }

    /**
     * @function setWorld
     * @description Links world references to the character and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.character.hpStatusBar = this.hpStatusBar;
        this.enemies.forEach((enemy) => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                enemy.hpStatusBar = this.bossHpStatusBar;
            }
        });
    }

    /**
     * @function initializeBackgroundObjects
     * @description Creates repeated 720px-wide background layers in 1440px steps to fill the scrolling level seamlessly.
     */
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

    /**
     * @function loadSounds
     * @description Preloads audio assets defined in the current level.
     */
    loadSounds() {
        Object.entries(this.sounds).forEach(([key, value]) => {
            this.audioManager.loadSound(key, value);
        });
    }

    /**
     * @function draw
     * @description Renders the game scene using an integer-snapped horizontal camera translation to avoid seams between background tiles, then schedules the next frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        const snappedCameraX = Math.round(this.cameraX);
        this.ctx.translate(snappedCameraX, 0);
        this.addAllObjectsToMap();
        this.ctx.restore();
        [this.hpStatusBar, this.bottleStatusBar, this.coinStatusBar, this.bossHpStatusBar].forEach((bar) => {
            if (bar) {
                bar.updatePosition(this.cameraX);
                this.addToMap(bar);
            }
        });
        requestAnimationFrame(() => this.draw());
    }

    /**
     * @function addAllObjectsToMap
     * @description Renders background, character, enemies, projectiles, and collectables in order.
     */
    addAllObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwables);
        this.addObjectsToMap(this.level.collectables);
    }

    /**
     * @function playBackgroundMusic
     * @description Starts looping background music for the level.
     */
    playBackgroundMusic() {
        this.audioManager.playSound('backgroundMusic', 0.2, true);
    }

    /**
     * @function addObjectsToMap
     * @param {MovableObject|MovableObject[]} objects - One or more objects to render.
     * @description Adds objects to the canvas, handling array or single entries.
     */
    addObjectsToMap(objects) {
        if (!Array.isArray(objects)) {
            objects = [objects];
        }

        objects.forEach((obj) => {
            this.addToMap(obj);
        });

    }

    /**
     * @function addToMap
     * @param {MovableObject} mo - Object to render on the canvas.
     * @description Draws an object with support for mirrored orientation and debug boxes.
     */
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
    }

    /**
     * @function checkCollisions
     * @description Periodically checks for collisions between character, enemies, and collectables.
     */
    checkCollisions() {
        IntervalManager.setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.checkAllEnemyCollisions(enemy);
            });
            if (this.collectables.length > 0) {
                this.checkCollectables();
            }
        }, 20, 'collision-check');
    }

    /**
     * @function checkAllEnemyCollisions
     * @param {PcNpc} enemy - Enemy to test against the character and throwables.
     * @description Resolves enemy interactions for damage and throwable hits.
     */
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

    /**
     * @function jumpOnEnemy
     * @param {PcNpc} enemy - Enemy struck by the character from above.
     * @description Applies jump damage, rewards coins, and bounces the character.
     */
    jumpOnEnemy(enemy) {
        enemy.hurt(this.characterJumpDamage);
        this.character.lastBounceTime = new Date().getTime();
        this.audioManager.playSound('coin', 1.0, false, null, 200);
        this.character.coinCount += 1;
        this.character.speedY = 25;
    }

    /**
     * @function damageByEnemy
     * @param {PcNpc} enemy - Enemy dealing damage to the character.
     * @description Applies appropriate damage and plays the hurt sound.
     */
    damageByEnemy(enemy) {
        const now = new Date().getTime();
        if (now - this.character.lastBounceTime < 500) {
            return;
        }
        enemy instanceof Endboss ? this.character.hurt(this.bossDamage) : this.character.hurt(this.enemyDamage);
        this.audioManager.playSound('hurt', 1.0, false, null, 200);
    }

    /**
     * @function checkThrowables
     * @param {PcNpc} enemy - Enemy to check for collisions with throwables.
     * @description Handles damage and cleanup when throwables hit enemies.
     */
    checkThrowables(enemy) {
        this.throwables.forEach((throwable) => {
            if (throwable.isColliding(enemy)) {
                enemy.hurt(this.throwablesDamage);
                this.throwables.splice(this.throwables.indexOf(throwable), 1);
            }
        });
    }

    /**
     * @function checkCollectables
     * @description Detects and processes character interactions with collectables.
     */
    checkCollectables() {
        this.level.collectables.forEach((collectable) => {
            if (this.character.isColliding(collectable)) {
                this.collectableUpdate(collectable);
            }
        });
    }

    /**
     * @function collectableUpdate
     * @param {Collectable} collectable - Item the character has collected.
     * @description Applies item rewards and removes the collectable from the level.
     */
    collectableUpdate(collectable) {
        this.audioManager.playSound('collect');
        if (collectable instanceof CoinCollectable) {
            this.updateCoinCollectable(collectable);
        } else if (collectable instanceof BottleCollectable) {
            this.updateBottleCollectable(collectable);
        }
        this.level.collectables.splice(this.level.collectables.indexOf(collectable), 1);
    }

    /**
     * @function updateCoinCollectable
     * @param {CoinCollectable} collectable - Coin item collected by the character.
     * @description Updates coin count, status bar, and schedules respawn.
     */
    updateCoinCollectable(collectable) {
        this.character.coinCount += collectable.value;
        this.coinStatusBar.updateCoinStatusBar(this.character.coinCount);
        this.coinRespawn();
    }

    /**
     * @function updateBottleCollectable
     * @param {BottleCollectable} collectable - Bottle item collected by the character.
     * @description Increases throwable count and updates the status bar.
     */
    updateBottleCollectable(collectable) {
        this.character.throwableCount += collectable.value;
        this.bottleStatusBar.updateBottleStatusBar(this.character.throwableCount);
    }

    /**
     * @function coinRespawn
     * @description Maintains a minimum number of coins by respawning them over time.
     */
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
        }
        setTimeout(() => this.coinRespawn(), 1000);
    }
}