class MovableObject {
    x = 120;
    y= 250;
    width= 100;
    height= 100;
    img;
    imgCache = {};
    currentImageIndex = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    moveRight() { 
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60); }

    moveLeft() { 
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}