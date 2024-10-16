class Mundo {
    constructor() {
        this.chunks = []
        this.chunks.push(new Chunk(256, 128, 256 * 0, 0))
        this.chunks.push(new Chunk(256, 128, 256 * 1, 0))
        this.chunks.push(new Chunk(256, 128, 256 * 2, 0))
    }
    getMap = function () {
        let i = 0
        this.chunks.forEach(chunck => {
            chunck.getMapOfChunk()
            image(chunck.getMapOfChunk(), i * 256, 0)
            i++
        })
    }
    generateWorld = function () {
        this.chunks.forEach(chunck => chunck.generateChunk())
    }
    getBlockAt = function (x, y) {
        let block = new Block()
        if (x < 0 || y < 0 || y >= 128) {
            return block
        }
        if (x >= 256 * this.chunks.length) {
            return block
        }

        let chunkIndex = int(x / 256)
        let xAtChunk = x - 256 * chunkIndex

        block = this.chunks[chunkIndex].blocks[xAtChunk + y * 256]// ME CHUPA LA PIJA EL ENCAPSULAMIENTO
        return block
    }
}

class Chunk {
    constructor(wid, hei, topx, topy) {
        this.wid = wid
        this.hei = hei
        this.blocks = new Array(wid * hei)
        this.position = {
            x: topx,
            y: topy
        }
    }

    generateChunk = function () {
        for (let y = 0; y < this.hei; y++) {
            for (let x = 0; x < this.wid; x++) {
                if (this.blocks[x + y * this.wid] == undefined) {
                    this.blocks[x + y * this.wid] = new Block(x + this.position.x, y)
                }
            }
        }
        const groundScale = 0.05
        for (let x = 0; x < this.wid; x++) {
            let grassLevel = int(noise((x + this.position.x) * groundScale, 0) * this.hei / 5 + this.hei / 4)
            let earthLevel = int(noise((x + this.position.x) * groundScale, 0.5) * this.hei / 5 + this.hei / 3)
            let rockLevel = int(noise((x + this.position.x) * groundScale, 20) * this.hei / 5 + this.hei / 2)

            let treePops = noise((x + this.position.x) * 3, 10)
            let bushPops = noise((x + this.position.x) * 3, 30)


            for (let y = grassLevel; y < this.hei; y++) {
                this.blocks[x + y * this.wid].Grass()
            }
            for (let y = earthLevel; y < this.hei; y++) {
                this.blocks[x + y * this.wid].Earth()
            }
            for (let y = rockLevel; y < this.hei; y++) {
                this.blocks[x + y * this.wid].Stone()
            }

            if (treePops > 0.7 && x > 0 && x < 255) {
                this.blocks[x + (grassLevel - 1) * this.wid].Wood()
                this.blocks[x + (grassLevel - 2) * this.wid].Wood()
                this.blocks[x + (grassLevel - 3) * this.wid].Wood()
                this.blocks[x + (grassLevel - 4) * this.wid].Wood()
                this.blocks[x + (grassLevel - 5) * this.wid].Leaves()
                this.blocks[x - 1 + (grassLevel - 5) * this.wid].Leaves()
                this.blocks[x + 1 + (grassLevel - 5) * this.wid].Leaves()
                this.blocks[x + (grassLevel - 6) * this.wid].Leaves()
            }
            if (bushPops > 0.5) {
                if (this.blocks[x + (grassLevel - 1) * this.wid].name == "Void")
                    this.blocks[x + (grassLevel - 1) * this.wid].Bush()
            }
        }


    }

    getMapOfChunk = function () {
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

const Block = function (x, y) {

    this.r = 158
    this.g = 251
    this.b = 255
    this.name = "Void"
    this.x = x
    this.y = y

    this.Void = function () {
        this.r = 158
        this.g = 251
        this.b = 255
        this.name = "Void"
    }
    this.Wood = function () {
        this.r = 120
        this.g = 80
        this.b = 40
        this.name = "Wood"
    }
    this.Leaves = function () {
        this.r = 0
        this.g = 200
        this.b = 100
        this.name = "Leaves"
    }
    this.Bush = function () {
        this.r = 255
        this.g = 100
        this.b = 100
        this.name = "Void"
    }
    this.Grass = function () {
        this.r = 144
        this.g = 180
        this.b = 51
        this.name = "Grass"
    }
    this.Earth = function () {
        this.r = 134
        this.g = 91
        this.b = 53
        this.name = "Earth"
    }
    this.Stone = function () {
        this.r = 78
        this.g = 78
        this.b = 78
        this.name = "Stone"
    }
}
