class Collectable extends MovableObject {
    value = 1;
    type = 'coin' || 'bottle';
    
    constructor(world) {
        super(world);
        this.world = world;
    }
}