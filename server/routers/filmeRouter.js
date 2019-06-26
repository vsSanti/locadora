const express = require('express')
const FilmeController = require('../controllers/filmeController')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/filme/disponivel', auth, (req, res) => {
    FilmeController.getFilmesDisponiveis().then((obj) => {
        const filmes = obj.toJSON().filter((filme) => filme.exemplares.length > 0)
        res.send(filmes)
    }).catch((error) => {
        res.status(500).send()
    })
})

router.get('/filme/porTitulo', auth, (req, res) => {
    FilmeController.getFilmesPorTitulo(req.body.titulo).then((filmes) => {
        console.log(filmes.toJSON())
        res.send(filmes)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

module.exports = router