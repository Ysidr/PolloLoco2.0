let canvas;
let ctx;
let character = new Image();


function init() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    character.src = "../img/2_character_pepe/1_idle/idle/I-1.png";
}