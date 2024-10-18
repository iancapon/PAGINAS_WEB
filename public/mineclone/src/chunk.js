const Chunk = function (wid, hei, topx, topy) {
    this.wid = wid
    this.hei = hei
    this.blocks = new Array(wid * hei)
    this.position = {
        x: topx,
        y: topy
    }

    this.generateChunk = function () {
        for (let y = 0; y < this.hei; y++) {
            for (let x = 0; x < this.wid; x++) {
                if (this.blocks[x + y * this.wid] == undefined) {
                    this.blocks[x + y * this.wid] = new Void(x + this.position.x, y)
                }
            }
        }
        const groundScale = 0.05
        for (let x = 0; x < this.wid; x++) {

            const grassLevel = int(perlinNoise(this.hei / 5, this.hei / 4, x + this.position.x, groundScale, 0, 1))
            for (let y = grassLevel; y < this.hei; y++) {
                this.blocks[x + y * this.wid] = new Grass(x, y)
            }

            const earthLevel = int(perlinNoise(this.hei / 5, this.hei / 3, x + this.position.x, groundScale, 0.5, 1))
            for (let y = earthLevel; y < this.hei; y++) {
                this.blocks[x + y * this.wid] = new Earth(x, y)
            }

            const rockLevel = int(perlinNoise(this.hei / 5, this.hei / 2, x + this.position.x, groundScale, 20, 1))
            for (let y = rockLevel; y < this.hei; y++) {
                this.blocks[x + y * this.wid] = new Stone(x, y)
            }

            const treePops = perlinNoise(1, 0, x + this.position.x, 1, 1, 1)
            const treeThreshold = 0.7
            if (treePops > treeThreshold && x > 0 && x < this.wid - 1) {
                this.blocks[x + (grassLevel - 1) * this.wid] = new Wood(x, (grassLevel - 1))
                this.blocks[x + (grassLevel - 2) * this.wid] = new Wood(x, (grassLevel - 2))
                this.blocks[x + (grassLevel - 3) * this.wid] = new Wood(x, (grassLevel - 3))
                this.blocks[x + (grassLevel - 4) * this.wid] = new Wood(x, (grassLevel - 4))
                this.blocks[x + (grassLevel - 5) * this.wid] = new Leaves(x, (grassLevel - 5))
                this.blocks[x - 1 + (grassLevel - 5) * this.wid] = new Leaves(x - 1, (grassLevel - 5))
                this.blocks[x + 1 + (grassLevel - 5) * this.wid] = new Leaves(x + 1, (grassLevel - 5))
                this.blocks[x + (grassLevel - 6) * this.wid] = new Leaves(x, (grassLevel - 6))
            }

            const bushPops = perlinNoise(1, 0, x + this.position.x, 5, 30, 1)
            const bushThrehold = 0.5
            if (bushPops > bushThrehold) {
                if (this.blocks[x + (grassLevel - 1) * this.wid].name == "Void")
                    this.blocks[x + (grassLevel - 1) * this.wid] = new Bush(x, (grassLevel - 1))
            }
        }


    }

    this.getMapOfChunk = function () {
        let img = createImage(this.wid, this.hei)
        img.loadPixels();
        for (let i = 0; i < this.blocks.length; i += 1) {
            img.pixels[i * 4 + 0] = this.blocks[i].r
            img.pixels[i * 4 + 1] = this.blocks[i].g
            img.pixels[i * 4 + 2] = this.blocks[i].b
            img.pixels[i * 4 + 3] = 255
        }
        img.updatePixels()
        return img
    }
}
