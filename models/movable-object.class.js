/**
 * @class MovableObject
 * @description Base class for all moving entities, providing rendering, animation, and physics helpers.
 */
class MovableObject {
    /**
     * @type {number}
     * @description Horizontal position of the object relative to the world.
     */
    x = 120;
    /**
     * @type {number}
     * @description Vertical position of the object relative to the world.
     */
    y = 250;
    /**
     * @type {number}
     * @description Width in pixels used for rendering and collision detection.
     */
    width = 100;
    /**
     * @type {number}
     * @description Height in pixels used for rendering and collision detection.
     */
    height = 100;
    /**
     * @type {?HTMLImageElement}
     * @description Currently displayed image for the object.
     */
    img;
    /**
     * @type {Object.<string, HTMLImageElement>}
     * @description Cache of preloaded animation frames keyed by path.
     */
    imgCache = {};
    /**
     * @type {number}
     * @description Index used to cycle through animation frames.
     */
    currentImageIndex = 0;
    /**
     * @type {number}
     * @description Horizontal movement speed in pixels per frame.
     */
    speed = 0.15;
    /**
     * @type {boolean}
     * @description Indicates whether the sprite is facing left.
     */
    otherDirection = false;
    /**
     * @type {number}
     * @description Current vertical velocity.
     */
    speedY = 0;
    /**
     * @type {number}
     * @description Downward acceleration applied each frame (gravity).
     */
    acceleration = 1.5;
    /**
     * @type {string[]}
     * @description Generic set of animation frames assigned to the object.
     */
    frames = [];
    /**
     * @type {{top:number,bottom:number,left:number,right:number}}
     * @description Insets applied to the collision box relative to the sprite's bounds.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * @function loadImage
     * @param {string} path - Path to the image asset to display.
     * @description Loads a single image and assigns it as the object's current sprite.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * @function loadImages
     * @param {string[]} arr - Collection of image paths to preload.
     * @description Loads multiple images into the cache for animation playback.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    /**
     * @function playAnimation
     * @param {string[]} arr - Sequence of frame paths to cycle through.
     * @description Advances the current frame and updates the displayed image.
     */
    playAnimation(arr) {
        let i = this.currentImageIndex % arr.length;
        let path = arr[i];
        this.img = this.imgCache[path];
        this.currentImageIndex++;
    }

    /**
     * @function drawRectangle
     * @param {CanvasRenderingContext2D} ctx - Rendering context to draw the bounding box on.
     * @description Renders the object's outer bounding box for debugging purposes.
     */
    drawRectangle(ctx) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    /**
     * @function drawCollisionBox
     * @param {CanvasRenderingContext2D} ctx - Rendering context to draw the collision box on.
     * @description Renders the adjusted collision box based on offset values for debugging.
     */
    drawCollisionBox(ctx) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
    }

    /**
     * @function applyGravity
     * @description Applies gravity to the object, updating its vertical position over time.
     */
    applyGravity() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 60, `${className}-gravity`);
    }

    /**
     * @function isAboveGround
     * @returns {boolean} True if the object is positioned above the ground level.
     */
    isAboveGround() {
        return this.y < 480 - this.height - 40;
    }

    /**
     * @function checkJump
     * @param {boolean} isJumping - Indicates whether the jump action is active.
     * @param {boolean} isMoving - Indicates whether horizontal movement keys are pressed.
     * @description Handles jump initiation and selects the appropriate animation.
     */
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

    /**
     * @function checkDirection
     * @description Updates sprite direction based on current input.
     */
    checkDirection() {
        if (this.world.inputs.LEFT) {
            this.otherDirection = true;
        } else if (this.world.inputs.RIGHT) {
            this.otherDirection = false;
        }
    }

    /**
     * @function checkMovement
     * @param {boolean} isMoving - Indicates whether horizontal movement is occurring.
     * @description Moves the object horizontally while handling world boundaries and audio.
     */
    checkMovement(isMoving) {
        if (isMoving) {
            this.world.audioManager.playSound('walk', 1.0, false, null, 300);
            if (this.world.inputs.LEFT && this.x > 120) {
                this.x -= this.speed;
            } else if (this.world.inputs.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
            }
        }
    }

    /**
     * @function checkTrade
     * @param {boolean} isTrading - Indicates whether the trade action is active.
     * @description Handles trading coins for throwable items and updates status bars.
     */
    checkTrade(isTrading) {
        const now = Date.now();
        if (now - this.lastTradeTime < this.tradeCooldown) {
            return;
        }
        if (isTrading) {
            this.doTrade();
        }
    }
    doTrade() {
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

    /**
     * @function checkThrow
     * @param {boolean} isThrowing - Indicates whether a throwable should be launched.
     * @description Spawns a new throwable and manages cooldown timers.
     */
    checkThrow(isThrowing) {
        if (isThrowing) {
            if (!this.throwableTimeOut) {
                this.world.throwables.push(new BottleThrowable(this.world));
                this.throwableTimeOut = true;
                setTimeout(() => {
                    this.throwableTimeOut = false;
                }, 1000);
            }


        }
    }


    /**
     * @function moveRight
     * @description Continuously moves the object to the right while the interval is active.
     */
    moveRight() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60, `${className}-moveRight`);
    }

    /**
     * @function moveLeft
     * @description Continuously moves the object to the left while the interval is active.
     */
    moveLeft() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60, `${className}-moveLeft`);
    }

    /**
     * @function isColliding
     * @param {MovableObject} mo - Another movable object to test against.
     * @returns {boolean} True if the collision boxes intersect.
     * @description Performs axis-aligned bounding-box collision detection.
     */
    isColliding(mo) {
        const isColliding = this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top;
        return isColliding;


    }
}