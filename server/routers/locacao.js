const express = require('express')
const Usuario = require('../models/usuario')
const ExemplarFilme = require('../models/exemplarFilme')
const Locacao = require('../models/locacao')
const Filme = require('../models/filme')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/locacao', auth, (req, res) => {
    Filme.forge().fetchAll({
        withRelated: {
            'exemplares': (qb) => {
                qb.where('is_locado', '=', 0)
            }
        }
    }).then((obj) => {
        const filmes = obj.toJSON().filter((filme) => filme.exemplares.length > 0)
        res.send(filmes)
    })
})

module.exports = router