/**
 * @class Character
 * @extends PcNpc
 * @description Player-controlled character handling movement, animation, and game interactions.
 */
class Character extends PcNpc {

    /**
     * @type {number}
     * @description Character sprite width in pixels.
     */
    width = 150;
    /**
     * @type {number}
     * @description Character sprite height in pixels.
     */
    height = 300;
    /**
     * @type {number}
     * @description Current vertical position of the character.
     */
    y;
    /**
     * @type {World}
     * @description Reference to the game world managing this character.
     */
    world;
    /**
     * @type {number}
     * @description Base horizontal movement speed.
     */
    speed = 25;
    /**
     * @type {boolean}
     * @description Prevents consecutive throws while a cooldown is active.
     */
    throwableTimeOut = false;
    /**
     * @type {number}
     * @description Timestamp of the last completed trade interaction.
     */
    lastTradeTime = 0;
    /**
     * @type {number}
     * @description Minimum cooldown in milliseconds between trades.
     */
    tradeCooldown = 800;
    /**
     * @type {number}
     * @description Timestamp of the last bounce interaction.
     */
    lastBounceTime = 0;

    isSleeping = false;

    lastPosition = {x: 0, y: 0}

    lastMoveTime

    /**
     * @type {number}
     * @description Number of throwable items currently available.
     */
    throwableCount = 0;
    /**
     * @type {number}
     * @description Number of collected coins.
     */
    coinCount = 0;

    /**
     * @type {{top:number,bottom:number,left:number,right:number}}
     * @description Collision box adjustments for the character sprite.
     */
    offset = {
        top: 150,
        bottom: 25,
        left: 30,
        right: 47
    }

