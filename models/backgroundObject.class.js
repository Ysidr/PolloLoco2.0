/**
 * @class BackgroundObject
 * @extends MovableObject
 * @description Represents a static background element positioned within the level.
 */
class BackgroundObject extends MovableObject {


    /**
     * @constructor
     * @param {string} imagePath - Path to the background image asset.
     * @param {number} x - Horizontal position where the background element should be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.width = 720;
        this.height = 480;
        this.x = x;
        this.y = 0;
    }
}