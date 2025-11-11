/**
 * @class StatusBars
 * @extends MovableObject
 * @description Base class for HUD status bars that render tracked game metrics.
 */
class StatusBars extends MovableObject {
    /**
     * @type {number}
     * @description Width of the status bar in pixels.
     */
    width = 200;
    /**
     * @type {number}
     * @description Height of the status bar in pixels.
     */
    height = 50;
    /**
     * @type {?HTMLImageElement}
     * @description Currently displayed status bar image.
     */
    img;
    /**
     * @type {Object.<string, HTMLImageElement>}
     * @description Cache of preloaded status bar frames.
     */
    imgCache = {};
    /**
     * @type {number}
     * @description Horizontal offset applied when drawing the bar.
     */
    offsetX = 10;  
    /**
     * @type {number}
     * @description Vertical offset applied when drawing the bar.
     */
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