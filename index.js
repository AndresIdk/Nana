require('dotenv').config() // usar variables de entorno
// NPM INSTALL -E //Para instalar version sin actualizaciones
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')

//  Data
// const { Nana } = require('./data/character')

const app = express()

// Conexión a la base de datos
require('./controllers/db_connection')
// Modelo de personaje de Nana
const NanaCharacter = require('./model/nanaCharacter')

// Middlewares propios
const notfound = require('./middleware/notfound')
const handleErrors = require('./middleware/handleErrors')

// Middlewares
app.use(express.json()) // Parsear la data a Json
// app.use(morgan('dev')) // Mostrar informacion en consola
app.use(cors()) // Definir cuales origenes pueden consumir la api

app.get('/', (req, res) => {
  res.send('<h1>Nana</h1>')
})

// Ruta conectada a Mongoose para pedir allcharacters
app.get('/allcharacters', (req, res) => {
  NanaCharacter.find({})
    .then(result => res.send(result).end())
    . catch(err => console.error(err))

  // const characters = Nana()
  // res.json(characters)
})

app.get('/character/:band', (req, res, next) => {
  const band = req.params.band
  NanaCharacter.find({ Band: band })
    .then(result => result ? res.send(result).end() : res.status(404).end())
    .catch(err => next(err))
  // const singers = Nana().filter((singers) => singers.Band === band)
  // res.json(singers)
})

app.post('/insert', (req, res) => {
  // Extraer de la URL
  const data = req.body

  const nanaCharacter = new NanaCharacter({
    Name: data.Name,
    Age: data.Age,
    Band: data.Band
  })

  nanaCharacter.save()
    .then(result => {
      console.log('Guardado: ' + result)
      res.send('OK').status(200).end()
    })
    .catch(err => console.error('Error: ' + err))

  // const newCharacters = [...Nana(), newCharacter]

  // res.status(201).json(newCharacters)
})

app.delete('/character/:id', (req, res, next) => {
  const { id } = req.params
  NanaCharacter.findByIdAndDelete(id)
    .then(() => res.send('BORRADO').status(204).end())
    .catch(err => next(err))
})

app.put('/character/:id', (req, res, next) => {
  const { id } = req.params
  // Extraer de la URL
  const data = req.body

  const nanaCharacter = {
    Name: data.Name,
    Age: data.Age,
    Band: data.Band
  }

  NanaCharacter.findByIdAndUpdate(id, nanaCharacter, { new: true }) // 3er parametro devuelve el contenido del update y no lo que se encontro en el id o sea lo viejo
    .then(result => res.send('Updated').status(204).end())
    .catch(err => next(err))
})

app.use(notfound)

// Middlewares para manejo de errores
app.use(handleErrors)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log('Server is running on port 3002')
})
