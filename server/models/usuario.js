const bookshelf = require('./../bookshelf')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Usuario = bookshelf.Model.extend({
    tableName: 'usuario',
    tokens() {
        return this.hasMany('Token', 'usuario_id');
    },

    initialize() {
        this.on('saving', this.encryptPassword)
        this.on('saving', this.validateEmail)
    },

    validateEmail() {
        this.attributes.email = this.attributes.email.toLowerCase()
        if (!validator.isEmail(this.attributes.email)) {
            throw new Error('Email não é válido')
        }
    },

    async encryptPassword() {
        if (this.hasChanged('senha')) {
            this.attributes.senha = await bcrypt.hash(this.attributes.senha, 8)
        }
    }
})

module.exports = bookshelf.model('Usuario', Usuario)