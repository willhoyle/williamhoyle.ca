const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream('/home/will/Downloads/elevate_activities_export.2020.11.22-21.08.30.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });