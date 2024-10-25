const keyEventHandler = function (keysToDetect) {
    const valid_keys = keysToDetect.map(param => ({ key: param, value: false }))
    document.addEventListener("keydown", event => {
        const key_pressed = valid_keys.find(k => k.key === event.key)
        if (key_pressed != undefined)
            key_pressed.value = true
    })
    document.addEventListener("keyup", event => {
        const key_pressed = valid_keys.find(k => k.key === event.key)
        if (key_pressed != undefined)
            key_pressed.value = false
    })
    this.keyIsPressed=function(param){
        const key_pressed = valid_keys.find(k => k.key === param)
        if (key_pressed != undefined){
            return key_pressed.value
        }
        return false
    }
}