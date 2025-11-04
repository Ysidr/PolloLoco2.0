class BottleCollectable extends Collectable {
    width = 100;
    height = 120;
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

    constructor(world) {
        super(world);
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * (720 * 7 - this.width);
        this.y = 400 - this.height + 45;
    }
}