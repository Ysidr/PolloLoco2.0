class Endboss extends PcNpc {

    x = 5000;
    width = 400;
    height = 400;
    hp = 100;
    firstContact = false;
    startedMoving = false;
    speed = 2;


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

    framesDead = [
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G26.png`,
    ];

    framesAttack = [
        `img/4_enemie_boss_chicken/3_attack/G13.png`,
        `img/4_enemie_boss_chicken/3_attack/G14.png`,
        `img/4_enemie_boss_chicken/3_attack/G15.png`,
        `img/4_enemie_boss_chicken/3_attack/G16.png`,
        `img/4_enemie_boss_chicken/3_attack/G17.png`,
        `img/4_enemie_boss_chicken/3_attack/G18.png`,
        `img/4_enemie_boss_chicken/3_attack/G19.png`,
        `img/4_enemie_boss_chicken/3_attack/G20.png`,
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.framesAlert);
        this.loadImages(this.framesHurt);
        this.loadImages(this.framesWalk);
        this.loadImages(this.framesDead);
        this.loadImages(this.framesAttack);
        this.y = 480 - this.height - 20;

        this.animate();

    }

    animate() {
        let i = 0;
        const className = this.constructor.name;
        IntervalManager.setInterval(() => {
            if (this.firstContact && !this.startedMoving) {
                this.moveLeft();
                this.startedMoving = true;
            }
            this.checkHealth();
            this.checkWhatToPlay(i);
            i++;
        }, 10000 / 60, `${className}endboss-animate`);
    }

    checkWhatToPlay(i) {
        if (this.isFirstContact()) {
            this.startAlert();
            i = 0;
        }
        if (i < this.framesAlert.length*2) {
            this.playAnimation(this.framesAlert);
            i++;
        } else if (this.isDying) {
            this.playDeathFrames();
        } else if (this.x - this.world.character.x < 105) {
            this.playAnimation(this.framesAttack);
        }
        else {
            this.playAnimation(this.framesWalk);
        }
    }

    isFirstContact() {
        return this.world?.character?.x > 4420 && !this.firstContact;
    }

    playDeathFrames() {
        let i = 0;
        if (i < this.framesDead.length) {
            this.playAnimation(this.framesDead);
            i++;
        }
        this.isDead = true;
    }

    startAlert() {
        this.firstContact = true;
        this.world.audioManager.playSound('bossAlert');
    }

}
