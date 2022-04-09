const http = require('http')

const server = http.createServer()
server.listen(3001, 'localhost', () => { 
    console.log('\n\n Server is running')
})
console.log('\n')


//######################################################
