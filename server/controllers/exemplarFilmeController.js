const bookshelf = require('../bookshelf')
const ExemplarFilme = require('../models/exemplarFilme')

const ExemplarFilmeController = bookshelf.Collection.extend({
    model: ExemplarFilme
});

module.exports = bookshelf.collection('ExemplarFilmeController', ExemplarFilmeController)
