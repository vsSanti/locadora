const bookshelf = require('./../bookshelf')

const Locacao = bookshelf.Model.extend({
    tableName: 'locacao',

    usuario() {
        return this.belongsTo('Usuario');
    },

    exemplarFilme() {
        return this.belongsTo('ExemplarFilme')
    }
});

module.exports = bookshelf.model('Locacao', Locacao)