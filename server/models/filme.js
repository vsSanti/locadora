const bookshelf = require('./../bookshelf')
const ExemplarFilme = require('./exemplarFilme')


const Filme = bookshelf.Model.extend({
    tableName: 'filme',
    exemplares() {
        return this.hasMany('ExemplarFilme', 'filme_id');
    },

    initialize() {
        this.on('created', this.criaExemplares)
    },

    async criaExemplares() {
        const listaExemplares = []
        const n = Math.floor((Math.random() * 10) + 1)
        console.log('Criando ' + n + ' exemplares para o filme ' + this.toJSON().titulo)
        for (let i = 0; i < n; i++) {
            listaExemplares.push({ filme_id: this.id })
        }
        ExemplarFilme.query(function (qb) {
            qb.insert(listaExemplares)
        }).fetch()
    }
});

module.exports = bookshelf.model('Filme', Filme)