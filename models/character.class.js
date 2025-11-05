class Character extends PcNpc {

    width = 150;
    height = 300;
    y;
    world;
    speed = 25;
    throwableTimeOut = false;

    throwableCount = 0;
    coinCount = 0;

    offset = {
        top: 150,
        bottom: 25,
        left: 30,
        right: 47
    }

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

    framesWalk = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',


    ]

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

    framesHurt = [
        `img/2_character_pepe/4_hurt/H-41.png`,
        `img/2_character_pepe/4_hurt/H-42.png`,
        `img/2_character_pepe/4_hurt/H-43.png`
    ]

    framesDead = [
        `img/2_character_pepe/5_dead/D-51.png`,
        `img/2_character_pepe/5_dead/D-52.png`,
        `img/2_character_pepe/5_dead/D-53.png`,
        `img/2_character_pepe/5_dead/D-54.png`,
        `img/2_character_pepe/5_dead/D-55.png`,
        `img/2_character_pepe/5_dead/D-56.png`,
        `img/2_character_pepe/5_dead/D-57.png`
    ]

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.framesIdle);
        this.loadImages(this.framesWalk);
        this.loadImages(this.framesJump);
        this.loadImages(this.framesHurt);
        this.loadImages(this.framesDead);
        this.y = 480 - this.height - 40;
        this.applyGravity();

        this.animate();

    }

    animate() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            const isMoving = this.world.inputs.LEFT || this.world.inputs.RIGHT;
            const isJumping = this.world.inputs.JUMP;
            const isThrowing = this.world.inputs.THROW && this.throwableCount > 0 && !this.throwableTimeOut;
            const isTrading = this.world.inputs.TRADE;

            this.checkHealth();
            if (!this.dead() && !this.isHurt()) {
                this.checkJump(isJumping, isMoving);
            }
            this.checkTrade(isTrading);
            this.checkThrow(isThrowing);
            this.checkDirection();
            this.checkMovement(isMoving);
            this.modifyCamera();

            this.updateDisplayedCounts();

        }, 60, `${className}character-animate`);
    }

    modifyCamera() {
        // Define camera offsets for left and right directions
        const offsetRight = 100;  // Camera offset when facing right
        const offsetLeft = 350;   // Camera offset when facing left

        // Store the previous direction to detect changes
        if (this.lastDirection === undefined) {
            this.lastDirection = this.otherDirection;
        }

        // Calculate target position based on direction
        const targetX = -this.x + (this.otherDirection ? offsetLeft : offsetRight);

        // If direction changed, initialize smooth transition
        if (this.lastDirection !== this.otherDirection) {
            this.startTransition();
        }

        // If we're in a transition
        if (this.cameraTransitionProgress < 1) {
            this.changeCameraInSmoothSteps(targetX);
        } else {
            // When not transitioning, follow directly
            this.world.cameraX = targetX;
        }
    }

    startTransition() {
        this.cameraStartX = this.world.cameraX;
        this.cameraTransitionProgress = 0;
        this.lastDirection = this.otherDirection;
    }

    changeCameraInSmoothSteps(targetX) {
        this.cameraTransitionProgress += 0.2;  
        const t = this.cameraTransitionProgress;
        const smoothT = t * t * (3 - 2 * t);
        this.world.cameraX = this.cameraStartX + (targetX - this.cameraStartX) * smoothT;
    }

    updateDisplayedCounts() {
        document.getElementById('coinCount').textContent = this.coinCount;
        document.getElementById('bottleCount').textContent = this.throwableCount;
    }

}