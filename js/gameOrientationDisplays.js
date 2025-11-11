


function checkOrientation() {
    const rotateMessage = document.getElementById('rotate-device');
    setInterval(() => {
        window.isHorizontal = window.innerWidth > window.innerHeight ? true : false;
        if (window.isMobileDevice) {
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
    }, 1000);
}

function notStartedButHorizontal(rotateMessage) {
    addAllMobileControls();
    rotateMessage.classList.add('d-none');
    document.getElementById("gameStartContainer").classList.remove('d-none');
    document.getElementById("forYourInfo").classList.remove('d-none');
}

function notStartedButVertical(rotateMessage) {
    rotateMessage.classList.remove('d-none');
    document.getElementById("gameStartContainer").classList.add('d-none');
    document.getElementById("forYourInfo").classList.add('d-none');
}

function startedButHorizontal(rotateMessage) {
    addAllMobileControls();
    rotateMessage.classList.add('d-none');
    document.getElementById("gameStartContainer").classList.add('d-none');
    document.getElementById("forYourInfo").classList.remove('d-none');
    document.getElementById("fullscreen").classList.remove('d-none');
}

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
