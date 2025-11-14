/**
 * @class BossHpStatusBar
 * @extends StatusBars
 * @description HUD element displaying the end boss's remaining health.
 */
class BossHpStatusBar extends StatusBars {

    
    width = 300;
    height = 80;
    y = 60;
    x = 400;
    offsetX = 10;
    offsetX = 10;
    offsetY = 20;
    frames = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * @constructor
     * @description Loads boss health bar frames and sets the default image.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
        this.loadImages(this.frames);

    }

    /**
     * @function updateBossHPStatusBar
     * @param {number} hp - Current health value of the boss.
     * @description Updates the displayed frame based on the boss's remaining health.
     */
    updateBossHPStatusBar(hp) {
        let i = Math.floor(hp / 20);
        i = Math.max(0, Math.min(i, this.frames.length - 1));
        this.img = (hp > 0 && hp <= 20) ? this.imgCache[this.frames[1]] : this.imgCache[this.frames[i]];
    }
}