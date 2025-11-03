class CoinStatusBar extends StatusBars {

    width =200;
    height = 50;
    y = 30;
    x = 0;
    frames = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.loadImages(this.frames);

    }

    updateCoinStatusBar(coin) {
        let i = Math.floor(coin / 20);
        i = Math.max(0, Math.min(i, this.frames.length - 1));
        this.img = this.imgCache[this.frames[i]];
    }
}