
const Block = function (x, y) {
    this.x = x
    this.y = y
    this.r = 255
    this.g = 0
    this.b = 0
    this.name = "Undefined"

    this.properties = () => ({ Name: this.name, X: this.x, Y: this.y })
    this.es = () => true ///// Bloque vacio o error
}
const Void = function (x, y) {
    Block.call(this, x, y)
    this.r = 158
    this.g = 251
    this.b = 255
    this.name = "Void"
    this.es = (name) => this.name == name
}
Void.prototype = Object.create(Block.prototype)
Void.prototype.constructor = Void

const Wood = function (x, y) {
    Block.call(this, x, y)
    this.r = 120
    this.g = 80
    this.b = 40
    this.name = "Wood"
    this.es = (name) => this.name == name
}
Wood.prototype = Object.create(Block.prototype)
Wood.prototype.constructor = Wood

const Leaves = function (x, y) {
    Block.call(this, x, y)
    this.r = 0
    this.g = 200
    this.b = 100
    this.name = "Leaves"
    this.es = (name) => this.name == name
}
Leaves.prototype = Object.create(Block.prototype)
Leaves.prototype.constructor = Leaves

const Bush = function (x, y) {
    Block.call(this, x, y)
    this.r = 255
    this.g = 100
    this.b = 100
    this.name = "Bush"
    this.es = (name) => this.name == name
}
Bush.prototype = Object.create(Block.prototype)
Bush.prototype.constructor = Bush

const Grass = function (x, y) {
    Block.call(this, x, y)
    this.r = 144
    this.g = 180
    this.b = 51
    this.name = "Grass"
    this.es = (name) => this.name == name
}
Grass.prototype = Object.create(Block.prototype)
Grass.prototype.constructor = Grass

const Earth = function (x, y) {
    Block.call(this, x, y)
    this.r = 134
    this.g = 91
    this.b = 53
    this.name = "Earth"
    this.es = (name) => this.name == name
}
Earth.prototype = Object.create(Block.prototype)
Earth.prototype.constructor = Earth

const Stone = function (x, y) {
    Block.call(this, x, y)
    this.r = 78
    this.g = 78
    this.b = 78
    this.name = "Stone"
    this.es = (name) => this.name == name
}
Stone.prototype = Object.create(Block.prototype)
Stone.prototype.constructor = Stone

