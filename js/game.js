let canvas;
let world;
let inputs = new Inputs();
isFullscreen = false;
window.gamesHasStarted = false;
window.isHorizontal = false;
window.isMobileDevice = false;



function init() {
    document.getElementById("gameButtons").classList.remove('d-none');
    initLevel();
    gameStartContainer.classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');

    canvas = document.querySelector("canvas");
    world = new World(canvas, inputs);

    window.gamesHasStarted = true;
    checkMobileDevice();

    checkOrientation();
}


function checkMobileDevice() {
    window.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (window.isMobileDevice && window.gamesHasStarted) {
        document.getElementById("mobile-controls").classList.remove('d-none');
    }
}

function addAllMobileControls() {
    addMobileControl('btn-left', 'LEFT');
    addMobileControl('btn-right', 'RIGHT');
    addMobileControl('btn-jump', 'JUMP');
    addMobileControl('btn-throw', 'THROW');
    addMobileControl('btn-trade', 'TRADE');
}


function backToStartScreen() {
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

function exitToMenu() {
    document.getElementById("pause-overlay").innerHTML = `<button onclick='backToStart()'>Sure</button><button onclick='backToPause()'>Cancel</button>`;
}

function backToPause() {
    document.getElementById("pause-overlay").innerHTML = `
            <div class="volumeContainer">
                <input type="range" id="volume-slider" class="volume-slider"onchange="world.audioManager.changeAllVolume(this.value); changeVolumeDisplay()" min="0" max="1" step="0.05" value="1">
                <label for="volume-slider" id="volume-label"></label>
            </div>
            <button class="exitToMenu" onclick= exitToMenu() >Exit to Menu</button>`;
}

function backToStart() {
    IntervalManager.clearAllIntervals();
    world.audioManager.stopAllSounds();
    IntervalManager.allFunctions = [];
    level1 = null;
    world = null;
    canvas = null;
    document.getElementById("canvas").classList.add('d-none')
    document.getElementById("gameButtons").classList.add('d-none')
    document.getElementById("gameStartContainer").classList.remove('d-none')
    document.getElementById("mobile-controls").classList.add('d-none')
    document.getElementById("pause-overlay").classList.add('d-none')
    backToPause();
    gameDesingResumed();
    window.gamesHasStarted = false;
}

function gameDesingPaused() {
    document.getElementById("pause-btn").classList.add('d-none')
    document.getElementById("play-btn").classList.remove('d-none')
    document.getElementById("restart-btn").classList.remove('d-none')
    document.getElementById("pause-overlay").classList.remove('d-none')
    if (world && world.audioManager) {
        world.audioManager.changeVolume('backgroundMusic', 0.5);
    }
}

function gameDesingResumed() {
    document.getElementById("pause-btn").classList.remove('d-none')
    document.getElementById("play-btn").classList.add('d-none')
    document.getElementById("restart-btn").classList.add('d-none')
    document.getElementById("pause-overlay").classList.add('d-none')
    if (world && world.audioManager) {
        world.audioManager.changeVolume('backgroundMusic', 2);
    }
}

function gameOver(result) {
    switch (result) {
        case "win":
            document.getElementById("pause-overlay").classList.remove('d-none')
            document.getElementById("pause-overlay").innerHTML = `<img src="img/You won, you lost/You win B.png" alt="Endscreen">`;
            document.getElementById("restart-btn").classList.remove('d-none')
            document.getElementById("pause-btn").classList.add('d-none')
            break;
        case "lost":
            document.getElementById("pause-overlay").classList.remove('d-none')
            document.getElementById("pause-overlay").innerHTML = `<img src="img/You won, you lost/Game Over.png" alt="Endscreen">`;
            document.getElementById("restart-btn").classList.remove('d-none')
            document.getElementById("pause-btn").classList.add('d-none')
            break;
    }
}

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

function addMobileControl(buttonId, inputKey) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    const start = (e) => {
        e.preventDefault();
        if (window.innerWidth > window.innerHeight)
            inputs[inputKey] = true;
    };
    const end = (e) => {
        e.preventDefault();
        inputs[inputKey] = false;
    };
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', end);
    btn.addEventListener('mouseleave', end);

    btn.addEventListener('touchstart', start);
    btn.addEventListener('touchend', end);
    btn.addEventListener('touchcancel', end);
}

function fullscreen() {
    const container = document.getElementById("fullscreen");
    if (isFullscreen) {
        exitFullscreen(container);
    } else {
        enterFullscreen(container);
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    }
    isFullscreen = true;
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
    } else if (document.msRequestFullscreen) { // IE11
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    }
    isFullscreen = false;
}
