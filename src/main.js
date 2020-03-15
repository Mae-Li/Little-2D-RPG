import ResourceManager from './utils/resourceManager.js'
import KeyManager from './utils/keyManager.js'

const keyManager = KeyManager()
const resourceManager = ResourceManager()

const SPRITE_WIDTH = 64;
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

function init({ width, height }) {
    // Get a reference to the div with id "app"
    const app = document.getElementById('app')
    // Create a canvas html element
    const canvas = document.createElement('canvas')
    // Setting the size of the canvas
    canvas.width = width
    canvas.height = height
    // Append the canvas element to the app div
    app.appendChild(canvas)

    const context = canvas.getContext('2d')

    // Initial state of the game
    const state = {
        grid: {
            width,
            height
        },
        player: {
            name: 'Mae-li',
            x: 0,
            y: 0,
            speed: 2,
            dir: 'S'
            // TODO: Add a property frame that vary between 0-8
        }
    }

    return {
        state,
        context
    }
}

// Update is responsible to updating the game state depending on the user inputs
function update(state) {
    let { x, y, speed } = state.player
    let { width, height } = state.grid


    // TODO: Increment the frame property of the player to display next frame of the animation
    console.log(x, y)

    if(keyManager.isDown('SPACE')) {

    }

    if(keyManager.isDown('UP')) {
        state.player.dir = 'N'
        if(y - 1 > 0) {
            state.player.y -= speed
        }
    }

    if(keyManager.isDown('DOWN')) {
        state.player.dir = 'S'
        if(y + 1 < height - SPRITE_WIDTH) {
            state.player.y += speed
        }
    }

    if(keyManager.isDown('LEFT')) {
        state.player.dir = 'W'
        if(x - 1 > 0) {
            state.player.x -= speed
        }
    }

    if(keyManager.isDown('RIGHT')) {
        state.player.dir = 'E'
        if(x + 1 < width - SPRITE_WIDTH) {
            state.player.x += speed
        }
    }

    const newState = {
        ...state
    }
    return newState
}

// Render is responsible of displaying elements on the canvas context
function render(state, context) {
    context.clearRect(0, 0, state.grid.width, state.grid.height)

    const { dir, x, y } = state.player

    // Position and size of the sprite to retrieve from the image
    let sx = 0
    let sy = 0
    let sWidth = SPRITE_WIDTH
    let sHeight = SPRITE_WIDTH
    // Position and size of the sprite inside de canvas
    let dx = x
    let dy = y
    let dWidth = SPRITE_WIDTH
    let dHeight = SPRITE_WIDTH

    // TODO: Set value of sx by getting the value of the frame property in player object ( sx = sx + frameNumber )
    switch(dir) {
        case 'N':
            sy = 8 * SPRITE_WIDTH
            break;
        case 'E':
            sy = 7 * SPRITE_WIDTH
            break;
        case 'S':
            sy = 10 * SPRITE_WIDTH
            break;
        case 'W':
            sy = 9 * SPRITE_WIDTH
            break;
    }

    context.drawImage(resourceManager.get('assets/sprites/start-female.png'), sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}

function gameLoop(state, context) {
    const newState = update(state)
    render(newState, context)

    // RequestAnimationFrame will call the gameLoop function every 16ms to achieve 60 fps framerate
    requestAnimationFrame(() => {
        gameLoop(newState, context)
    })
}

// Listen to the load event of the window object. It is triggered when a window is opened
// Here we decide to launch the draw function chen receiving this event
window.addEventListener('load', () => {
    /*
    * Here we are doing destructurign of object returned by the init function
    * It's a way to avoid intermediate variable declaration
    *
    * const a = { b: 0, c: 1 }
    *
    * To access de value of b we can do
    * 
    * console.log(a.b)
    * 
    * If the object is destructured before i can do
    * 
    * const {b, c} = a
    * console.log(b)
    */
    const images = ['assets/sprites/start-female.png']
    resourceManager.load(images)
        .then(() => {
            const { state, context } = init({ width: WINDOW_WIDTH, height: WINDOW_HEIGHT })
            gameLoop(state, context)
        })
})