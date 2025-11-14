let canvas;
let world;
let inputs = new Inputs();
isFullscreen = false;
window.gamesHasStarted = false;
window.isHorizontal = false;
window.isMobileDevice = false;

/**
 * @function init
 * @description Initializes the game by setting up the level, UI elements, canvas, world, and checking device and orientation.
 */
function init() {
    document.getElementById("fullscreen").classList.remove('d-none');
    document.getElementById("gameButtons").classList.remove('d-none');
    initLevel();
    gameStartContainer.classList.add('d-none');
    document.getElementById("canvas").classList.remove('d-none');
    backToPause()
    canvas = document.querySelector("canvas");
    world = new World(canvas, inputs);
    window.gamesHasStarted = true;
    checkMobileDevice();
    checkOrientation();
}

/**
 * @function checkMobileDevice
 * @description Detects if the user is on a mobile device and shows mobile controls if the game has started.
 */
function checkMobileDevice() {
    window.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    isMobileDevice? document.getElementById("controllsBtn").classList.add('d-none') : document.getElementById("controllsBtn").classList.remove('d-none');
    if (window.isMobileDevice && window.gamesHasStarted) {
        document.getElementById("mobile-controls").classList.remove('d-none');
    }
}

/**
 * @function addAllMobileControls
 * @description Adds event listeners to all mobile control buttons for game inputs.
 */
function addAllMobileControls() {
    addMobileControl('btn-left', 'LEFT');
    addMobileControl('btn-right', 'RIGHT');
    addMobileControl('btn-jump', 'JUMP');
    addMobileControl('btn-throw', 'THROW');
    addMobileControl('btn-trade', 'TRADE');
}

/**
 * @function backToStartScreen
 * @description Switches the UI to show the start screen and hide the game control container.
 */
function backToStartScreen() {
    document.getElementById("gameStartContainer").classList.remove('d-none')
    document.getElementById("gameControllContainer").classList.add('d-none')
}

/**
 * @function showControlls
 * @description Switches the UI to show the game control container and hide the start screen.
 */
function showControlls() {
    document.getElementById("gameStartContainer").classList.add('d-none')
    document.getElementById("gameControllContainer").classList.remove('d-none')
}

/**
 * @function restartGame
 * @description Restarts the game by clearing intervals, stopping sounds, resetting variables, and initializing again.
 */
function restartGame() {

    IntervalManager.clearAllIntervals();
    world.audioManager.stopAllSounds();
    IntervalManager.allFunctions = [];
    level1 = null;
    world = null;
    canvas = null;
    init();
}

/**
 * @function exitToMenu
 * @description Shows confirmation buttons to exit to the menu on the pause overlay.
 */
function exitToMenu() {
    document.getElementById("pause-overlay").innerHTML = `<button onclick='backToStart()'>Sure</button><button onclick='backToPause()'>Cancel</button>`;
}

/**
 * @function backToPause
 * @description Displays the pause overlay with volume controls and exit to menu button.
 */
function backToPause() {
    document.getElementById("pause-overlay").innerHTML = `
            <div class="volumeContainer">
                <input type="range" id="volume-slider" class="volume-slider"onchange="world.audioManager.changeAllVolume(this.value)" min="0" max="1" step="0.05" value="1">
                <label for="volume-slider" id="volume-label"></label>
            </div>
            <button class="exitToMenu" onclick= exitToMenu() >Exit to Menu</button>`;
}

/**
 * @function backToStart
 * @description Returns the game to the start screen, clears intervals, stops sounds, resets variables, and updates UI.
 */
function backToStart() {
    IntervalManager.clearAllIntervals();
    world.audioManager.stopAllSounds();
    IntervalManager.allFunctions = [];
    level1 = null;
    world = null;
    canvas = null;
    resetDivs();
    backToPause();
    gameDesingResumed();
    window.gamesHasStarted = false;
    checkMute();
}

/**
 * @function resetDivs
 * @description Resets core UI containers to their default hidden or visible states when leaving the game view.
 */
function resetDivs() {
    document.getElementById("fullscreen").classList.add('d-none');
    document.getElementById("canvas").classList.add('d-none')
    document.getElementById("gameButtons").classList.add('d-none')
    document.getElementById("gameStartContainer").classList.remove('d-none')
    document.getElementById("mobile-controls").classList.add('d-none')
    document.getElementById("pause-overlay").classList.add('d-none')
}

/**
 * @function gameDesingPaused
 * @description Updates the UI and audio settings when the game is paused.
 */
function gameDesingPaused() {
    document.getElementById("pause-btn").classList.add('d-none')
    document.getElementById("play-btn").classList.remove('d-none')
    document.getElementById("restart-btn").classList.remove('d-none')
    document.getElementById("pause-overlay").classList.remove('d-none')
    if (world && world.audioManager) {
        world.audioManager.changeVolume('backgroundMusic', 0.5);
    }
}

