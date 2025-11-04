class CoinCollectable extends Collectable {
    width = 150;
    height = 150;
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }
    
    constructor(world) {
        super(world);
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * (720*7 - this.width);
        this.y = 100+ Math.random() * (400 - this.height);
    }
}
