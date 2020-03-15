const ResourceManager = () => {
    let resourceCache = {}

    // Load an array of image urls
    function load(urls) {
        return Promise.all(urls.map( url => _load(url)))
    }

    function _load(url) {
        return new Promise(resolve => {
            if(resourceCache[url]) {
                resolve(resourceCache[url])
            }
            else {
                let img = new Image()
                img.addEventListener('load', () => {
                    resourceCache[url] = img
                    resolve(img)
                })
                img.src = url
            }
        })
    }

    function get(url) {
        return resourceCache[url]
    }

    return {
        load,
        get
    }
}

export default ResourceManager

/*
// Callbacks
const a = fetch('toto.com/superjeu.exe')
const b = fetch('toto.com/superjeu2.exe')

a.addEventListener('load', () => {
    launch(a)
})

b.addEventListener('load', () => {
    launch(b)
})

// Promises
const a = fetch('toto.com/superjeu.exe').then(a => {
    launch(a)
})

// Async Await
const a = await fetch('toto.com/superjeu.exe')
const b = await fetch('toto.com/superjeu2.exe')
*/