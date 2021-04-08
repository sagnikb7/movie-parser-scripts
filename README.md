# Movie Parser - scripts

Created to ease the process of selecting movies & guide with the naming of files for ease of data collection in the **movie parser** project.

## Prerequisites

Make sure you have below software installed before running the application

* Must have [NODE](https://nodejs.org/en/download/) version 10 or higher 




### Important npm dependencies

* [csv-writer](https://www.npmjs.com/package/csv-writer) read/write csv files
* [nedb](https://www.npmjs.com/package/nedb) lightweight Database
* [winston](https://www.npmjs.com/package/winston) logging

Dev dependencies include eslint and additional support files
```bash
#Do make sure to lint before you push
npm run lint
```
## Installation

```bash
cd movie-parser-scripts
npm install
#Create an empty directory MOVIE_FILES in project base
#movies files will be moved here, refer to mover.js for explaination
```
## Scripts
Usage and functions of main scripts
#### 1. checker.js

Scans a specific directory for movies based on extensions like (.mp4, .avi, .mkv). Then it generates a DB (for internal tracking ) & CSV in the **/data** directory of the project

```bash
#point to any dir containing movies
node scripts/checker.js <dir>
#node scripts/checker.js /mnt/HDD/Movies
```

#### 2. mover.js

Based on the movies scanned by checker.js , this script picks a batch of movies, moves it from it source directory to a desired direcory which can be configured at **MOVIE_DESTINATION_DIR** in /constants.js default is MOVIE_FILES

```bash
node scripts/mover.js
```

## The Drill

* Run checker.js once 
```bash
node scripts/checker.js /mnt/HDD/1.SEEN_Holly/ADVENTURE
```
* Run mover.js to get a batch of movies ( default 10 )
```bash
node scripts/mover.js
```
* Perform basic checks **manually** 
  * Resolution is good enough
  * File is not corrupted by seeking quickly through the movie

* Check if the name will be compatible as per the STANDARDS
## License
[MIT](https://choosealicense.com/licenses/mit/)
