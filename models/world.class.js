class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    level = level1;


    canvas;
    ctx;
    inputs;
    cameraX = 0;


    constructor(canvas, inputs) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.inputs = inputs;
        this.draw();
        this.setWorld();
        this.initializeBackgroundObjects();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
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
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.cameraX, 0);
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
        if (mo.drawRectangle && mo instanceof Character || mo instanceof Endboss || mo instanceof Chicken) {
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
            });
        }, 200, 'collision-check');
    }

}