const blockList = function () {
    const bloquesDisponibles = [
        new Void(),
        new Log(),
        new WhiteLog(),
        new WoodBlock(),
        new Leaves(),
        new DarkLeaves(),
        new Stone(),
        new Grass(),
        new Earth(),
        new Bush(),
        new BlueberryBush(),
        new Bindweed(),
        new Block()
    ]
    this.listaDeBloques = function(){
        return bloquesDisponibles
    }
    this.blockFactory = function (type, x, y) {
        const bloque = Object.create(bloquesDisponibles.find(tipo => tipo.es(type)))
        bloque.x = x
        bloque.y = y
        return bloque
    }
}
