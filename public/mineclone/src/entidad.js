const Entidad = function (mundo, x, y) {
    this.mundo = mundo
    this.pos = {
        x: x,
        y: y,
        u: 0,
        v: 0,
        g: 0.01
    }

    this.physics = function (dt, speed) {
        this.colision()
        this.cinematica((1 / dt) * speed)
    }

    this.cinematica = function (dt) {
        this.pos.v += this.pos.g * dt
        if (this.pos.v > 1) { this.pos.v = 1 }
        this.pos.y += this.pos.v * dt
        this.pos.x += this.pos.u * dt
    }

    this.colision = function () {
        this.colisionDetection(this.checkAdjacentBlocks("centro", this.pos.x, this.pos.y), 0.8)
        this.colisionDetection(this.checkAdjacentBlocks("adelante", this.pos.x, this.pos.y), 0.8)
        this.colisionDetection(this.checkAdjacentBlocks("abajo", this.pos.x, this.pos.y), 0.8)
        this.colisionDetection(this.checkAdjacentBlocks("atras", this.pos.x, this.pos.y), 0.8)
    }

    this.colisionDetection = function (other, len) {
        const nonColliding = ["Void", "Bush", "BlueberryBush", "Undefined", "Bindweed"]
        
        if (!nonColliding.find(type => other.es(type))) {
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

    this.checkAdjacentBlocks = function (position, x, y) {
        const corners = [
            { value: this.mundo.getBlockAt(int(x + 0.5) + 0, int(y) + 0), es: (p) => position === "centro" || position === 0 },
            { value: this.mundo.getBlockAt(int(x + 0.5) + 0, int(y) - 1), es: (p) => position === "arriba" || position === 1 },
            { value: this.mundo.getBlockAt(int(x + 0.5) + 1, int(y) - 1), es: (p) => position === "arriba y adelante" || position === 2 },
            { value: this.mundo.getBlockAt(int(x + 0.5) + 1, int(y) + 0), es: (p) => position === "adelante" || position === 3 },
            { value: this.mundo.getBlockAt(int(x + 0.5) + 1, int(y) + 1), es: (p) => position === "abajo y adelante" || position === 4 },
            { value: this.mundo.getBlockAt(int(x + 0.5) + 0, int(y) + 1), es: (p) => position === "abajo" || position === 5 },
            { value: this.mundo.getBlockAt(int(x + 0.5) - 1, int(y) + 1), es: (p) => position === "abajo y atras" || position === 6 },
            { value: this.mundo.getBlockAt(int(x + 0.5) - 1, int(y) + 0), es: (p) => position === "atras" || position === 7 },
            { value: this.mundo.getBlockAt(int(x + 0.5) - 1, int(y) - 1), es: (p) => position === "arriba y atras" || position === 8 },
        ]
        return corners.find(esquina => esquina.es(position)).value
    }

}