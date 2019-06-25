const bookshelf = require('./../bookshelf')
const jwt = require('jsonwebtoken')


const Token = bookshelf.Model.extend({
    tableName: 'token',
    usuario() {
        return this.belongsTo('Usuario');
    },

    initialize() {
        this.on('creating', this.generateAuthToken)
    },

    async generateAuthToken() {
        this.attributes.valor = await this.usuario().fetch().then(function (usuario) {
            const usuarioJSON = usuario.toJSON()
            return jwt.sign({ id: usuarioJSON.id }, process.env.JWT_KEY)
        })
    }
});

module.exports = bookshelf.model('Token', Token)