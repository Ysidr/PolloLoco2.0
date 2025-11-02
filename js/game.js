let canvas;
let world;


function init() {

    canvas = document.querySelector("canvas");
    world = new World(canvas);
    
    // Set the canvas size to 750x480 and scale for high-DPI displays
    // this.scaleCanvas(750, 480);
}

// function scaleCanvas(width, height) {
//     canvas.width = width * window.devicePixelRatio;
//     canvas.height = height * window.devicePixelRatio;
//     canvas.style.width = width + "px";
//     canvas.style.height = height + "px";
// }