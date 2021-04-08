/**
 * Checker
 * This script scans a base directory for a movies
 * Lists them in a file & DB
 */

const { FileUtility } = require('../utils/file');
const db = require('../core/database');
const Log = require('../core/logger');
const { writeData } = require('../utils/csv');
const { MOVIE_LIST_FILENAME } = require('../constants');

const logger = Log(__filename);

const ARGS = process.argv.slice(2);
if (!ARGS[0]) throw new Error('directory path cannot be blank');

const fileUtil = new FileUtility(ARGS[0]);

// if file not exists
if (!fileUtil.checkDirectoryExists()) throw new Error('directory/file does not exist');

const main = async () => {
    const movieJSON = await fileUtil.crawlDirectoryForMovies();

    logger.info(`${movieJSON.length} movies found`);

    await writeData(MOVIE_LIST_FILENAME, [
        { id: 'name', title: 'NAME' },
        { id: 'path', title: 'PATH' },
    ], movieJSON);

    const movieData = movieJSON.map((m) => ({ ...m, moved: false }));
    db.insert(movieData, (err, newDocs) => {
        if (err) throw new Error(err);
        logger.info(`${newDocs.length} records inserted`);
    });
};

main();
