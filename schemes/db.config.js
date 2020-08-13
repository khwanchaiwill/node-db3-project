const knex = require('knex');
const knexconfig = require('../knexfile.js')

module.exports = knex(knexconfig.development);