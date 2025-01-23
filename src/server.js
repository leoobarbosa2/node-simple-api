import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)
    
    if (method === 'GET' && url === '/users') {
        console.log(req.headers)
        return res.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email
        })

        return res.writeHead(201).end('Created')
    }

    return res.writeHead(404).end('Users not found!')
})

server.listen(3333)