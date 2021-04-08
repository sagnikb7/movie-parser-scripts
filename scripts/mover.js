/**
 * Mover
 * This script picks a batch of movie files and updates data
 */
const path = require('path');
const db = require('../core/database');
const Log = require('../core/logger');
const { moveFiles } = require('../utils/file');
const { MOVIE_MOVE_LIMIT, MOVIE_DESTINATION_DIR } = require('../constants');

const logger = Log(__filename);

const fetchMovieBatch = () => new Promise((res, rej) => {
    db.find({ moved: false }).limit(MOVIE_MOVE_LIMIT).exec((err, docs) => {
        if (err) rej(err);

        logger.info(`Fetching a batch of ${docs.length} items`);
        res(docs);
    });
});

const main = async () => {
    const movies = await fetchMovieBatch();
    const proms = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const movie of movies) {
        const p = moveFiles(movie.path, path.join(MOVIE_DESTINATION_DIR, movie.name));
        proms.push(p);
    }
    await Promise.all(proms);
    logger.info('Done moving');
};

main();
