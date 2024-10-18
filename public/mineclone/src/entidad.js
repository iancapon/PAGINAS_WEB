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
        this.colisionDetection(this.checkAdjacentBlocks(0, this.pos.x, this.pos.y), 0.8) //// CENTRO (OBJETIVO DE BLOQUEAR ARRIBA)
        this.colisionDetection(this.checkAdjacentBlocks(3, this.pos.x, this.pos.y), 0.8) //// ADELANTE
        this.colisionDetection(this.checkAdjacentBlocks(5, this.pos.x, this.pos.y), 0.8) //// ABAJO
        this.colisionDetection(this.checkAdjacentBlocks(7, this.pos.x, this.pos.y), 0.8) //// ATRAS
    }

    this.colisionDetection = function (other, len) {
        if (!other.es("Void") && !other.es("Bush")) {
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

    /*this.checkAdjacentBlocks = function (number, x, y) {
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
    }*/
}