const mongoose = require('mongoose')
const supertest = require('supertest') // Para textear servidores http
const { app, server } = require('../index')

const api = supertest(app)

// Hook que se ejecuta antes de los test para anexar o modificar parametros de estos
beforeEach(async () => {
  console.log('bien')
})

test('Todos los personajes', async () => {
  await api
    .get('/allcharacters')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Se envia un json', async () => {
  const res = await api
  expect(res.body).toHaveLength(2)
})

// Hook para test, se eejcuta en cierta parte del test
afterAll(() => { // Se ejecuta despues de todos los test
  server.close()
  mongoose.connection.close()
})
