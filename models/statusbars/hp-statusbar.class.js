/**
 * @class HpStatusBar
 * @extends StatusBars
 * @description HUD element indicating the player's health level.
 */
class HpStatusBar extends StatusBars {

    /**
     * @type {number}
     * @description Width of the health status bar in pixels.
     */
    width = 200;
    /**
     * @type {number}
     * @description Height of the health status bar in pixels.
     */
    height = 50;
    /**
     * @type {number}
     * @description Vertical position of the status bar.
     */
    y = -10;
    /**
     * @type {number}
     * @description Horizontal position of the status bar.
     */
    x = 40;
    /**
     * @type {number}
     * @description Horizontal offset for drawing the bar.
     */
    offsetX = 10;  
    /**
     * @type {number}
     * @description Vertical offset for drawing the bar.
     */
    offsetY = 20;
    /**
     * @type {string[]}
     * @description Image frames representing health levels.
     */
    frames = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * @constructor
     * @description Loads health bar frames and sets the default image.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.frames);

    }

    /**
     * @function updateHPStatusBar
     * @param {number} hp - Current health value of the player.
     * @description Updates the displayed frame according to the player's health.
     */
    updateHPStatusBar(hp) {
        let i = Math.floor(hp / 20);
        i = Math.max(0, Math.min(i, this.frames.length - 1));
        this.img = (hp > 0 && hp <= 20) ? this.imgCache[this.frames[1]] : this.imgCache[this.frames[i]];
    }
}