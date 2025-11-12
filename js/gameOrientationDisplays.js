


/**
 * @function checkOrientation
 * @description Checks the device orientation and updates the UI accordingly at regular intervals.
 */
function checkOrientation() {
    const rotateMessage = document.getElementById('rotate-device');
    setInterval(() => {
        window.isHorizontal = window.innerWidth > window.innerHeight ? true : false;
        if (window.isMobileDevice) {
            switchMobileDevice(rotateMessage);
        }
    }, 1000);
}

function switchMobileDevice(rotateMessage) {
    switch (true) {
        case !window.gamesHasStarted && window.isHorizontal:
            notStartedButHorizontal(rotateMessage);
            break;
        case !window.gamesHasStarted && !window.isHorizontal:
            notStartedButVertical(rotateMessage);
            break;
        case window.gamesHasStarted && window.isHorizontal:
            startedButHorizontal(rotateMessage);
            break;
        case window.gamesHasStarted && !window.isHorizontal:
            startedButVertical(rotateMessage);
            break;
    }
}

/**
 * @function notStartedButHorizontal
 * @param {HTMLElement} rotateMessage - The DOM element displaying the rotate device message.
 * @description Handles UI changes when the game has not started and the device is in horizontal orientation.
 */
function notStartedButHorizontal(rotateMessage) {
    addAllMobileControls();
    rotateMessage.classList.add('d-none');
    if (document.getElementById("gameControllContainer").classList.contains('d-none')) {
        document.getElementById("gameStartContainer").classList.remove('d-none');
    }
    document.getElementById("forYourInfo").classList.remove('d-none');
}

/**
 * @function notStartedButVertical
 * @param {HTMLElement} rotateMessage - The DOM element displaying the rotate device message.
 * @description Handles UI changes when the game has not started and the device is in vertical orientation.
 */
function notStartedButVertical(rotateMessage) {
    rotateMessage.classList.remove('d-none');
    document.getElementById("gameStartContainer").classList.add('d-none');
    document.getElementById("forYourInfo").classList.add('d-none');
    document.getElementById("gameControllContainer").classList.add('d-none');
}

/**
 * @function startedButHorizontal
 * @param {HTMLElement} rotateMessage - The DOM element displaying the rotate device message.
 * @description Handles UI changes when the game has started and the device is in horizontal orientation.
 */
function startedButHorizontal(rotateMessage) {
    addAllMobileControls();
    rotateMessage.classList.add('d-none');
    document.getElementById("gameStartContainer").classList.add('d-none');
    document.getElementById("forYourInfo").classList.remove('d-none');
    document.getElementById("fullscreen").classList.remove('d-none');

}

/**
 * @function startedButVertical
 * @param {HTMLElement} rotateMessage - The DOM element displaying the rotate device message.
 * @description Handles UI changes when the game has started and the device is in vertical orientation.
 */
function startedButVertical(rotateMessage) {
    rotateMessage.classList.remove('d-none');
    document.getElementById("gameStartContainer").classList.add('d-none');
    document.getElementById("forYourInfo").classList.add('d-none');
    document.getElementById("fullscreen").classList.add('d-none');
    if (IntervalManager.getIntervalCount() > 0) {
        IntervalManager.pauseAllIntervals();
    }
    gameDesingPaused();
}
