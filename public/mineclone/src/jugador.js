class Player {
    constructor(mundo, x) {
        this.mundo = mundo
        this.pos = {
            x: x,
            y: 0,
            u: 0,
            v: 0,
            g: 0.01
        }
        this.inventory = ["Stone","Wood","Grass","Leaves","Earth","Bush"]
        this.inv_index = 0
        this.aim = 3

        this.cam = new Camera(this, this.mundo, 0, 0)

        this.tick = 0
        this.remove_TickCounter = this.tick
        this.add_TickCounter = this.tick
    }
    setSpawn = function () {
        for (let j = 0; j < 128; j++) {
            if ((this.mundo.getBlockAt(this.pos.x, j)).name != "Void") {
                this.pos.y = j - 1
                break
            }
        }

        this.cam.camera.x = this.pos.x
        this.cam.camera.y = this.pos.y
    }

    rec = function (wid, hei, scale) {
        this.cam.record(wid, hei, scale)

        let player_on_camera = this.cam.worldCoordenateToCameraPosition(this.pos.x, this.pos.y, wid, hei, scale)
        this.moveCameraCloseToEdge(player_on_camera.x, player_on_camera.y, wid, hei, scale)
    }

    desplazarJugadorEnX = function (amount) {
        this.pos.u = amount
    }

    desplazarJugadorEnY = function (amount) {
        //tocando el piso; puede saltar
        if (this.mundo.getBlockAt(int(this.pos.x + 0.5), int(this.pos.y) + 1).name != "Void") {
            this.pos.v = amount
        }
    }

    notPressed = function () {
        this.pos.u = 0
    }

    useFromInventory = function(index){
        this.inv_index = index % this.inventory.length
    }

    removeBlock = function () {
        const TIME_THRESHHOLD = 30
        if (this.tick - this.remove_TickCounter > TIME_THRESHHOLD) {
            let block = this.checkAdjacentBlocks(this.aim, this.pos.x, this.pos.y)
            block.Void()
            this.remove_TickCounter = this.tick
        }
    }
    addBlock = function () {
        const TIME_THRESHHOLD = 80
        if (this.tick - this.add_TickCounter > TIME_THRESHHOLD) {
            let block = this.checkAdjacentBlocks(this.aim, this.pos.x, this.pos.y)
            if (block.name == "Void") {
                for (let i = 0; i < 4; i++) {
                    if (this.checkAdjacentBlocks(1 + i * 2, block.x, block.y).name != "Void") {

                        switch(this.inventory[this.inv_index]){
                            case "Stone":
                                block.Stone()
                            break
                            case "Wood":
                                block.Wood()
                            break
                            case "Leaves":
                                block.Leaves()
                            break
                            case "Grass":
                                block.Grass()
                            break
                            case "Earth":
                                block.Earth()
                            break
                            case "Bush":
                                block.Bush()
                            break
                        }

                        break
                    }
                }
            }

            this.add_TickCounter = this.tick
        }
    }

    checkAdjacentBlocks = function (number, x, y) {
        let corners = []
        corners.push(this.mundo.getBlockAt(int(x + 0.5) + 0, int(y) + 0)) //// CENTRO
        corners.push(this.mundo.getBlockAt(int(x + 0.5) + 0, int(y) - 1)) //// ARRIBA
        corners.push(this.mundo.getBlockAt(int(x + 0.5) + 1, int(y) - 1)) //// ARRIBA Y ADELANTE
        corners.push(this.mundo.getBlockAt(int(x + 0.5) + 1, int(y) + 0)) //// ADELANTE
        corners.push(this.mundo.getBlockAt(int(x + 0.5) + 1, int(y) + 1)) //// ABAJO Y ADELANTE
        corners.push(this.mundo.getBlockAt(int(x + 0.5) + 0, int(y) + 1)) //// ABAJO
        corners.push(this.mundo.getBlockAt(int(x + 0.5) - 1, int(y) + 1)) //// ABAJO Y ATRAS
        corners.push(this.mundo.getBlockAt(int(x + 0.5) - 1, int(y) + 0)) //// ATRAS
        corners.push(this.mundo.getBlockAt(int(x + 0.5) - 1, int(y) - 1)) //// ARRIBA Y ATRAS
        return corners[number % corners.length]
    }

    moveCameraCloseToEdge = function (x, y, wid, hei, scale) {
        if (x > (wid - 6) * scale) {
            this.cam.moveXposition(0.2)
        }
        if (x < (6) * scale) {
            this.cam.moveXposition(-0.2)
        }
        if (y > (hei - hei / 6) * scale) {
            this.cam.moveYposition(abs(this.pos.v))
        }
        if (y < (hei / 6) * scale) {
            this.cam.moveYposition(-abs(this.pos.v))
        }
    }

    advanceTime = function (dt) {
        this.tick += dt
    }

    physics = function (dt, speed) {
        this.colision()
        this.cinematica((1 / dt) * speed)
    }

    cinematica = function (dt) {
        this.pos.v += this.pos.g * dt
        if (this.pos.v > 1) { this.pos.v = 1 }
        this.pos.y += this.pos.v * dt
        this.pos.x += this.pos.u * dt
    }

    colision = function () {
        this.colisionDetection(this.checkAdjacentBlocks(0, this.pos.x, this.pos.y), 0.8) //// CENTRO (OBJETIVO DE BLOQUEAR ARRIBA)
        this.colisionDetection(this.checkAdjacentBlocks(3, this.pos.x, this.pos.y), 0.8) //// ADELANTE
        this.colisionDetection(this.checkAdjacentBlocks(5, this.pos.x, this.pos.y), 0.8) //// ABAJO
        this.colisionDetection(this.checkAdjacentBlocks(7, this.pos.x, this.pos.y), 0.8) //// ATRAS
    }

    colisionDetection = function (other, len) {
        if (other.name != "Void") {
            let dx = this.pos.x - other.x
            let dy = this.pos.y - other.y


            if (abs(dx) < len && abs(dy) < len) {
                if (abs(dx) > abs(dy)) {
                    if (dx > 0) {
                        this.pos.x += (len - dx) + 0.01
                        this.pos.u = (len - dx) * 0.1
                    }
                    if (dx < 0) {
                        this.pos.x += (-len - dx) - 0.01
                        this.pos.u = (-len - dx) * 0.1
                    }
                } else {
                    if (dy > 0) {
                        this.pos.y += (len - dy) + 0.01
                        this.pos.v = (len - dy) * 0.1
                    }
                    if (dy < 0) {
                        this.pos.y += (-len - dy) - 0.01
                        this.pos.v = (-len - dy) * 0.1
                    }
                }
            }
        }
    }


    aimClockwise = function () {
        this.aim += 1
        if (this.aim == 0) {
            this.aim = 1
        }
        if (this.aim == 9) {
            this.aim = 1
        }
    }
    aimCounterClockwise = function () {
        this.aim -= 1
        if (this.aim == 0) {
            this.aim = 8
        }
        if (this.aim == 9) {
            this.aim = 1
        }
    }
    aimWithScroll = function (amount) {
        this.aim += amount
        this.aim %= 9
        if (this.aim < 0) {
            this.aim += 9
        }
        if (this.aim == 0)
            if (amount < 0) {
                this.aim = 8
            }
            else {
                this.aim = 1
            }
    }
}