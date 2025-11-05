class BottleThrowable extends Throwables {
    throwableDamage = 20;


    framesFlying = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    framesBreak = [
        `img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png`,
        `img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png`,
        `img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png`,
        `img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png`,
        `img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png`,
        `img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png`
    ];


    constructor(world) {
        super(world);
        this.offset = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30
        };
        this.x = this.world.character.x;
        this.y = this.world.character.y;
        this.setSpeeds();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.framesFlying);
        this.loadImages(this.framesBreak);
        this.animate();
        this.applyGravity();
    }
    setSpeeds() {
        this.speed = 40;  // Set horizontal speed
        this.speedY = 20 // Set initial upward speed
        this.acceleration = 1; // Set gravity
    }

}
