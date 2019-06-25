const bookshelf = require('../bookshelf')


const ExemplarFilme = bookshelf.Model.extend({
    tableName: 'exemplar_filme',
    filme() {
        return this.belongsTo('Filme');
    }
});

module.exports = bookshelf.model('ExemplarFilme', ExemplarFilme)