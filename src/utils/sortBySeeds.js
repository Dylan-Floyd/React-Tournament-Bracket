
/*
 * Matches the highest seeded player against the lowest seeded player,
 * the second highest seeded player against the second lowest seeded player, and so forth
 * 
 */
export default function sortBySeeds(players) {
  // Duplicate the array, and then sort the players by seed in ascending order.
  const sortedPlayers = players.map(p => p).sort((playerA, playerB) => playerA.seed - playerB.seed)

  // Ensures the seed numbers start at one and increase by 1.
  if(sortedPlayers[0]?.seed !== 1) throw new Error('Invalid seeds')
  for(let i = 1; i < sortedPlayers.length; i++) {
    if(sortedPlayers[i].seed - sortedPlayers[i-1].seed !== 1) throw new Error('Invalid seeds') 
  }

  // if sortedPlayers is:
  // 1, 2, 3, 4 
  // seededPlayers will be:
  // 1, 4, 2, 3

  // 1, 2, 3, 4, 5, 6, 7, 8
  // 1, 8, 2, 7, 3, 6, 4, 5

  const seededPlayers = [];
  let i = 0;
  let j = sortedPlayers.length - 1;
  while(i < j) {
    seededPlayers.push(sortedPlayers[i++])
    seededPlayers.push(sortedPlayers[j--]);
  }
  return seededPlayers
}
