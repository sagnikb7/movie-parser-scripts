const { existsSync, promises: fs } = require('fs');
const path = require('path');
const { ALLOWED_FILE_TYPES } = require('../constants');
const db = require('../core/database');
const Log = require('../core/logger');

const logger = Log(__filename);
class FileUtility {
    constructor(directory) {
        this.directory = directory;
    }

    checkDirectoryExists() {
        return existsSync(this.directory);
    }

    async crawlDirectoryForMovies(basePath = this.directory) {
        const entries = await fs.readdir(basePath, { withFileTypes: true });

        // Get files within the current directory and add a path key to the file objects
        const files = entries
            .filter((e) => !e.isDirectory() && ALLOWED_FILE_TYPES.includes(path.extname(e.name)))
            .map((file) => ({ name: file.name, path: path.join(basePath, file.name) }));

        // Get folders within the current directory
        const folders = entries.filter((e) => e.isDirectory());
        // eslint-disable-next-line no-restricted-syntax
        for (const folder of folders) {
            const currentPath = path.join(basePath, folder.name);
            files.push(...await this.crawlDirectoryForMovies(currentPath));
        }
        return files;
    }
}
const updateFilesMoved = (sourcePath) => new Promise((res, rej) => {
    db.update({ path: sourcePath }, { $set: { moved: true } }, (err, numReplaced) => {
        if (err) rej(err);
        logger.info(`${numReplaced} file ${path.basename(sourcePath)} moved`);
        res(true);
    });
});

const moveFiles = async (sourcePath, destinationPath) => {
    try {
        await fs.rename(sourcePath, destinationPath);
        await updateFilesMoved(sourcePath);
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = { FileUtility, moveFiles };
