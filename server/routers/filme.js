const express = require('express')
const FilmeController = require('../controllers/filmes')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/filme/disponivel', auth, async (req, res) => {
    FilmeController.getFilmesDisponiveis().then((obj) => {
        const filmes = obj.toJSON().filter((filme) => filme.exemplares.length > 0)
        res.send(filmes)
    }).catch((error) => {
        res.status(500).send()
    })
})

module.exports = router