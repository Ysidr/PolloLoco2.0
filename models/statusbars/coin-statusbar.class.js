/**
 * @class CoinStatusBar
 * @extends StatusBars
 * @description HUD element tracking collected coins.
 */
class CoinStatusBar extends StatusBars {

    /**
     * @type {number}
     * @description Width of the coin status bar in pixels.
     */
    width = 200;
    /**
     * @type {number}
     * @description Height of the coin status bar in pixels.
     */
    height = 50;
    /**
     * @type {number}
     * @description Vertical position of the status bar.
     */
    y = 30;
    /**
     * @type {number}
     * @description Horizontal position of the status bar.
     */
    x = 0;
    /**
     * @type {string[]}
     * @description Image frames representing coin collection levels.
     */
    frames = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    /**
     * @constructor
     * @description Loads coin status bar frames and sets the default image.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.loadImages(this.frames);

    }

    /**
     * @function updateCoinStatusBar
     * @param {number} coin - Current number of coins collected by the player.
     * @description Updates the displayed frame according to the player's coin count.
     */
    updateCoinStatusBar(coin) {
        coin = Math.min(coin, 6);
        let frameIndex = Math.min(coin, 5);
        if (coin === 6) {
            frameIndex = 5;
        }
        this.img = this.imgCache[this.frames[frameIndex]];
    }
}