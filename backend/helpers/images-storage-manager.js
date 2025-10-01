const fs = require('fs')
const path = require('path')

// File System Operation: Remove Image from Local Storage
const imageRemoval = (folder, filename) => {
  fs.unlink(path.join(__dirname, `../uploads/${folder}`, filename), (err) => {
    if (err) {
      new Error('Error deleting photo')
    }
  })
}

// File System Operation: Remove Image Array from Local Storage
const imageArrayRemoval = (photos) => {
  for (const photo of photos) {
    imageRemoval('pets', photo)
  }
}

module.exports = { imageRemoval, imageArrayRemoval }
