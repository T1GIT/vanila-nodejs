const http = require('http')
const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = 'public'
const TEMPLATE_DIR = 'template'
const ROUTES = {
    '/': 'index',
    '/contact': 'contact'
}

const dirName = {
    public: path.join(__dirname, PUBLIC_DIR),
    template: path.join(__dirname, TEMPLATE_DIR)
}

const types = {
    '.js': 'text/javascript',
    '.css': 'text/css'
}

async function sendTemplate(name, res) {
    res.writeHead(200, 'success', {
        'Content-Type': 'text/html'
    })
    res.end(fs.readFileSync(path.join(dirName.template, `${name}.html`)))
}

async function sendResource(name, res) {
    const ext = path.extname(name)
    if (ext in types) {
        res.writeHead(200, 'success', {
            'Content-Type': types[ext]
        })
        res.end(fs.readFileSync(path.join(__dirname, name)))
    } else {
        await sendError(400, 'Wrong extension')
    }
}

async function sendError(code, reason, res) {
    res.writeHead(code, reason, {
        'Content-Type': 'text/html'
    })
    res.end(fs.readFileSync(path.join(dirName.template, 'error.html')))
}

const server = http.createServer(async (req, res) => {
    const url = req.url
    if (url in ROUTES) {
        await sendTemplate(ROUTES[url], res)
    } else if (
        url.startsWith(`/${PUBLIC_DIR}`)
        && fs.existsSync(path.join(__dirname, url)))
    {
        await sendResource(url, res)
    } else {
        await sendError(404, 'PageNotFound', res)
    }

})

const PORT = parseInt(process.env.PORT || 8080)

server.listen(PORT, () => {
    console.log('Server has been started...')
})
