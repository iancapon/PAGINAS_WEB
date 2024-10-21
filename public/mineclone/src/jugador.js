const Player = function (mundo, x, cameraProperties, gameAssets) {
    Entidad.call(this, mundo, x, 0)
    const bl = new blockList()
    this.inventory = new inventario()
    this.cam = new Camera(this, this.mundo, 0, 0, cameraProperties, gameAssets)
    this.aim = 3
    this.tick = 0
    this.remove_TickCounter = this.tick
    this.add_TickCounter = this.tick

    this.addToInventory = function (type) {
        this.inventory.addToInventory(type)
    }

    this.scrollInventory = function (index) {
        this.inventory.scrollInventory(index)
    }

    this.checkValidBlockPlacement = function () {
        let block = this.checkAdjacentBlocks(this.aim, this.pos.x, this.pos.y)
        if (block.name == "Void") {
            for (let i = 0; i < 4; i++) {
                if (this.checkAdjacentBlocks(1 + i * 2, block.x, block.y).name != "Void") {
                    return true
                }
            }
            return false
        }
        return false
    }

    this.changeBlock = function (type) {
        let block = this.checkAdjacentBlocks(this.aim, this.pos.x, this.pos.y)
        if (block.name != "Void") {
            this.mundo.entities.push(new floatingEntity(this.mundo, Object.create(block), this.tick))
        }
        block = bl.blockFactory(type, block.x, block.y)
        this.mundo.setBlockAt(block)
    }

    this.addBlock = function () {
        const TIME_THRESHHOLD = 80
        if (this.tick - this.add_TickCounter > TIME_THRESHHOLD) {
            if (this.checkValidBlockPlacement()) {
                const blockFromInventory = this.inventory.removeFromInventory()
                if (blockFromInventory != null) {
                    this.changeBlock(blockFromInventory)
                    this.add_TickCounter = this.tick
                }
            }
        }
    }

    this.removeBlock = function () {
        const TIME_THRESHHOLD = 0
        if (this.tick - this.remove_TickCounter > TIME_THRESHHOLD) {
            this.changeBlock("Void")
            this.remove_TickCounter = this.tick

        }
    }

    this.setSpawn = function () {
        for (let j = 0; j < 128; j++) {
            if ((this.mundo.getBlockAt(this.pos.x, j)).name != "Void") {
                this.pos.y = j - 1
                break
            }
        }
        this.cam.setPosition(this.pos.x, this.pos.y)
    }

    this.rec = function (wid, hei, scale) {
        this.cam.record(wid, hei, scale)
        let player_on_camera = this.cam.worldCoordenateToCameraPosition(this.pos.x, this.pos.y)
        this.moveCameraCloseToEdge(player_on_camera.x, player_on_camera.y, cameraProperties)
        return player_on_camera
    }

    this.desplazarJugadorEnX = function (amount) {
        this.pos.u = amount
    }

    this.desplazarJugadorEnY = function (amount) {
        const nonColliding = ["Void", "Bush", "BlueberryBush", "Undefined"]
        const block = this.mundo.getBlockAt(int(this.pos.x + 0.5), int(this.pos.y) + 1)
        //tocando el piso; puede saltar ////// en una entredadera puede trepar si no la defino en nonColliding aca; pero si en entidad
        if (!nonColliding.find(type => block.es(type))) {
            this.pos.v = amount
        }
    }

    this.notPressed = function () {
        this.pos.u = 0
    }

    this.moveCameraCloseToEdge = function (x, y, camprop) {
        if (x > (camprop.wid - 6) * camprop.scale) {
            this.cam.movePositionByAmount(0.2, 0)
        }
        if (x < (6) * camprop.scale) {
            this.cam.movePositionByAmount(-0.2, 0)
        }
        if (y > (camprop.hei - camprop.hei / 6) * camprop.scale) {
            this.cam.movePositionByAmount(0, abs(this.pos.v))
        }
        if (y < (camprop.hei / 6) * camprop.scale) {
            this.cam.movePositionByAmount(0, -abs(this.pos.v))
        }
    }

    this.advanceTime = function (dt) {
        this.tick += dt
    }
}
Player.prototype = Object.create(Entidad.prototype)
Player.prototype.constructor = Player