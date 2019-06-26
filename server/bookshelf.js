// Set up knex using the config file for the environment
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV])
knex.on( 'query', function( queryData ) {
    console.log( queryData );
});

 
// set up bookshelf using the knex setup we created above
var bookshelf = require('bookshelf')(knex)
bookshelf.plugin('registry');
 
// make sure bookshelf is available when importing this file
module.exports = bookshelf