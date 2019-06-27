const bookshelf = require('../bookshelf')
const Usuario = require('../models/usuario')

const UsuarioController = bookshelf.Collection.extend({ model: Usuario }, {
    async createUsuario(data) {
        return await Usuario.forge(data).save()
    },

    async findByEmailWithTokens(email) {
        return await Usuario.forge({ email }).fetch({ require: true })
    }
});

module.exports = bookshelf.collection('UsuarioController', UsuarioController)