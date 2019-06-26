const bookshelf = require('../bookshelf')
const Usuario = require('../models/usuario')

const Usuarios = bookshelf.Collection.extend(
    {
        model: Usuario
    },
    {
        async createUsuario(data) {
            return await Usuario.forge(data).save()
        },

        async findByEmailWithTokens(email) {
            return await Usuario.forge({ email }).fetch({ withRelated: ['tokens'] })
        }
    });

module.exports = bookshelf.collection('Usuarios', Usuarios)