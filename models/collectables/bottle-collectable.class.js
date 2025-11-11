/**
 * @class BottleCollectable
 * @extends Collectable
 * @description Collectible salsa bottle that grants additional throwable items.
 */
class BottleCollectable extends Collectable {
    /**
     * @type {number}
     * @description Width of the bottle sprite.
     */
    width = 100;
    /**
     * @type {number}
     * @description Height of the bottle sprite.
     */
    height = 120;
    /**
     * @type {{top:number,bottom:number,left:number,right:number}}
     * @description Collision box adjustments for the bottle sprite.
     */
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

    /**
     * @constructor
     * @param {World} world - The active game world managing collectables.
     * @description Loads bottle assets and randomizes its spawn location.
     */
    constructor(world) {
        super(world);
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * (720 * 7 - this.width);
        this.y = 400 - this.height + 45;
    }
}