class BossHpStatusBar extends StatusBars {

    width = 400;
    height = 100;
    y = 40;
    x = 300;
    offsetX = 10;  // Fixed position from left
    offsetY = 20;
    frames = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
        this.loadImages(this.frames);

    }

    updateBossHPStatusBar(hp) {
        let i = Math.floor(hp / 20);
        i = Math.max(0, Math.min(i, this.frames.length - 1));
        this.img = (hp > 0 && hp <= 20) ? this.imgCache[this.frames[1]] : this.imgCache[this.frames[i]];
    }
}