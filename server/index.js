const express = require('express')
const usuarioRouter = require('./routers/usuario')
const locacaoRouter = require('./routers/locacao')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(usuarioRouter)
app.use(locacaoRouter)

app.listen(port, () => {
    console.log('Server is up on port', port)
})