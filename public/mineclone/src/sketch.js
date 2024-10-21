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

    miMundo = new Mundo(128, 128, 2, Math.random() * 10000)
    jugador = new Player(miMundo, 128, cameraProperties, assets())
    miMundo.generateWorld()
    jugador.setSpawn()
}

function draw() {
    background(110)
    scale(2)
    aimWithMouse(jugador.rec())

    delta_time = millis() - delta_time
    for (let i = 0; i < delta_time; i++) {
        jugador.physics(delta_time, game_speed)
    }
    jugador.advanceTime(delta_time)
    delta_time = millis()

    handleKeyPress()
    handleMousePress()
}



function assets() {
    const bl = new blockList()
    let assetList = {
        files: bl.listaDeBloques().map(bloque => {
            return {
                img: loadImage("assets/" + bloque.name + ".png"),
                es: (nombre) => nombre === bloque.name
            }
        }), res: 16
    }
    assetList.files.unshift({ img: loadImage("assets/Face.png"), es: (nombre) => nombre === "Face" })
    return assetList
}

function mouseWheel(event) {
    if (event.delta != 0) {
        if (event.delta > 0) {
            //jugador.aimWithScroll(1)
            jugador.scrollInventory(1)
        }
        else{
            //jugador.aimWithScroll(-1)
            jugador.scrollInventory(-1)
        }
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

function aimWithMouse(position) { // NO ESTOY ORGULLOSO DE ESTA JSJSJSJ 
    // ROMPO TODO EL ENCAPSULAMIENTO EN TODAS PARTES AHORA XD
    let dx = position.x - mouseX / 2 + 8
    let dy = position.y - mouseY / 2 + 8
    let ejex = undefined
    let ejey = undefined
    if (dx < 8) {
        ejex = "derecha"
    }
    if (dx > -8) {
        ejex = "izquierda"
    }
    if (dx <= 8 && dx >= -8) {
        ejex = "centro"
    }
    if (dy > 8) {
        ejey = "arriba"
    }
    if (dy < -8) {
        ejey = "abajo"
    }
    if (dy <= 8 && dy >= -8) {
        ejey = "centro"
    }
    let direccion = ejex + " y " + ejey
    switch (direccion) {
        case "derecha y centro":
            jugador.aim = 3
            break
        case "izquierda y centro":
            jugador.aim = 7
            break
        case "centro y arriba":
            jugador.aim = 1
            break
        case "centro y abajo":
            jugador.aim = 5
            break
        case "derecha y arriba":
            jugador.aim = 2
            break
        case "izquierda y arriba":
            jugador.aim = 8
            break
        case "derecha y abajo":
            jugador.aim = 4
            break
        case "izquierda y abajo":
            jugador.aim = 6
            break
            defaul:
            jugador.aim = 0
            break
    }

    //console.log("ejex: "+ ejex + "; ejey: "+ejey)
}