const bookshelf = require('../bookshelf')
const Locacao = require('../models/locacao')

const LocacaoController = bookshelf.Collection.extend({ model: Locacao }, {
    async generateLocacao(exemplar_filme_id, usuario_id) {
        if (!usuario_id) {
            throw new Error('usuario_id is null')
        }

        return await Locacao.forge({ exemplar_filme_id: exemplar_filme_id, usuario_id }).save()
    }
});

module.exports = bookshelf.collection('LocacaoController', LocacaoController)
