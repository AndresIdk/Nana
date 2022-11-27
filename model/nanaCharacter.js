const mongoose = require('mongoose')

const SchemaCharacter = new mongoose.Schema({
  Name: String,
  Age: Number,
  Band: String
})

SchemaCharacter.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const NanaCharacter = mongoose.model('NanaCharacter', SchemaCharacter)

module.exports = NanaCharacter
