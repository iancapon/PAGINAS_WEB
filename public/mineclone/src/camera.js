class Camera {
    constructor(player, mundo, x, y) {
        this.player = player
        this.mundo = mundo
        this.camera = {
            x: x,
            y: y
        }
        this.desf = {
            x: 0,
            y: 0
        }
    }
    render = function (wid, hei, scale) {
        wid = wid + 2 //HORRIBLE PERO YA FUE
        hei = hei + 2
        let dx = -scale
        let dy = -scale
        noStroke()
        for (let i = int(this.camera.x) - wid / 2; i < int(this.camera.x) + wid / 2; i++) {
            for (let j = int(this.camera.y) - hei / 2; j < int(this.camera.y) + hei / 2; j++) {
                let x = map(i, int(this.camera.x) - wid / 2, int(this.camera.x) + wid / 2, 0, wid * scale)
                let y = map(j, int(this.camera.y) - hei / 2, int(this.camera.y) + hei / 2, 0, hei * scale)

                let block = this.mundo.getBlockAt(i, j)
                fill(block.r, block.g, block.b, 255)
                rect(x + this.desf.x * scale + dx, y + this.desf.y * scale + dy, scale, scale + 1)
            }
        }

        fill(110)
        rect(0, (hei - 2) * scale, (wid - 1) * scale, scale)
        rect((wid - 2) * scale, 0, scale, (hei - 1) * scale)
    }
    record = function (wid, hei, scale) {
        this.render(wid, hei, scale)

        let player_on_camera = this.worldCoordenateToCameraPosition(this.player.pos.x, this.player.pos.y, wid, hei, scale)

        fill(0)
        rect(player_on_camera.x + 3, player_on_camera.y - 3, scale * 0.7, scale)

        let block_selected = this.player.checkAdjacentBlocks(this.player.aim, this.player.pos.x, this.player.pos.y)
        let block_selected_coord = this.worldCoordenateToCameraPosition(block_selected.x, block_selected.y, wid, hei, scale)

        noFill()
        stroke(200, 0, 0)
        rect(block_selected_coord.x, block_selected_coord.y, scale)
        noStroke()

        textSize(35)
        fill(255)
        text("Inventory.." , (wid+1) * scale, 1.5 * 40)
        textSize(30)
        this.player.inventory.forEach((value,index) => {
            fill(200)
            if(index==this.player.inv_index){
                fill(255)
            }
            text(String(index+1) +". "+value , (wid+1) * scale, (index+3) * 40)
        })



    }


    worldCoordenateToCameraPosition = function (x, y, wid, hei, scale) {
        let cx = map(x, (this.camera.x) - wid / 2, (this.camera.x) + wid / 2, 0, wid * scale)
        let cy = map(y, (this.camera.y) - hei / 2, (this.camera.y) + hei / 2, 0, hei * scale)
        return { x: cx, y: cy }
    }

    moveXposition = function (amount) {
        this.camera.x += (amount)
        this.desf.x = -abs(this.camera.x - int(this.camera.x))
    }

    moveYposition = function (amount) {
        this.camera.y += amount
        this.desf.y = -abs(this.camera.y - int(this.camera.y))
    }
}