class Endboss extends PcNpc {

    x = 5000;
    width = 400;
    height = 400;
    hp = 100;


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
    framesHurt = [
        `img/4_enemie_boss_chicken/4_hurt/G21.png`,
        `img/4_enemie_boss_chicken/4_hurt/G22.png`,
        `img/4_enemie_boss_chicken/4_hurt/G23.png`,

    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.framesAlert);
        this.loadImages(this.framesHurt);
        this.y = 480 - this.height - 20;

        this.animate();

    }

    animate() {
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            this.checkHealth();
            this.playAnimation(this.framesAlert);
        }, 10000 / 60, `${className}endboss-animate`);
    }


}
