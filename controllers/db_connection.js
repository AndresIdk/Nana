const mongoose = require('mongoose')

// String del Mongo para la conexíon
// const connectionString = process.env.MONGO_DB

const { NODE_ENV, MONGO_DB, MONGO_DB_TEST } = process.env

// const connectionString = NODE_ENV === 'test' ? MONGO_DB_TEST : MONGO_DB
// Para hosting
const connectionString = MONGO_DB // Para Heroku

// Conexión
mongoose.connect(connectionString)
  .then(() => console.log('Database connected'))
  .catch(e => console.error('Error: ' + e))

process.on('uncaughtException', () => {
  mongoose.connection.close() // Cerrar conexión en caso de errores
})
// const nanaCharacter = new NanaCharacter({
//   Name: 'Reira',
//   Age: 31,
//   Band: 'Trapnest'
// })

// nanaCharacter.save()
//   .then(response => {
//     console.log('Respuesta de la base de datos: ' + response)
//     mongoose.connection.close()
//   })
//   .catch(e => console.errror('Error: ' + e))

// NanaCharacter.find({})
//   .then(res => console.log(res))
//   . catch(err => console.error(err))
