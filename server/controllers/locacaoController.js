const bookshelf = require('../bookshelf')
const Locacao = require('../models/locacao')
const Promise = require('bluebird')

const LocacaoController = bookshelf.Collection.extend({ model: Locacao }, {
    async generateLocacao(exemplar_filme_id, usuario_id) {
        if (!usuario_id) {
            throw new Error('usuario_id is null')
        }

        return await Locacao.forge({ exemplar_filme_id: exemplar_filme_id, usuario_id }).save()
    },

    async generateDevolucao(locacao_id) {
        if (!locacao_id) {
            throw new Error('locaca_id is null')
        }

        return await Locacao.forge({ id: locacao_id }).fetch({ withRelated: ['exemplarFilme'] })
            .then(async (locacao) => {

                return Promise.all([
                    locacao.set('devolvido_at', new Date()).save(),
                    locacao.related('exemplarFilme').set('is_locado', 0).save()
                ])
            }).catch((error) => {
                throw new Error(error)
            })
    }
});

module.exports = bookshelf.collection('LocacaoController', LocacaoController)
