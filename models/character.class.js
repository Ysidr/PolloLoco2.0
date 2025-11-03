class Character extends PcNpc {

    width = 150;
    height = 300;
    y;
    world;
    speed = 25;

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

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.framesIdle);
        this.loadImages(this.framesWalk);
        this.y = 480 - this.height - 40;

        this.animate();

    }

    animate() {
        setInterval(() => {
            const isMoving = this.world.inputs.LEFT || this.world.inputs.RIGHT;
            const frames = isMoving ? this.framesWalk : this.framesIdle;
            if (this.world.inputs.LEFT) {
                this.otherDirection = true;
            } else if (this.world.inputs.RIGHT) {
                this.otherDirection = false;
            } 
            
            if (isMoving) {
                const moveSpeed = this.world.inputs.LEFT ? -this.speed : this.speed;
                this.x += moveSpeed;
            }
            
            const frame = frames[this.currentImageIndex % frames.length];
            this.img = this.imgCache[frame];
            this.currentImageIndex++;
            this.world.cameraX = -this.x + 100;
        },60);
    }

    jump() {
        test
    }
}