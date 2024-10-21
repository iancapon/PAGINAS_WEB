const Chunk = function (wid, hei, topx, topy, seed) {
    this.wid = wid
    this.hei = hei
    this.blocks = new Array(wid * hei)
    this.seed = seed
    this.position = {
        x: topx,
        y: topy
    }

    this.generateChunk = function () {
        noiseSeed(this.seed)

        for (let y = 0; y < this.hei; y++) {
            for (let x = 0; x < this.wid; x++) {
                if (this.blocks[x + y * this.wid] == undefined) {
                    this.blocks[x + y * this.wid] = new Void(x + this.position.x, y + this.position.y)
                }
            }
        }
        const groundScale = 0.05
        for (let x = 0; x < this.wid; x++) {

            const grassLevel = int(perlinNoise(this.hei / 5, this.hei / 4, x + this.position.x, groundScale, 0, 1))
            const earthLevel = int(perlinNoise(this.hei / 5, this.hei / 3, x + this.position.x, groundScale, 0.5, 1))
            const rockLevel = int(perlinNoise(this.hei / 5, this.hei / 2, x + this.position.x, groundScale, 20, 1))

            this.new_verticalLayer(Grass, grassLevel, x)
            this.new_verticalLayer(Earth, earthLevel, x)
            this.new_verticalLayer(Stone, rockLevel, x)

            const treePops = perlinNoise(1, 0, x + this.position.x, 1, 1, 1)
            const treeThreshold = 0.7

            this.new_tree(treePops, treeThreshold, grassLevel, x, Log, Leaves)

            const dark_treePops = perlinNoise(1, 0, x + this.position.x, 1, 10, 1)
            const dark_treeThreshold = 0.7

            this.new_tree(dark_treePops, dark_treeThreshold, grassLevel, x, WhiteLog, DarkLeaves)

            const bushPops = perlinNoise(1, 0, x + this.position.x, 5, 30, 1)
            const bushThrehold = 0.5

            this.new_bush(bushPops, bushThrehold, grassLevel, x, Bush)

            const Blueberry_bushPops = perlinNoise(1, 0, x + this.position.x, 5, 60, 1)
            const Blueberry_bushThrehold = 0.5

            this.new_bush(Blueberry_bushPops, Blueberry_bushThrehold, grassLevel, x, BlueberryBush)

            const bindweed_Pops = perlinNoise(1, 0, x + this.position.x, 5, 90, 1)
            const bindwee_Threhold = 0.5

            this.new_bush(bindweed_Pops, bindwee_Threhold, grassLevel, x, Bindweed)
        }
    }

    this.new_verticalLayer = function (type, level, x) {
        for (let y = level; y < this.hei; y++) {
            this.blocks[x + y * this.wid] = new type(x + this.position.x, y + this.position.y)
        }
    }

    this.new_tree = function (treePops, treeThreshold, grassLevel, x, logType, leaveType) {
        if (treePops > treeThreshold && x > 0 && x < this.wid - 1) {
            this.blocks[x + (grassLevel - 1) * this.wid] = new logType(x + this.position.x, (grassLevel - 1) + this.position.y)
            this.blocks[x + (grassLevel - 2) * this.wid] = new logType(x + this.position.x, (grassLevel - 2) + this.position.y)
            this.blocks[x + (grassLevel - 3) * this.wid] = new logType(x + this.position.x, (grassLevel - 3) + this.position.y)
            this.blocks[x + (grassLevel - 4) * this.wid] = new logType(x + this.position.x, (grassLevel - 4) + this.position.y)
            this.blocks[x + (grassLevel - 5) * this.wid] = new leaveType(x + this.position.x, (grassLevel - 5) + this.position.y)
            this.blocks[x - 1 + (grassLevel - 5) * this.wid] = new leaveType(x - 1 + this.position.x, (grassLevel - 5) + this.position.y)
            this.blocks[x + 1 + (grassLevel - 5) * this.wid] = new leaveType(x + 1 + this.position.x, (grassLevel - 5) + this.position.y)
            this.blocks[x + (grassLevel - 6) * this.wid] = new leaveType(x + this.position.x, (grassLevel - 6) + this.position.y)
        }
    }

    this.new_bush = function (bushPops, bushThrehold, grassLevel, x, bushType) {
        if (bushPops > bushThrehold) {
            if (this.blocks[x + (grassLevel - 1) * this.wid].name == "Void")
                this.blocks[x + (grassLevel - 1) * this.wid] = new bushType(x + this.position.x, (grassLevel - 1) + this.position.y)
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
