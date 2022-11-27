module.exports = (req, res, next) => {
  res.send('<h1>URL NO EXISTE 404</h1>').status(404).end()
}
