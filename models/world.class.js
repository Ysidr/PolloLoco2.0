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
    inputs;
    canvas;
    ctx;
    cameraX = 0;


    constructor(canvas, inputs) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.inputs = inputs;
        
        // Initialize throwables after this is fully constructed
        this.throwables = [];
        
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
        let currentBackgroundX = 0;
        for (let i = 0; i < 4; i++) {
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
                if (this.character.isColliding(enemy)) {
                    this.character.hurt();
                }
                if (this.throwables.length > 0) {
                    this.throwables.forEach((throwable) => {
                        if (throwable.isColliding(enemy)) {
                            console.log('Enemy hit by bottle', enemy);
                            this.enemies.splice(this.enemies.indexOf(enemy), 1);
                        }
                    });
                }
            });
            if (this.collectables.length > 0) {
                this.level.collectables.forEach((collectable) => {
                    if (this.character.isColliding(collectable)) {
                        this.character.coinCount += collectable.value;
                        this.level.collectables.splice(this.level.collectables.indexOf(collectable), 1);
                    }
                });
            }
        }, 200, 'collision-check');
    }

}