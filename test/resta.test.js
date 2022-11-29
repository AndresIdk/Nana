const resta = (a, b) => {
  return a - b
}

describe('resta', () => { // Describe contextualiza
  test('Comprobar resta', () => {
    expect(resta(3, 1)).toBe(2)
  })

  test('Comprobar negativos', () => {
    expect(resta(1, 3)).toBe(-2)
  })
})
