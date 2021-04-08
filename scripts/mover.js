/**
 *
 */
const db = require('../core/database');
const Log = require('../core/logger');
const { MOVIE_MOVE_LIMIT } = require('../constants');

const logger = Log(__filename);

db.find({ moved: false }).limit(MOVIE_MOVE_LIMIT).exec((err, docs) => {
    if (err) throw new Error(err);

    logger.info(`Fetching a batch of ${docs.length} items`);

    const ids = docs.map((d) => (d._id));

    db.update({ _id: { $in: ids } },
        { $set: { moved: true } },
        { multi: true }, (err2, numReplaced) => {
            if (err2) throw new Error(err);

            logger.info(`updated ${numReplaced} items`);
            // db.find({ moved: true }, (err, data) => {
            //     console.log(data);
            // });
        });
});
