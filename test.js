const db = require('./core/database');

const user = {
    name    : 'Sagnik',
    age     : 25,
    human   : true,
    details : { iscool: 90 },
};

db.insert(user);
