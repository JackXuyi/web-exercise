const stream = require('stream')
const fs = require('fs')
const path = require('path')

const writeStream = new stream.Writable({
  defaultEncoding: 'ascii',
  write: (chunk, encoding, callback) => {
    console.log('\n\n\n', encoding, chunk.toString())
    callback()
  },
})
fs.createReadStream(path.resolve(__dirname, 'new.js'), {
  //   highWaterMark: 10,
  encoding: 'utf-8',
}).pipe(writeStream)
