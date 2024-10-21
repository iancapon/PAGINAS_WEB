
const Block = function (x, y) {
    this.x = x
    this.y = y
    this.name = "Undefined"
    this.es = () => true
    this.properties = () => ({ Name: this.name, X: this.x, Y: this.y })
}
const Void = function (x, y) {
    Block.call(this, x, y)
    this.name = "Void"
    this.es = (name) => this.name == name
}
Void.prototype = Object.create(Block.prototype)
Void.prototype.constructor = Void

const Log = function (x, y) {
    Block.call(this, x, y)
    this.name = "Log"
    this.es = (name) => this.name == name
}
Log.prototype = Object.create(Block.prototype)
Log.prototype.constructor = Log

const WhiteLog = function (x, y) {
    Block.call(this, x, y)
    this.name = "WhiteLog"
    this.es = (name) => this.name == name
}
WhiteLog.prototype = Object.create(Block.prototype)
WhiteLog.prototype.constructor = WhiteLog

const WoodBlock = function (x, y) {
    Block.call(this, x, y)
    this.name = "WoodBlock"
    this.es = (name) => this.name == name
}
WoodBlock.prototype = Object.create(Block.prototype)
WoodBlock.prototype.constructor = WoodBlock

const Leaves = function (x, y) {
    Block.call(this, x, y)
    this.name = "Leaves"
    this.es = (name) => this.name == name
}
Leaves.prototype = Object.create(Block.prototype)
Leaves.prototype.constructor = Leaves

const DarkLeaves = function (x, y) {
    Block.call(this, x, y)
    this.name = "DarkLeaves"
    this.es = (name) => this.name == name
}
DarkLeaves.prototype = Object.create(Block.prototype)
DarkLeaves.prototype.constructor = DarkLeaves

const Bush = function (x, y) {
    Block.call(this, x, y)
    this.name = "Bush"
    this.es = (name) => this.name == name
}
Bush.prototype = Object.create(Block.prototype)
Bush.prototype.constructor = Bush

const BlueberryBush = function (x, y) {
    Block.call(this, x, y)
    this.name = "BlueberryBush"
    this.es = (name) => this.name == name
}
BlueberryBush.prototype = Object.create(Block.prototype)
BlueberryBush.prototype.constructor = BlueberryBush

const Grass = function (x, y) {
    Block.call(this, x, y)
    this.name = "Grass"
    this.es = (name) => this.name == name
}
Grass.prototype = Object.create(Block.prototype)
Grass.prototype.constructor = Grass

const Earth = function (x, y) {
    Block.call(this, x, y)
    this.name = "Earth"
    this.es = (name) => this.name == name
}
Earth.prototype = Object.create(Block.prototype)
Earth.prototype.constructor = Earth

const Stone = function (x, y) {
    Block.call(this, x, y)
    this.name = "Stone"
    this.es = (name) => this.name == name
}
Stone.prototype = Object.create(Block.prototype)
Stone.prototype.constructor = Stone

const Bindweed = function (x, y) {
    Block.call(this, x, y)
    this.name = "Bindweed"
    this.es = (name) => this.name == name
}
Bindweed.prototype = Object.create(Block.prototype)
Bindweed.prototype.constructor = Bindweed
