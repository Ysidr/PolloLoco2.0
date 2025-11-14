/**
 * @class StatusBars
 * @extends MovableObject
 * @description Base class for HUD status bars that render tracked game metrics.
 */
class StatusBars extends MovableObject {
    width = 200;
    height = 50;
    img;
    imgCache = {};
    offsetX = 10;
    offsetY = 20;

    /**
     * @constructor
     * @description Initializes drawing offsets based on default positioning.
     */
    constructor() {
        super();
        this.x = this.offsetX;
        this.y = this.offsetY;
    }

    /**
     * @function updatePosition
     * @description Hook for subclasses to adjust the bar's position each frame.
     */
    updatePosition() {
    }

    /**
     * @function draw
     * @param {CanvasRenderingContext2D} ctx - Rendering context used to draw the status bar.
     * @description Renders the current status bar image at the configured position.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.offsetX, this.y, this.width, this.height);
    }

    /**
     * @function loadImage
     * @param {string} path - Path to the status bar image asset.
     * @description Loads the primary image to be displayed for the status bar.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}