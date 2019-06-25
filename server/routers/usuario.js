const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const Token = require('../models/token')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/usuario', (req, res) => {
    Usuario.forge(req.body).save().tap(async (usuario) => {
        const token = await usuario.related('tokens').create().then((token) => token.toJSON().valor)
        res.status(201).send({ usuario, token })
    }).catch((error) => {
        res.status(400).send(error)
    })
})

router.post('/usuario/login', async (req, res) => {
    if (!req.body.email || !req.body.senha) {
        res.status(400).send('Erro ao validar usuario')
    }

    await Usuario.forge({ email: req.body.email }).fetch({ withRelated: ['tokens'] }).then(async (usuario) => {
        const usuarioJSON = usuario.toJSON()
        const isMatch = await bcrypt.compare(req.body.senha, usuarioJSON.senha)
        if (!isMatch) {
            res.status(400).send('Erro ao validar usuario')
        }
        const token = await usuario.related('tokens').create().then((token) => token.toJSON().valor)
        res.send({ usuario, token })
    }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
    })
})

router.delete('/usuario/logout', auth, async (req, res) => {
    try {
        const tokensUsuario = req.usuario.toJSON().tokens
        const idTokenParaDeletar = tokensUsuario.filter((token) => token.valor === req.token).map((token) => token.id)

        if (idTokenParaDeletar.length > 0) {
            await Token.query().whereIn('id', idTokenParaDeletar).del().then((obj) => {
                res.send()
            }).catch((error) => {
                res.status(400).send()
            })
        }
        res.status(404).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

module.exports = router