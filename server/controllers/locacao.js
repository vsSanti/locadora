const bookshelf = require('./../bookshelf')
const Locacao = require('../models/locacao')

const Locacoes = bookshelf.Collection.extend({
    model: Locacao,
    algo() {
        console.log('dentro da collection')
    }
});

