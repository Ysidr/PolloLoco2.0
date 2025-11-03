class HpStatusBar extends StatusBars {

    width =200;
    height = 50;
    y = 0;
    x = 10;
    frames = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.frames);

    }

    updateHPStatusBar(hp) {
        let i = Math.floor(hp / 20);
        i = Math.max(0, Math.min(i, this.frames.length - 1));
        this.img = this.imgCache[this.frames[i]];
    }
}