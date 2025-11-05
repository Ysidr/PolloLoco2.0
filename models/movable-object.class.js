class MovableObject {
    x = 120;
    y = 250;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    currentImageIndex = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    frames = [];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    playAnimation(arr) {
        let i = this.currentImageIndex % arr.length;
        let path = arr[i];
        this.img = this.imgCache[path];
        this.currentImageIndex++;
    }

    drawRectangle(ctx) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    drawCollisionBox(ctx) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
    }

    applyGravity() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60, `${className}-gravity`);
    }

    isAboveGround() {
        return this.y < 480 - this.height - 40;
    }

    checkJump(isJumping, isMoving) {
        if (isJumping && !this.isAboveGround()) {
            this.speedY = 25;
            this.world.audioManager.playSound('jump');
        }
        if (this.isAboveGround()) {
            this.playAnimation(this.framesJump);
        } else {
            this.playAnimation(isMoving ? this.framesWalk : this.framesIdle);
        }
    }

    checkDirection() {
        if (this.world.inputs.LEFT) {
            this.otherDirection = true;
        } else if (this.world.inputs.RIGHT) {
            this.otherDirection = false;
        }
    }

    checkMovement(isMoving) {
        if (isMoving) {
            this.world.audioManager.playSound('walk', 1.0, false, null, 200);
            if (this.world.inputs.LEFT && this.x > 120) {
                this.x -= this.speed;
            } else if (this.world.inputs.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
            }
        }
    }

    checkTrade(isTrading) {
        const now = Date.now();
        if (now - this.lastTradeTime < this.tradeCooldown){
            return;
        }
        if (isTrading) {
            if (this.coinCount >= 5) {
                this.coinCount -= 5;
                this.throwableCount += 1;
                this.world.bottleStatusBar.updateBottleStatusBar(this.throwableCount);
                this.world.coinStatusBar.updateCoinStatusBar(this.coinCount);
                this.world.audioManager.playSound('tradeSuccess');
            } else {
                this.world.audioManager.playSound('tradeFail');
            }
            this.lastTradeTime = Date.now();
        }
    }
    checkThrow(isThrowing) {
        if (isThrowing) {
            this.world.throwables.push(new BottleThrowable(this.world));
            this.throwableTimeOut = true;

            setTimeout(() => {
                this.throwableTimeOut = false;
                this.world.throwables.pop();
            }, 1000);
        }
    }


    moveRight() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60, `${className}-moveRight`);
    }

    moveLeft() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60, `${className}-moveLeft`);
    }

    isColliding(mo, checkJump = false) {
        const isColliding = this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top;

        if (checkJump && isColliding) {
            return {
                top: this.y + this.offset.top < mo.y + mo.offset.top,
                bottom: this.y + this.height - this.offset.bottom > mo.y + mo.height - mo.offset.bottom,
                left: this.x + this.offset.left < mo.x + mo.offset.left,
                right: this.x + this.width - this.offset.right > mo.x + mo.width - mo.offset.right
            };
        }
        return isColliding;


    }
}