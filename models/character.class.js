class Character extends PcNpc {

    width = 150;
    height = 300;
    y;
    world;
    speed = 25;

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

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.framesIdle);
        this.loadImages(this.framesWalk);
        this.loadImages(this.framesJump);
        this.y = 480 - this.height - 40;
        this.applyGravity();

        this.animate();

    }

    animate() {
        setInterval(() => {
            const isMoving = this.world.inputs.LEFT || this.world.inputs.RIGHT;
            const isJumping = this.world.inputs.JUMP;
            
            this.checkJump(isJumping, isMoving);
            this.checkDirection();
            this.checkMovement(isMoving);
        
            this.playAnimation(this.frames);
            this.world.cameraX = -this.x + 100;
        }, 60);
    }
    

}