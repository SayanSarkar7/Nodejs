const fs=require('fs');
const readStream = fs.createReadStream('./docs/blogs1.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blogs3.txt');
// readStream.on('data', (chunk) =>{
//     console.log(chunk);
//     writeStream.write('\n New Chunk\n');
//     writeStream.write(chunk);
// })

// piping
readStream.pipe(writeStream);