class BottleStatusBar extends StatusBars {

    width =200;
    height = 50;
    y = 10;
    x = 26;
    frames = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.frames);

    }

    updateBottleStatusBar(bottle) {
        bottle = Math.min(bottle, 6);
        let frameIndex = Math.min(bottle, 5);
        if (bottle === 6) {
            frameIndex = 5;
        }
        this.img = this.imgCache[this.frames[frameIndex]];
    }
}