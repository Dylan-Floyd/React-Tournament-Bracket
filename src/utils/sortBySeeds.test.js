import sortBySeeds from './sortBySeeds.js'

it('should arrange players so the highest seed player faces the lowest seed player', () => {
  const testPlayers = [
    { seed: 1, name: 'bob1' },
    { seed: 2, name: 'bob2' },
    { seed: 3, name: 'bob3' },
    { seed: 4, name: 'bob4' }
  ]

  const expected = [
    { seed: 1, name: 'bob1' },
    { seed: 4, name: 'bob4' },
    { seed: 2, name: 'bob2' },
    { seed: 3, name: 'bob3' }
  ]

  const actual = sortBySeeds(testPlayers)

  expect(actual).toEqual(expected)
})

it('should throw an error if the seeds are invalid', () => {
  // there should be no duplicates
  const testPlayers1 = [
    { seed: 1, name: 'bob1' },
    { seed: 1, name: 'bob2' },
    { seed: 3, name: 'bob3' },
    { seed: 4, name: 'bob4' }
  ]

  expect(() => sortBySeeds(testPlayers1)).toThrow('Invalid seeds')

  // each seed should be 1 higher than the last
  const testPlayers2 = [
    { seed: 1, name: 'bob1' },
    { seed: 2, name: 'bob2' },
    { seed: 4, name: 'bob3' },
    { seed: 5, name: 'bob4' }
  ]

  expect(() => sortBySeeds(testPlayers2)).toThrow('Invalid seeds')

  // seeds should start at 1
  const testPlayers3 = [
    { seed: 2, name: 'bob1' },
    { seed: 3, name: 'bob2' },
    { seed: 4, name: 'bob3' },
    { seed: 5, name: 'bob4' }
  ]

  expect(() => sortBySeeds(testPlayers3)).toThrow('Invalid seeds')
})