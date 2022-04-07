
/*
 * Generates the inline styles for the main bracket div.
 *
 * matchColumns refers to the number of columns needed for the matches.
 * The actual amount of grid columns that will be returned will be greater
 * to leave space for the SquareForks and outer margins.
 * 
 * matchRows refers to the number of rows needed for the matches.
 * The number of grid rows returned will be the same.
 *
 */
export function generateBracketStyles(matchColumns, matchRows) {
  if(matchColumns <= 0 || matchRows <= 0) {
    throw new Error('Invalid argument')
  }
  
  let columns = '1fr';
  if(matchColumns > 1) {
    // There needs to be a 2fr column between each 'bracketColumn'
    // for the SquareForks, and a 1fr column at the start and end
    // to keep the outer margins of the entire bracket consistent
    // with the margins between Match columns.
    //
    // 16fr is used for the Match column. There's nothing
    // special about that number, it just gave decent margins.
    //
    // So for 3 match columns, this should generate:
    //   'grid-template-columns: 1fr 16fr 2fr 16fr 2fr 16fr 1fr'
    for(let i = 0; i < matchColumns - 1; i++) {
      columns += ' 16fr 2fr'
    }
    columns += ' 16fr 1fr'
  }

  const rows = `repeat(${matchRows}, 1fr)`

  return {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows
  }
}


/* 
 * These col-start and row-start calculations put each stage in a new column, and position
 * the Matches so they're centered relative to the matches they're connected to.
 * 
 * Note that every match column has two thin columns next to it (for the SquareForks),
 * so there are 2x+1 grid columns, where x is the number of stages, and each Match
 * takes up two rows, so there's 2y grid rows, where y is the maximum number of
 * matches in a stage
 * 
 *
 * If stage one has 8 matches (16 players):
 * For stage 1: it should start in col-2 and row-1, adding a match to every 2nd row
 * For stage 2, it should start in col 4 and row 2, adding a match to every 4th row.
 * For stage 3, it should start in col 6 and row 4, adding a match to every 8th row.
 * For stage 4, it should start in col 8 and row 8, adding a match to every 16th row.
 *
 * So the offset for col-start is 2
 * col-start needs to scale by stageIndex*2
 *  
 * row start is the hard part, so I'm going to make a table:
 * stageIndex  |  matchIndex  |  row-start
 *     0              0              1
 *     0              1              3
 *     0              2              5
 *     0              3              7
 *     0              4              9
 *     1              0              2
 *     1              1              6
 *     1              2              10
 *     1              3              14
 *     1              4              18
 *
 * The offset for row-start is 2**stageIndex (it scales as 1, 2, 4, 8)
 * The scalar for row-start is 2**(stageIndex+1)*matchIndex
 */
export function generateMatchContainerStyles(stageIndex, matchIndex) {
  return {
    gridColumnStart: 2 + stageIndex * 2,
    gridRowStart: 2 ** stageIndex + 2 ** (stageIndex + 1) * (matchIndex)
  }
}

/*
 *
 * Sets up the grid starts and spans for a SquareFork.
 * It works similarly to the generateMatchContainerStyles algorithm
 * with minor offset adjustments and an additional grid row span rule
 */
export function generateForkContainerStyles(stageIndex, matchIndex) {
  return {
    gridColumnStart: ` ${1 + stageIndex * 2}`,
    gridRow: `${2 ** (stageIndex - 1) + 1 + 2 ** (stageIndex + 1) * (matchIndex)} / span ${2 ** (stageIndex)}`
  }
}
