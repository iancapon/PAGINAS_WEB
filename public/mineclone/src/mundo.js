const Mundo = function (chunkWid, hei, chunkN, seed) {
    this.seed=seed
    this.chunks = []
    for (let i = 0; i < chunkN; i++) {
        this.chunks.push(new Chunk(chunkWid, hei, chunkWid * i, 0, seed))
    }


    this.getMap = function () {
        let i = 0
        this.chunks.forEach(chunck => {
            chunck.getMapOfChunk()
            image(chunck.getMapOfChunk(), i * chunkWid, 0)
            i++
        })
    }
    this.generateWorld = function () {
        this.chunks.forEach(chunck => chunck.generateChunk())
    }
    this.getBlockAt = function (x, y) {
        let block = new Block()
        if (x < 0 || y < 0 || y >= hei) {
            return block
        }
        if (x >= chunkWid * chunkN) {
            return block
        }

        let chunkIndex = int(x / chunkWid)
        let xAtChunk = x % chunkWid 

        block = this.chunks[chunkIndex].blocks[xAtChunk + y * chunkWid]// ME CHUPA LA PIJA EL ENCAPSULAMIENTO
        return block
    }

    this.setBlockAt = function (block) {
        let x = block.x
        let y = block.y
        if (x < 0 || y < 0 || y >= hei) {
            return
        }
        if (x >= chunkWid * chunkN) {
            return
        }
        let chunkIndex = int(x / chunkWid)
        let xAtChunk = x - chunkWid * chunkIndex

        this.chunks[chunkIndex].blocks[xAtChunk + y * chunkWid] = block// ME CHUPA LA PIJA EL ENCAPSULAMIENTO
    }
}
