const express = require('express')
const usuarioRouter = require('./routers/usuario')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(usuarioRouter)

app.listen(port, () => {
    console.log('Server is up on port', port)
})