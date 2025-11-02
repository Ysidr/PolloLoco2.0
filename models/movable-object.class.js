class MovableObject {
    x = 120;
    y= 250;
    width= 100;
    height= 100;
    img;
    imgCache = {};

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


    moveRight() { }

    moveLeft() { }
}