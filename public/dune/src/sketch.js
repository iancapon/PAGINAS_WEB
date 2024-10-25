const _p5 = new p5((p) => { })
const key_detect = new keyEventHandler(["w", "a", "s", "d", "W", "A", "S", "D", " "])
const HORIZONTAL_SPEED = 1.5
const WIDTH = 600
const HEIGHT = 600
const SCALE = 4
const sand_dunes = [
    new spriteScrollingDown(Math.random() * WIDTH / SCALE, Math.random() * HEIGHT / SCALE),
    new spriteScrollingDown(Math.random() * WIDTH / SCALE, Math.random() * HEIGHT / SCALE),
    new spriteScrollingDown(Math.random() * WIDTH / SCALE, Math.random() * HEIGHT / SCALE),
    new spriteScrollingDown(Math.random() * WIDTH / SCALE, Math.random() * HEIGHT / SCALE),
]
const fondo = [
    new spriteScrollingDown(WIDTH / (SCALE * 2), 0),
    new spriteScrollingDown(WIDTH / (SCALE * 2), WIDTH / SCALE),
]
const worm = {
    x: WIDTH / (SCALE * 2),
    y: WIDTH / SCALE - 20,
    u: 0,
    v: 0,
    sprite: undefined,
    physics: function (dt) {
        this.x += this.u * dt
        this.y += this.v * dt
    },
    render: function () {
        _p5.image(this.sprite, this.x, this.y)
    }
}

let sand_dune_asset = undefined

_p5.setup = function () {
    _p5.createCanvas(WIDTH, HEIGHT)
    _p5.imageMode(_p5.CENTER)
    sand_dune_asset = _p5.loadImage("assets/sand_dune_top.png")
    worm.sprite = _p5.loadImage("assets/sand_worm.png")
    sand_dunes.forEach(dune => dune.sprite = _p5.loadImage("assets/sand_dune.png"))
    fondo.forEach(desert => desert.sprite = _p5.loadImage("assets/desert.png"))

}
_p5.draw = function () {
    _p5.scale(SCALE)
    //_p5.background(	194, 178, 128)
    fondo.forEach(desert => {
        desert.moveDown(0.7, WIDTH / SCALE + WIDTH / (SCALE * 2), WIDTH / (SCALE * 2))
        desert.render()
    })

    sand_dunes.forEach(dune => {
        dune.moveDown(0.7, 30 + WIDTH / SCALE, 15, WIDTH / SCALE, 20)
        dune.render()
    })

    worm.physics(1)
    worm.render()

    sand_dunes.forEach(dune => {
        _p5.image(sand_dune_asset, dune.x, dune.y)
    })

    if (worm.y > WIDTH / SCALE - 20) {
        worm.y = WIDTH / SCALE - 20
    }
    handleKeyStrokes()
}

const handleKeyStrokes = function () {
    worm.v = 0.2
    if (key_detect.keyIsPressed("w") || key_detect.keyIsPressed("W")) {
        worm.v = -HORIZONTAL_SPEED / 2
    }
    if (key_detect.keyIsPressed("s") || key_detect.keyIsPressed("S")) {
        worm.v = HORIZONTAL_SPEED / 2
    }

    worm.u = 0
    if (key_detect.keyIsPressed("a") || key_detect.keyIsPressed("A")) {
        worm.u = -HORIZONTAL_SPEED
    }
    if (key_detect.keyIsPressed("d") || key_detect.keyIsPressed("D")) {
        worm.u = HORIZONTAL_SPEED
    }
}



