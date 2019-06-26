const express = require('express')
const ExemplarFilmeController = require('../controllers/exemplarFilmeController')
const LocacaoController = require('../controllers/locacaoController')
const ExemplarFilme = require('../models/exemplarFilme')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/locacao', auth, (req, res) => {
    if (!req.body.exemplarFilme_id) {
        res.status(400).send('exemplarFilme_id is null')
    }

    ExemplarFilme.forge({ id: req.body.exemplarFilme_id, is_locado: 0 }).fetch({ require: true })
        .then(async (exemplarFilme) => {
            await exemplarFilme.set('is_locado', 1).save()
            LocacaoController.generateLocacao(exemplarFilme.id, req.usuario.toJSON().id)
            res.send(exemplarFilme)
        }).catch((error) => {
            if (error.message === 'EmptyResponse') {
                res.status(404).send()
            }
            res.status(500).send()
        })
})

module.exports = router