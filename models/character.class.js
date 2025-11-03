class Character extends PcNpc {

    width = 150;
    height = 300;
    y;
    world;

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

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.framesIdle);
        this.y = 480 - this.height - 40;

        this.animate();

    }

    animate() {
        setInterval(() => {
            let i = this.currentImageIndex % this.framesIdle.length;
            let path = this.framesIdle[i];
            this.img = this.imgCache[path];
            this.currentImageIndex++;
        }, 10000 / 60);
    }

    jump() {
        test
    }
}