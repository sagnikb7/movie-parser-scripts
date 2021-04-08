const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Log = require('../core/logger');

const logger = Log(__filename);
const writeData = async (path, header, records) => {
    try {
        const csvWriter = createCsvWriter({
            header,
            path,
        });
        const d = await csvWriter.writeRecords(records);
        return d;
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
};

module.exports = { writeData };
