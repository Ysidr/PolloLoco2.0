class Endboss extends PcNpc {

    x = 5000;
    width = 400;
    height = 400;
    hp = 100;
    firstContact = false;


    framesAlert = [
        `img/4_enemie_boss_chicken/2_alert/G5.png`,
        `img/4_enemie_boss_chicken/2_alert/G6.png`,
        `img/4_enemie_boss_chicken/2_alert/G7.png`,
        `img/4_enemie_boss_chicken/2_alert/G8.png`,
        `img/4_enemie_boss_chicken/2_alert/G9.png`,
        `img/4_enemie_boss_chicken/2_alert/G10.png`,
        `img/4_enemie_boss_chicken/2_alert/G11.png`,
        `img/4_enemie_boss_chicken/2_alert/G12.png`,
    ];

    framesWalk = [
        `img/4_enemie_boss_chicken/1_walk/G1.png`,
        `img/4_enemie_boss_chicken/1_walk/G2.png`,
        `img/4_enemie_boss_chicken/1_walk/G3.png`,
        `img/4_enemie_boss_chicken/1_walk/G4.png`,
    ];
    
    framesHurt = [
        `img/4_enemie_boss_chicken/4_hurt/G21.png`,
        `img/4_enemie_boss_chicken/4_hurt/G22.png`,
        `img/4_enemie_boss_chicken/4_hurt/G23.png`,

    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.framesAlert);
        this.loadImages(this.framesHurt);
        this.loadImages(this.framesWalk);
        this.y = 480 - this.height - 20;

        this.animate();

    }

    animate() {
        let i = 0;
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.checkHealth();
            if (this.world?.character?.x > 4420 && !this.firstContact) {
                this.firstContact = true;
                this.world.audioManager.playSound('bossAlert');
                i = 0;
            }
            if (i < this.framesAlert.length) {
                this.playAnimation(this.framesAlert);
            }else{
                this.playAnimation(this.framesWalk);
            }
            i++;
        }, 10000 / 60, `${className}endboss-animate`);
    }


}
