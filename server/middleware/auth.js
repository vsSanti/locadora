const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const Token = require('../models/token')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const usuario = await Usuario.query(function (qb) {
            qb.innerJoin('token', 'token.usuario_id', 'usuario.id')
            qb.where('token.usuario_id', '=', decoded.id).andWhere('token.valor', '=', token)
        }).fetch({ withRelated: ['tokens']})
        .then((usuario) =>  usuario)
        .catch((error) => {
            throw new Error(error)
        })

        if (!usuario) {
            throw new Error()
        }
        req.token = token
        req.usuario = usuario
        next()
    } catch (error) {
        // console.log(error)
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth