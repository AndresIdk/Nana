// Bajo JEST
const suma = (a, b) => {
  return a + b
}

test('Compureba la suma', () => {
  const result = suma(1, 2)
  expect(result).toBe(3)
})
