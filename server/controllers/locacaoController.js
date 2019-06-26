const bookshelf = require('../bookshelf')
const Locacao = require('../models/locacao')

const LocacaoController = bookshelf.Collection.extend({
    model: Locacao,
    algo() {
        console.log('dentro da collection')
    }
});

module.exports = bookshelf.collection('LocacaoController', LocacaoController)
