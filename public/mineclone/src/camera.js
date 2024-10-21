const Camera = function (player, mundo, x, y, cameraProperties, graphicAssets) {

    this.player = player
    this.mundo = mundo
    this.position = {
        x: x,
        y: y
    }
    this.pixelShift = {
        x: 0,
        y: 0
    }

    this.wid = cameraProperties.wid
    this.hei = cameraProperties.hei
    this.scale = cameraProperties.scale

    this.assets = graphicAssets

    this.renderImagesForCubes = function () {
        let new_wid = this.wid + 2 //HORRIBLE PERO YA FUE
        let new_hei = this.hei + 2
        let dx = -this.scale
        let dy = -this.scale
        noStroke()
        for (let i = int(this.position.x) - new_wid / 2; i < int(this.position.x) + new_wid / 2; i++) {
            for (let j = int(this.position.y) - new_hei / 2; j < int(this.position.y) + new_hei / 2; j++) {
                let bp = this.worldCoordenateToCameraPosition(i, j, new_wid, new_hei)
                let block = this.mundo.getBlockAt(i, j)

                let img = this.assets.files.find((value) => value.es(block.name))
                image(img.img, bp.x + this.pixelShift.x * this.scale + dx, bp.y + this.pixelShift.y * this.scale + dy, this.assets.res, this.assets.res)
            }
        }
    }

    this.drawPlayer = function () {
        let player_on_position = this.worldCoordenateToCameraPosition(this.player.pos.x, this.player.pos.y)
        let img = this.assets.files.find((value) => value.es("Face"))
        image(img.img, player_on_position.x, player_on_position.y - 2, this.assets.res, this.assets.res)
        return player_on_position
    }

    this.drawSelected = function () {
        let block_selected = this.player.checkAdjacentBlocks(this.player.aim, this.player.pos.x, this.player.pos.y)
        let block_selected_coord = this.worldCoordenateToCameraPosition(block_selected.x, block_selected.y)
        noFill()
        stroke(200, 0, 0)
        rect(block_selected_coord.x, block_selected_coord.y, this.scale)
        noStroke()
    }

    this.drawInventory = function () {
        this.player.inventory.drawInventory(800,10)
    }
    this.drawEntities = function () {
        this.mundo.entities.forEach(entity => {
            let ep = this.worldCoordenateToCameraPosition(entity.pos.x, entity.pos.y)
            //fill(0, 0, 255)
            //circle(ep.x + 0.5 * this.scale, ep.y + 0.5 * this.scale, 10)
            image(this.assets.files.find((value) => value.es(entity.type.name)).img, ep.x, ep.y, this.scale / 2, this.scale / 2)
            //console.log("x: " + entity.pos.x + " y: " + entity.pos.y)
        })
    }

    this.record = function () {
        this.renderImagesForCubes()
        this.drawSelected()
        this.drawInventory()
        this.drawEntities()
        return this.drawPlayer()
    }

    this.worldCoordenateToCameraPosition = function (x, y, wid, hei, scale) {
        let new_wid = (wid == undefined) ? this.wid : wid
        let new_hei = (hei == undefined) ? this.hei : hei
        let new_scale = (scale == undefined) ? this.scale : scale
        try {
            let cx = map(x, (this.position.x) - new_wid / 2, (this.position.x) + new_wid / 2, 0, new_wid * new_scale)
            let cy = map(y, (this.position.y) - new_hei / 2, (this.position.y) + new_hei / 2, 0, new_hei * new_scale)
            return { x: cx, y: cy }
        }
        catch {
            return { x: null, y: null }
        }
    }

    this.movePositionByAmount = function (x, y) {
        this.position.x += x
        this.pixelShift.x = abs(this.position.x - int(this.position.x)) * x
        this.position.y += y
        this.pixelShift.y = abs(this.position.y - int(this.position.y)) * y
    }

    this.setPosition = function (x, y) {
        this.position.x = x
        this.position.y = y
        this.pixelShift.x = -abs(this.position.x - int(this.position.x))
        this.pixelShift.y = -abs(this.position.y - int(this.position.y))
    }
}