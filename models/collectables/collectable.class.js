/**
 * @class Collectable
 * @extends MovableObject
 * @description Base class for collectible items such as coins and bottles.
 */
class Collectable extends MovableObject {
    /**
     * @type {number}
     * @description Amount awarded when the item is collected.
     */
    value = 1;
    /**
     * @type {('coin'|'bottle')}
     * @description Type of collectible item represented by the instance.
     */
    type = 'coin' || 'bottle';
    
    /**
     * @constructor
     * @param {World} world - The active game world managing collectables.
     */
    constructor(world) {
        super(world);
        this.world = world;
    }
}