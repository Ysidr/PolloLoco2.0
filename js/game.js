let canvas;
let world;
let inputs = new Inputs();


function init() {
    document.getElementById("gameButtons").classList.remove('d-none')
    initLevel()
    gameStartContainer.classList.add('d-none')
    document.getElementById("canvas").classList.remove('d-none')

    canvas = document.querySelector("canvas");
    world = new World(canvas, inputs);
    

    // Set the canvas size to 750x480 and scale for high-DPI displays
    // this.scaleCanvas(750, 480);
}

function backToStart() {
    document.getElementById("gameStartContainer").classList.remove('d-none')
    document.getElementById("gameControllContainer").classList.add('d-none')
}

function showControlls() {
    document.getElementById("gameStartContainer").classList.add('d-none')
    document.getElementById("gameControllContainer").classList.remove('d-none')
}

function restartGame() {
    IntervalManager.clearAllIntervals();
    level1 = null;
    world = null;
    canvas = null;
    init();
}

function gameDesingPaused() {
    document.getElementById("pause-btn").classList.add('d-none')
    document.getElementById("play-btn").classList.remove('d-none')
    document.getElementById("restart-btn").classList.remove('d-none')
}

function gameDesingResumed() {
    document.getElementById("pause-btn").classList.remove('d-none')
    document.getElementById("play-btn").classList.add('d-none')
    document.getElementById("restart-btn").classList.add('d-none')
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
    if (event.keyCode === 16) {
        inputs.THROW = true;
    }
    if (event.keyCode === 67) {
        inputs.TRADE = true;
    }


});

window.addEventListener('keyup', (event) => {
    if (event.keyCode === 65) inputs.LEFT = false;
    if (event.keyCode === 68) inputs.RIGHT = false;
    if (event.keyCode === 32) inputs.JUMP = false;
    if (event.keyCode === 16) inputs.THROW = false;
    if (event.keyCode === 67) inputs.TRADE = false;
});
