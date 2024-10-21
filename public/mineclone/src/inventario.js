const inventario = function () {
    this.lista = []
    this.inv_index = 0

    this.addToInventory = function (type) {
        let index = this.lista.findIndex((entity) => entity.type === type)
        if (index >= 0) {
            this.lista[index].ammount += 1
        } else {
            this.lista.push({ type: type, ammount: 1 })
        }
    }
    this.removeFromInventory = function () {
        if (this.inv_index > this.lista.length - 1) {
            this.inv_index = this.lista.length - 1
        }
        if (this.inv_index < 0) {
            this.inv_index = 0
        }
        if (this.lista.length > 0) {
            if (this.lista[this.inv_index].ammount <= 1) {
                const type = this.lista[this.inv_index].type
                this.lista.splice(this.inv_index, 1)//].ammount -= 1
                this.scrollInventory(-1)
                return type
            }
            if (this.lista[this.inv_index].ammount > 1) {
                this.lista[this.inv_index].ammount -= 1
                return this.lista[this.inv_index].type
            }
        }
        else {
            this.inv_index = 0
        }
        return null
    }

    this.drawInventory = function (x, y) {
        fill(100,150)
        rect(x-5, 35 + y, 150, (this.lista.length ) * 15, 10)

        strokeWeight(2)
        textSize(10)
        textStyle(BOLD)

        this.lista.forEach((value, index) => {
            fill(200)
            if (index == this.inv_index) {
                fill(255)
            }
            text(String(index + 1) + ". " + value.type + " x " + value.ammount, x, (index + 3) * 15 + y)
        })
    }

    this.scrollInventory = function (amount) {
        this.inv_index += amount
        //this.inv_index %= this.lista.length
        if (this.inv_index > this.lista.length - 1) {
            this.inv_index = this.lista.length - 1
        }
        if (this.inv_index < 0) {
            this.inv_index = 0
        }

    }
}