/**
 * @function gameDesingResumed
 * @description Updates the UI and audio settings when the game is resumed.
 */
function gameDesingResumed() {
    document.getElementById("pause-btn").classList.remove('d-none')
    document.getElementById("play-btn").classList.add('d-none')
    document.getElementById("restart-btn").classList.add('d-none')
    document.getElementById("pause-overlay").classList.add('d-none')
    if (world && world.audioManager) {
        world.audioManager.changeVolume('backgroundMusic', 2);
    }
}

/**
 * @function gameOver
 * @param {string} result - The game result, either "win" or "lost".
 * @description Displays the game over screen with appropriate message and buttons.
 */
function gameOver(result) {
    switch (result) {
        case "win":
            caseWin();
            break;
        case "lost":
                caseLost();
            break;
    }
}

/**
 * @function caseWin
 * @description Renders the victory end screen and adjusts control visibility after the player wins.
 */
function caseWin() {
    document.getElementById("pause-overlay").classList.remove('d-none')
    document.getElementById("pause-overlay").innerHTML = `<img src="img/You won, you lost/You win B.png" alt="Endscreen">
    <button onclick='exitToMenuFromGameOver()'>Exit to Menu</button>`;
    document.getElementById("restart-btn").classList.remove('d-none')
    document.getElementById("pause-btn").classList.add('d-none')
}

/**
 * @function caseLost
 * @description Renders the defeat end screen and adjusts control visibility after the player loses.
 */
function caseLost() {
    document.getElementById("pause-overlay").classList.remove('d-none')
    document.getElementById("pause-overlay").innerHTML = `<img src="img/You won, you lost/Game Over.png" alt="Endscreen">
    <button onclick='exitToMenuFromGameOver()'>Exit to Menu</button>`;
    document.getElementById("restart-btn").classList.remove('d-none')
    document.getElementById("pause-btn").classList.add('d-none')
}

/**
 * @function exitToMenuFromGameOver
 * @description Exits to the menu from the game over screen by clearing intervals, stopping sounds, resetting variables, and updating UI.
 */
function exitToMenuFromGameOver() {
    IntervalManager.clearAllIntervals();
    world.audioManager.stopAllSounds();
    IntervalManager.allFunctions = [];
    level1 = null;
    world = null;
    canvas = null;
    manageDivsFromGameOver();
    backToPause()
    gameDesingResumed();
    backToStartScreen();
    checkMute();
}

function manageDivsFromGameOver() {
    document.getElementById("fullscreen").classList.add('d-none');
    document.getElementById("canvas").classList.add('d-none')
    document.getElementById("gameButtons").classList.add('d-none')
    document.getElementById("gameStartContainer").classList.remove('d-none')
    document.getElementById("mobile-controls").classList.add('d-none')
    document.getElementById("pause-overlay").classList.add('d-none')
}

/**
 * @function
 * @param {KeyboardEvent} event - The keyboard event.
 * @description Handles keydown events to set input flags for game controls.
 */
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

/**
 * @function
 * @param {KeyboardEvent} event - The keyboard event.
 * @description Handles keyup events to unset input flags for game controls.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode === 65) inputs.LEFT = false;
    if (event.keyCode === 68) inputs.RIGHT = false;
    if (event.keyCode === 32) inputs.JUMP = false;
    if (event.keyCode === 16) inputs.THROW = false;
    if (event.keyCode === 67) inputs.TRADE = false;
});

/**
 * @function addMobileControl
 * @param {string} buttonId - The ID of the mobile control button.
 * @param {string} inputKey - The input key to toggle on press.
 * @description Adds event listeners to a mobile control button to set/unset input flags.
 */
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

/**
 * @function fullscreen
 * @description Toggles fullscreen mode on the "fullscreen" container element.
 */
function fullscreen() {
    const container = document.getElementById("fullscreen");
    if (isFullscreen) {
        exitFullscreen(container);
    } else {
        enterFullscreen(container);
    }
}

/**
 * @function enterFullscreen
 * @param {HTMLElement} element - The element to enter fullscreen.
 * @description Requests fullscreen mode for the given element.
 */
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

/**
 * @function exitFullscreen
 * @description Exits fullscreen mode if currently active.
 */
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

function checkMute() {
    if (localStorage.getItem('volume') === '0') {
        document.getElementById('volumeCheckbox').checked = true;
    } else {
        document.getElementById('volumeCheckbox').checked = false;
    }
}

function Mute() {
        if (localStorage.getItem('volume') === '0') {
            localStorage.setItem('volume', 0.5);
        } else {
            localStorage.setItem('volume', 0);
        }
    }

