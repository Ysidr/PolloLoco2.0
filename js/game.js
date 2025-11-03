let canvas;
let world;
let inputs = new Inputs();


function init() {

    canvas = document.querySelector("canvas");
    world = new World(canvas, inputs);

    // Set the canvas size to 750x480 and scale for high-DPI displays
    // this.scaleCanvas(750, 480);
}

// function scaleCanvas(width, height) {
//     canvas.width = width * window.devicePixelRatio;
//     canvas.height = height * window.devicePixelRatio;
//     canvas.style.width = width + "px";
//     canvas.style.height = height + "px";
// }

window.addEventListener('keydown', (event) => {
    if (event.keyCode === 65) {
        inputs.LEFT = true;
    }
    if (event.keyCode === 68) {
        inputs.RIGHT = true;
    }
    if (event.keyCode === 32) {
        inputs.JUMP = true;
    }

});

window.addEventListener('keyup', (event) => {
    if (event.keyCode === 65) inputs.LEFT = false;
    if (event.keyCode === 68) inputs.RIGHT = false;
    if (event.keyCode === 32) inputs.JUMP = false;
});

