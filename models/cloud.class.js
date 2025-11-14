/**
 * @class Cloud
 * @extends MovableObject
 * @description Floating cloud background element that slowly drifts left.
 */
class Cloud extends MovableObject {
    width = 250;
    height = 150;

    /**
     * @constructor
     * @description Loads the cloud graphic, randomizes its starting position, and begins movement.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.y = 10+ Math.random() * 50;
        this.x = Math.random() * 800;

        this.animate();
    }

    /**
     * @function animate
     * @description Moves the cloud leftward to create parallax motion.
     */
    animate() {
        this.moveLeft();
    }
}