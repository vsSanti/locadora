const express = require('express')
const usuarioRouter = require('./routers/usuarioRouter')
const locacaoRouter = require('./routers/locacaoRouter')
const filmeRouter = require('./routers/filmeRouter')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(usuarioRouter)
app.use(locacaoRouter)
app.use(filmeRouter)

app.listen(port, () => {
    console.log('Server is up on port', port)
})