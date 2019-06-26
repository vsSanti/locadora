const bookshelf = require('../bookshelf')
const Filme = require('../models/filme')

const Filmes = bookshelf.Collection.extend({ model: Filme }, {
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


    }
});

module.exports = bookshelf.collection('Filmes', Filmes)