const floatingEntity = function(mundo,type,age){
    Entidad.call(this,mundo,type.x,type.y)
    this.type=type
    this.age=age

    this.getCaught = function(player,threshold){
        if(  Math.sqrt(Math.pow(this.pos.x - player.x,2) + Math.pow(this.pos.y - player.y,2)) < threshold){
            return true
        }
        return false
    }
}
floatingEntity.prototype=Object.create(Entidad.prototype)
floatingEntity.prototype.constructor=floatingEntity