const http = require('http')

const app = http.createServer((resquest, response) => {
    response.writeHead(200, {'Character': 'Hachi'})
    response.end('Hola')
})

const PORT = 3001
app.listen(PORT)
console.log('Server is running')