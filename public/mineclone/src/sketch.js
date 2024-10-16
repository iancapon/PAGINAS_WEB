const game_speed = 1.0

let miMundo=undefined
let jugador=undefined
let delta_time = 0

function setup() {
    createCanvas(1600, 900)
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    miMundo = new Mundo()
    jugador = new Player(miMundo, 30)
    miMundo.generateWorld()
    jugador.setSpawn()
}



function draw() {
    background(110)
    jugador.rec(60,40,20)

    delta_time = millis() - delta_time
    for (let i = 0; i < delta_time; i++) {
        jugador.physics(delta_time, game_speed)
    }
    jugador.advanceTime(delta_time)
    delta_time = millis()

    handleKeyPress()
    handleMousePress()
   // console.log(jugador.tick)
   textSize(20)
   fill(200)
   text("W-A-D to move..",60, 20*40)
   text("Numbers to select from inventory..",60, 20*41)
   text("Right-click to add block..",60, 20*42)
   text("Left-click to remove block..",60, 20*43) 
   text("Wheel to aim..",60, 20*44)
    
}


function addWood(block){
    block.Wood()
}
function addStone(block){
    block.Stone()
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
            jugador.desplazarJugadorEnY(-0.2)
        }
        if (key == "a" || key == "A") {
            jugador.desplazarJugadorEnX(-0.2)
        }
        if (key == "s" || key == "S") {
            jugador.desplazarJugadorEnY(0.2)
        }
        if (key == "d" || key == "D") {
            jugador.desplazarJugadorEnX(0.2)
        }

        if (key == "m" || key == "M") {
            miMundo.getMap()
        }
        "1234567890".split("").find((value,index)=>{
            if(value==key)
                jugador.useFromInventory(index)
        })
    } else {
        jugador.notPressed()
    }
}
function handleMousePress() {
    if (mouseIsPressed) {
        if (mouseButton === LEFT) jugador.removeBlock()
        if (mouseButton === RIGHT) jugador.addBlock()
    }
}



