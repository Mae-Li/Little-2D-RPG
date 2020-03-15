// The draw function is used to draw in a canvas every tick of the game loop
function draw() {
    // Retrieve a reference to the canvas element in html
    const canvas = document.getElementById('my-canvas')
    // Create a 2D surface in which we can draw
    const context = canvas.getContext('2d')

    // Set a color to use
    context.fillStyle = 'rgb(200, 0, 0)'
    // Draw a rectangle
    context.fillRect(50, 50, 200, 200)

    // RGBA => Red, Green, Blue, Alpha
    context.fillStyle = 'rgba(0, 0, 200, 0.75)'
    context.fillRect(75, 75, 200, 200)
}

// Listen to the load event of the window object. It is triggered when a window is opened
// Here we decide to launch the draw function chen receiving this event
window.addEventListener('load', draw)