const bookshelf = require('../bookshelf')
const Filme = require('../models/filme')

const FilmeController = bookshelf.Collection.extend({ model: Filme }, {
    async getFilmesDisponiveis() {
        try {
            return await Filme.forge().fetchAll({
                withRelated: {
                    'exemplares': (qb) => {
                        qb.where('is_locado', '=', 0)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    },

    async getFilmesPorTitulo(nome) {
        if (!nome) {
            throw new Error('Nome é obrigatório')
        }

        return await Filme.query(function (qb) {
            qb.whereRaw('LOWER(titulo) LIKE ?', [`%${nome}%`])
        }).fetchAll({ withRelated: ['exemplares'] })
    }
});

module.exports = bookshelf.collection('FilmeController', FilmeController)