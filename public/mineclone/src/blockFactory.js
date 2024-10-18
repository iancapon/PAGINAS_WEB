const blockFactory = function (type, x, y) {
    const bloquesDisponibles = [
        new Void(x, y),
        new Wood(x, y),
        new Leaves(x, y),
        new Stone(x, y),
        new Grass(x, y),
        new Earth(x, y),
        new Bush(x, y),
        new Block(x, y)// CONTINGENCIA
    ]
    const bloque = bloquesDisponibles.find(tipo => tipo.es(type))
    return bloque
}