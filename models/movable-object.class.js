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
            if (this.world.inputs.LEFT && this.x > 120) {
                this.x -= this.speed;
            } else if (this.world.inputs.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
            }
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

    isColliding(mo) {
        return this.x + this.width - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.bottom &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.right < mo.y + mo.height - mo.offset.bottom;
    }


}