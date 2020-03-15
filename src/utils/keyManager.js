function getKey(event) {
    switch(event.keyCode) {
        case 32:
            return 'SPACE'
            break
        case 37:
            return 'LEFT'
            break;
        case 38:
            return 'UP'
            break
        case 39:
            return 'RIGHT'
            break
        case 40:
            return 'DOWN'
            break
        default:
            // Convert ASCII codes to letters
            return String.fromCharCode(event.keyCode)
    }
}

const KeyManager = () => {
    let pressedKeys = {}

    document.addEventListener('keydown', function(event) {
        const key = getKey(event)
        pressedKeys[key] = true
    })
    
    document.addEventListener('keyup', function(event) {
        const key = getKey(event)
        pressedKeys[key] = false
    })
    
    window.addEventListener('blur', function() {
        pressedKeys = {}
    })

    return {
        isDown: key => !!pressedKeys[key.toUpperCase()]
    }
}

export default KeyManager