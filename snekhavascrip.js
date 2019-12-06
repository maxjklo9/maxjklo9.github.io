// https://www.freecodecamp.org/news/think-like-a-programmer-how-to-build-snake-using-only-javascript-html-and-css-7b1479c3339e/
 // https://api.nasa.gov/planetary/apod?api_key=390R0zm07UZQQUmNUBfYDMcAIQoqUo3tq0MdAXn0

// create snake tail
// increase tail when eat
// kill snake when eat self
// add button functionality
// fix colour
// add fetch for background

timealiveDOC = document.getElementById('timealive');
scoreDOC = document.getElementById('score');
snekxDOC = document.getElementById('xvalue');
snekyDOC = document.getElementById('yvalue');
refreshBTNDOC = document.getElementById('refreshBTN');
restartBTNDOC = document.getElementById('restartBTN');
colourBTNDOC = document.getElementById('colourBTN');

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tick = 0;

colourarray = ['black', 'red', 'white', 'green', 'salmon', 'lightgreen', 'purple', 'pink'];

let refreshBTN = document.querySelector("#refreshBTN");
let restartBTN = document.querySelector("#restartBTN");
let coloursBTN = document.querySelector("#colourBTN");

refreshBTN.addEventListener("click", function(e) {
    window.location.reload();
});
restartBTN.addEventListener("click", function(e) {
    snacc = new Food(GenPos(), GenPos(), 50, 50, 'red');
});
coloursBTN.addEventListener("click", function(e) {
    snakey.genCol();
});

const WIDTH = 500;
const HEIGHT = 500;
const spd = 3;
let length = 3;

let started = false;
let UP = false;
let RIGHT = false;
let DOWN = false;
let LEFT = false;
let monch = 0;

function ClearMov() {
    UP = false;
    RIGHT = false;
    DOWN = false;
    LEFT = false;
}

let myGameArea = {
    clear : function() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
};

function Snek(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.length = length;

    colour = 'black';

    this.genCol = function() {
        colour = colourarray[Math.floor(Math.random()*colourarray.length)];
    };

    this.draw = function() {
        ctx.fillStyle = colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.update = function() {
        if(UP === true) {
            this.y -= spd;
        }
        if(RIGHT === true) {
            this.x += spd;
        }
        if(DOWN === true) {
            this.y += spd;
        }
        if(LEFT === true) {
            this.x -= spd;
        }
        if (this.x > WIDTH) {
            this.x -= WIDTH;
        }else if(this.x < 0) {
            this.x += WIDTH;
        }else if(this.y > HEIGHT) {
            this.y -= HEIGHT
        }else if(this.y < 0) {
            this.y += HEIGHT
        }
    };

    this.ate = function(pos) {
        let a = ((this.x) + 15) - ((pos.x) + 25);
        let b = ((this.y) + 15) - ((pos.y) + 25);
        let distance = Math.sqrt(a*a + b*b);
        return distance < 40;
    }
}

/**
 * @return {number}
 */
function GenPos() {
    return Math.floor(Math.random() * (440 - 40)) + 40;
};

function Food(x, y, width, height, colour) {
    this.colour = colour;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;


    this.draw = function() {
        ctx.fillStyle = colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.update = function() {

    };
}

function MoveRight() {
    ClearMov();
    RIGHT = true;
    started = true;
}

function MoveLeft() {
    ClearMov();
    LEFT = true;
    started = true;
}

function MoveUp() {
    ClearMov();
    UP = true;
    started = true;
}

function MoveDown() {
    ClearMov();
    DOWN = true;
    started = true;
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            MoveLeft();
            break;
        case 38:
            MoveUp();
            break;
        case 39:
            MoveRight();
            break;
        case 40:
            MoveDown();
            break;
    }
};

function loop() {

    myGameArea.clear();
    if(started === true) {
        tick++
    }
    snakey.draw();
    snacc.draw();

    snakey.update();
    if(snakey.ate(snacc)) {
        monch++;
        snacc = new Food(GenPos(), GenPos(), 50, 50, colourarray[Math.floor(Math.random()*colourarray.length)]);
    }

    tickstring = tick.toString();
    tickindex = tickstring[0];
    if(tickstring.length > 2 && tickindex % 2 === 0) {
        refreshBTNDOC.style.color = 'red';
    }else {
        refreshBTNDOC.style.color = 'white';
    }

    if(monch % 2 === 0) {
        restartBTNDOC.style.color = 'red';
    }else {
        restartBTNDOC.style.color = 'green';
    }

    if(UP === true || DOWN === true) {
        colourBTNDOC.style.color = 'green';
    }else if(LEFT === true || RIGHT === true) {
        colourBTNDOC.style.color = 'white'
    } else {
        colourBTNDOC.style.color = 'white';
    }

    snekxDOC.innerHTML = `X: ${snakey.x}`;
    snekyDOC.innerHTML = `Y: ${snakey.y}`;
    timealiveDOC.innerHTML = `Time Alive: ${tick}`;
    scoreDOC.innerHTML = `Score: ${monch}`;

    console.log(monch);
    window.requestAnimationFrame(loop);
}
ctx.beginPath();

snakey = new Snek((WIDTH/2)-25, (HEIGHT/2)-25, 30, 30);
snacc = new Food(GenPos(), GenPos(), 50, 50, 'black');

window.requestAnimationFrame(loop);
