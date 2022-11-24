// NPM INSTALL -E //Para instalar version sin actualizaciones
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

//  Data
const { Nana } = require('./data/character')

const app = express()

// Middlewares
app.use(express.json()) // Parsear la data a Json
app.use(morgan('dev')) // Mostrar informacion en consola
app.use(cors()) // Definir cuales origenes pueden consumir la api

app.get('/', (req, res) => {
  res.send('<h1>Nana</h1>')
})

app.get('/hola', (req, res) => {
  const characters = Nana()
  res.json(characters)
})

app.get('/hola/:band', (req, res) => {
  const band = req.params.band
  const singers = Nana().filter((singers) => singers.Band === band)
  res.json(singers)
})

app.post('/hola', (req, res) => {
  const character = req.body

  const newCharacter = {
    ID: Nana().length + 1,
    Name: character.Name,
    Age: character.Age,
    Band: character.Band
  }

  const newCharacters = [...Nana(), newCharacter]

  res.status(201).json(newCharacters)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log('Server is running on port 3002')
})
