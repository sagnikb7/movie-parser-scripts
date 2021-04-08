const Datastore = require('nedb');
const { DATABASE } = require('../constants');

const db = new Datastore({ filename: DATABASE, autoload: true });
module.exports = db;
