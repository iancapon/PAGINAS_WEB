const spriteScrollingDown = function (x, y, sprite) {
    this.x = x
    this.y = y
    this.sprite = sprite
    this.moveDown = function (rate, threshhold, correction, respawnx, respawny) {
        this.y += rate
        if (this.y > threshhold) {
            this.y = -correction
            if (respawnx != undefined) {
                this.x = Math.random() * respawnx
            }
            if (respawny != undefined) {
                this.y -= respawny
            }
        }
    }
    this.render = function () {
        _p5.image(this.sprite, this.x, this.y)
    }
}