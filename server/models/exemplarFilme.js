const bookshelf = require('../bookshelf')
const Locacao = require('./locacao')

const ExemplarFilme = bookshelf.Model.extend({
    tableName: 'exemplar_filme',

    filme() {
        return this.belongsTo('Filme');
    },

    locacoes() {
        return this.hasMany('Locacao')
    }
});

module.exports = bookshelf.model('ExemplarFilme', ExemplarFilme)