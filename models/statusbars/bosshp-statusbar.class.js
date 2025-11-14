/**
 * @class BossHpStatusBar
 * @extends StatusBars
 * @description HUD element displaying the end boss's remaining health.
 */
class BossHpStatusBar extends StatusBars {

    /**
     * @type {number}
     * @description Width of the boss health bar in pixels.
     */
    width = 300;
    /**
     * @type {number}
     * @description Height of the boss health bar in pixels.
     */
    height = 80;
    /**
     * @type {number}
     * @description Vertical position of the boss health bar.
     */
    y = 60;
    /**
     * @type {number}
     * @description Horizontal position of the boss health bar.
     */
    x = 400;
    /**
     * @type {number}
     * @description Horizontal offset applied when drawing the bar.
     */
    offsetX = 10;  // Fixed position from left
    /**
     * @type {number}
     * @description Vertical offset applied when drawing the bar.
     */
    offsetY = 20;
    /**
     * @type {string[]}
     * @description Image frames representing different boss health levels.
     */
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