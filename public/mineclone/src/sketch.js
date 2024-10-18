const game_speed = 1.0
const cameraProperties = {
    wid: 60,
    hei: 34,
    scale: 16
}

let miMundo = undefined
let jugador = undefined
let delta_time = 0

function setup() {
    createCanvas(1920, 1080)
    frameRate(60)
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    const assets={files:[
        {img:loadImage("assets/Void.png"),es:(nombre) => nombre==="Void"},
        {img:loadImage("assets/Wood.png"),es:(nombre) => nombre==="Wood"},
        {img:loadImage("assets/Stone.png"),es:(nombre) => nombre==="Stone"},
        {img:loadImage("assets/Leaves.png"),es:(nombre) => nombre==="Leaves"},
        {img:loadImage("assets/Bush.png"),es:(nombre) => nombre==="Bush"},
        {img:loadImage("assets/Grass.png"),es:(nombre) => nombre==="Grass"},
        {img:loadImage("assets/Earth.png"),es:(nombre) => nombre==="Earth"},
        {img:loadImage("assets/Undefined.png"),es:()=>true}
    ],res:16}
    
    miMundo = new Mundo(256, 128, 1)
    jugador = new Player(miMundo, 128, cameraProperties, assets)
    miMundo.generateWorld()
    jugador.setSpawn()
}

function draw() {
    background(110)
    scale(2)
    jugador.rec()

    delta_time = millis() - delta_time
    for (let i = 0; i < delta_time; i++) {
        jugador.physics(delta_time, game_speed)
    }
    jugador.advanceTime(delta_time)
    delta_time = millis()

    handleKeyPress()
    handleMousePress()
}

function mouseWheel(event) {
    if (event.delta != 0) {
        if (event.delta > 0)
            jugador.aimWithScroll(1)
        else
            jugador.aimWithScroll(-1)
    }
}

function handleKeyPress() {
    if (keyIsPressed) {
        if (key == "w" || key == "W") {
            jugador.desplazarJugadorEnY(-0.22)
        }
        if (key == "s" || key == "S") {
            jugador.desplazarJugadorEnY(0.2)
        }
        if (key == "a" || key == "A") {
            jugador.desplazarJugadorEnX(-0.2)
        }
        if (key == "d" || key == "D") {
            jugador.desplazarJugadorEnX(0.2)
        }
        if (key == "m" || key == "M") {
            miMundo.getMap()
        }
        "1234567890".split("").find((value, index) => {
            if (value == key)
                jugador.useFromInventory(index)
        })
    } else {
        jugador.desplazarJugadorEnX(0)
    }
}

function handleMousePress() {
    if (mouseIsPressed) {
        if (mouseButton === LEFT) jugador.removeBlock()
        if (mouseButton === RIGHT) jugador.addBlock()
    }
}
