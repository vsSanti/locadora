
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('usuario', function (table) {
            table.increments('id').primary();
            table.string('nome').notNullable();
            table.string('email').notNullable().unique();
            table.string('senha').notNullable();
        }).createTable('token', function (table) {
            table.increments('id').primary();
            table.integer('usuario_id').unsigned().references('id').inTable('usuario');
            table.string('valor').notNullable();
        }).createTable('filme', function (table) {
            table.increments('id').primary();
            table.string('nome');
            table.string('diretor');
        }).createTable('exemplar_filme', function (table) {
            table.increments('id').primary();
            table.integer('filme_id').unsigned().references('id').inTable('filme');
            table.boolean('is_locado').defaultTo(false);
        }).createTable('locacao', function (table) {
            table.increments('id').primary();
            table.integer('exemplar_filme_id').unsigned().references('id').inTable('exemplar_filme');
            table.integer('usuario_id').unsigned().references('id').inTable('usuario');
            table.timestamps();
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('usuario')
            .dropTable('token')
            .dropTable('filme')
            .dropTable('exemplar_filme')
        ])
};
