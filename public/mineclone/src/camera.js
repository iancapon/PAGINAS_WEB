const Camera = function (player, mundo, x, y, cameraProperties) {

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

    this.barrasNegras = function (new_wid, new_hei) {
        fill(110)
        rect(0, (new_hei - 2) * this.scale, (new_wid - 1) * this.scale + 1, this.scale + 1)
        rect((new_wid - 2) * this.scale, 0, this.scale + 1, (new_hei - 1) * this.scale + 1)
    }
    this.render = function () {
        let new_wid = this.wid + 2 //HORRIBLE PERO YA FUE
        let new_hei = this.hei + 2
        let dx = -this.scale
        let dy = -this.scale
        noStroke()
        for (let i = int(this.position.x) - new_wid / 2; i < int(this.position.x) + new_wid / 2; i++) {
            for (let j = int(this.position.y) - new_hei / 2; j < int(this.position.y) + new_hei / 2; j++) {
                let bp = this.worldCoordenateToCameraPosition(i, j, new_wid, new_hei)
                let block = this.mundo.getBlockAt(i, j)
                fill(block.r, block.g, block.b, 255)
                rect(bp.x + this.pixelShift.x * this.scale + dx, bp.y + this.pixelShift.y * this.scale + dy, this.scale + 1, this.scale + 1)
            }
        }
        //this.barrasNegras(new_wid, new_hei)
    }

    this.drawPlayer = function () {
        let player_on_position = this.worldCoordenateToCameraPosition(this.player.pos.x, this.player.pos.y)

        fill(0)
        rect(player_on_position.x, player_on_position.y, this.scale * 0.8, this.scale * 0.8)
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
        textSize(35)
        fill(255)
        text("Inventory..", (this.wid + 1) * this.scale, 1.5 * 40)
        textSize(15)
        this.player.inventory.forEach((value, index) => {
            fill(200)
            if (index == this.player.inv_index) {
                fill(255)
            }
            text(String(index + 1) + ". " + value, (this.wid * 6 / 7 + 1) * this.scale, (index + 3) * 20)
        })
    }

    this.record = function () {
        this.render()

        this.drawPlayer()

        this.drawSelected()

        this.drawInventory()
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