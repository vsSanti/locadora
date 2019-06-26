const bookshelf = require('../bookshelf')
const Token = require('../models/token')
const Usuario = require('../models/usuario')
const Promise = require('bluebird')

const Tokens = bookshelf.Collection.extend({ model: Token }, {

    createToken: Promise.method(function (usuario_id) {
        if (!usuario_id) {
            throw new Error('usuario_id is', usuario_id)
        }
        return Usuario.forge({ id: usuario_id }).related('tokens').create()
    }),

    async deleteTokens(idTokenParaDeletar) {
        if (idTokenParaDeletar.length > 0) {
            return await Token.query().whereIn('id', idTokenParaDeletar).del()
        }
        throw new Error()
    }
});

module.exports = bookshelf.collection('Tokens', Tokens)