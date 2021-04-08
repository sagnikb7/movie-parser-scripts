/**
 * Define constants here
 *
 */
const path = require('path');

module.exports = {
    ALLOWED_FILE_TYPES    : ['.mp4', '.avi', '.mkv', '.flv', '.mov'],
    MOVIE_MOVE_LIMIT      : 10,
    DATABASE              : path.join(__dirname, 'data', 'movie.db'),
    MOVIE_LIST_FILENAME   : path.join(__dirname, 'data', 'movie_discovered.csv'),
    MOVIE_DESTINATION_DIR : path.join(__dirname, 'MOVIE_FILES'),
    // MOVIE_DESTINATION_DIR : path.join('/mnt/HDD/', 'MOVIE_CHECK'),
};
