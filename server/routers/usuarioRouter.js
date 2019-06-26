const express = require('express')
const bcrypt = require('bcryptjs')
const UsuarioController = require('../controllers/usuarioController')
const TokenController = require('../controllers/tokenController')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/usuario', (req, res) => {
    UsuarioController.createUsuario(req.body).then((usuario) => {
        TokenController.createToken(usuario.id).then((token) => {
            res.status(201).send({ usuario, token: token.toJSON().valor })
        })
    }).catch((error) => {
        res.status(400).send(error)
    })
})

router.post('/usuario/login', (req, res) => {
    if (!req.body.email || !req.body.senha) {
        res.status(400).send('Erro ao validar usuario')
    }

    UsuarioController.findByEmailWithTokens(req.body.email).then(async (usuario) => {
        const usuarioJSON = usuario.toJSON()
        const isMatch = await bcrypt.compare(req.body.senha, usuarioJSON.senha)
        if (!isMatch) {
            res.status(400).send('Erro ao validar usuario')
        }
        TokenController.createToken(usuario.id).then((token) => {
            res.status(200).send({ usuario, token: token.toJSON().valor })
        })
    }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
    })
})

router.delete('/usuario/logout', auth, async (req, res) => {
    try {
        const tokensUsuario = req.usuario.toJSON().tokens
        const idTokenParaDeletar = tokensUsuario.filter((token) => token.valor === req.token).map((token) => token.id)

        TokenController.deleteTokens(idTokenParaDeletar).then((obj) => {
            res.send()
        }).catch((error) => {
            res.status(400).send()
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

module.exports = router