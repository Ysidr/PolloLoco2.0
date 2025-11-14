/**
 * @class HpStatusBar
 * @extends StatusBars
 * @description HUD element indicating the player's health level.
 */
class HpStatusBar extends StatusBars {
    width = 200;
    height = 50;
    y = -10;
    x = 40;
    offsetX = 10;  
    offsetY = 20;
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