    /**
     * @type {string[]}
     * @description Animation frames for the idle state.
     */
    framesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png'
    ];

    framesSleep = [
        `img/2_character_pepe/1_idle/long_idle/I-11.png`,
        `img/2_character_pepe/1_idle/long_idle/I-12.png`,
        `img/2_character_pepe/1_idle/long_idle/I-13.png`,
        `img/2_character_pepe/1_idle/long_idle/I-14.png`,
        `img/2_character_pepe/1_idle/long_idle/I-15.png`,
        `img/2_character_pepe/1_idle/long_idle/I-16.png`,
        `img/2_character_pepe/1_idle/long_idle/I-17.png`,
        `img/2_character_pepe/1_idle/long_idle/I-18.png`,
        `img/2_character_pepe/1_idle/long_idle/I-19.png`,
        `img/2_character_pepe/1_idle/long_idle/I-20.png`];


    /**
     * @type {string[]}
     * @description Animation frames for the walking state.
     */
    framesWalk = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',


    ]

    /**
     * @type {string[]}
     * @description Animation frames for the jumping state.
     */
    framesJump = [
        `img/2_character_pepe/3_jump/J-31.png`,
        `img/2_character_pepe/3_jump/J-32.png`,
        `img/2_character_pepe/3_jump/J-33.png`,
        `img/2_character_pepe/3_jump/J-34.png`,
        `img/2_character_pepe/3_jump/J-35.png`,
        `img/2_character_pepe/3_jump/J-36.png`,
        `img/2_character_pepe/3_jump/J-37.png`,
        `img/2_character_pepe/3_jump/J-38.png`,
        `img/2_character_pepe/3_jump/J-39.png`,
    ]

    /**
     * @type {string[]}
     * @description Animation frames for the hurt state.
     */
    framesHurt = [
        `img/2_character_pepe/4_hurt/H-41.png`,
        `img/2_character_pepe/4_hurt/H-42.png`,
        `img/2_character_pepe/4_hurt/H-43.png`
    ]

    /**
     * @type {string[]}
     * @description Animation frames for the death sequence.
     */
    framesDead = [
        `img/2_character_pepe/5_dead/D-51.png`,
        `img/2_character_pepe/5_dead/D-52.png`,
        `img/2_character_pepe/5_dead/D-53.png`,
        `img/2_character_pepe/5_dead/D-54.png`,
        `img/2_character_pepe/5_dead/D-55.png`,
        `img/2_character_pepe/5_dead/D-56.png`,
        `img/2_character_pepe/5_dead/D-57.png`
    ]

    /**
     * @constructor
     * @description Loads character assets and initializes movement and animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.framesIdle);
        this.loadImages(this.framesWalk);
        this.loadImages(this.framesJump);
        this.loadImages(this.framesHurt);
        this.loadImages(this.framesDead);
        this.loadImages(this.framesSleep);
        this.y = 480 - this.height - 40;
        this.applyGravity();
        this.lastPosition = { x: this.x, y: this.y };
        this.lastMoveTime = new Date().getTime();

        this.animate();

    }

    /**
     * @function animate
     * @description Main character loop handling input, movement, and animations.
     */
    animate() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            const isMoving = this.world.inputs.LEFT || this.world.inputs.RIGHT;
            const isJumping = this.world.inputs.JUMP;
            const isThrowing = this.world.inputs.THROW && this.throwableCount > 0 && !this.throwableTimeOut;
            const isTrading = this.world.inputs.TRADE;
            this.checkIsSleeping();
            this.checkAllActions(isMoving, isJumping, isThrowing, isTrading);
            this.modifyCamera();
            this.updateDisplayedCounts();
            this.fixY();

        }, 60, `${className}character-animate`);
    }

    /**
     * @function fixY
     * @description Clamps the character's vertical position to ground level when gravity settles.
     */
    fixY() {
        if (this.y > 480 - this.height - 40) {
            this.y = 480 - this.height - 40;
        }
    }

    /**
     * @function checkAllActions
     * @param {boolean} isMoving - Indicates whether horizontal input is active.
     * @param {boolean} isJumping - Indicates whether the jump input is active.
     * @param {boolean} isThrowing - Indicates whether a throwable should be launched.
     * @param {boolean} isTrading - Indicates whether the trade input is active.
     * @description Processes movement, combat, and interaction logic for the current frame.
     */
    checkAllActions(isMoving, isJumping, isThrowing, isTrading) {
        this.checkHealth();
        if (!this.dead() && !this.isHurt()) {
            this.checkJump(isJumping, isMoving);
        }
        this.checkTrade(isTrading);
        this.checkThrow(isThrowing);
        this.checkDirection();
        this.checkMovement(isMoving);
    }

    /**
     * @function checkIsSleeping
     * @description Determines whether the character should enter the sleeping animation based on inactivity.
     */
    checkIsSleeping() {
        const now = new Date().getTime();
        if (this.lastPosition.x !== this.x || this.lastPosition.y !== this.y) {
            this.lastMoveTime = now;
        }
        this.lastPosition.x = this.x;
        this.lastPosition.y = this.y;
        if (now - this.lastMoveTime > 5000) {
            this.isSleeping = true;
        } else {
            this.isSleeping = false;
        }
    }

    /**
     * @function modifyCamera
     * @description Adjusts the camera position smoothly based on character movement.
     */
    modifyCamera() {
        const offsetRight = 100;
        const offsetLeft = 350;
        if (this.lastDirection === undefined) {
            this.lastDirection = this.otherDirection;
        }
        const targetX = -this.x + (this.otherDirection ? offsetLeft : offsetRight);
        if (this.lastDirection !== this.otherDirection) {
            this.startTransition();
        }
        if (this.cameraTransitionProgress < 1) {
            this.changeCameraInSmoothSteps(targetX);
        } else {
            this.world.cameraX = targetX;
        }
    }

    /**
     * @function startTransition
     * @description Initializes a camera transition when changing direction.
     */
    startTransition() {
        this.cameraStartX = this.world.cameraX;
        this.cameraTransitionProgress = 0;
        this.lastDirection = this.otherDirection;
    }

    /**
     * @function changeCameraInSmoothSteps
     * @param {number} targetX - Target camera x position to ease toward.
     * @description Performs a smooth interpolation for camera movement.
     */
    changeCameraInSmoothSteps(targetX) {
        this.cameraTransitionProgress += 0.2;
        const t = this.cameraTransitionProgress;
        const smoothT = t * t * (3 - 2 * t);
        this.world.cameraX = this.cameraStartX + (targetX - this.cameraStartX) * smoothT;
    }

    /**
     * @function updateDisplayedCounts
     * @description Updates HUD elements with current coin, bottle, and trade cooldown values.
     */
    updateDisplayedCounts() {
        document.getElementById('coinCount').textContent = this.coinCount;
        const tradeCooldownElement = document.getElementById('tradeCooldown');
        if (tradeCooldownElement) {
            const timeLeft = Math.max(0, this.tradeCooldown - (Date.now() - this.lastTradeTime));
            tradeCooldownElement.textContent = timeLeft > 0 ?
                `Trade Cooldown: ${(timeLeft / 1000).toFixed(1)}s` :
                'Trade Ready (C)';
            tradeCooldownElement.style.color = timeLeft > 0 ? '#ff6b6b' : '#cfa751ff';
        }
    }
}