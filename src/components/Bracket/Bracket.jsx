import React, { useEffect, useState } from 'react'
import Match from '../Match/Match.jsx'
import SquareFork from '../SquareFork/SquareFork.jsx'
import sortBySeeds from '../../utils/sortBySeeds.js'

export default function Bracket({ players }) {
  const [sortedPlayers, setSortedPlayers] = useState([])
  const [stages, setStages] = useState([])
  const [stageNames, setStageNames] = useState([])

  useEffect(() => {
    // To start with, the number of players can only be 2, 4, 8, 16 because idk how a bracket should work when the tree gets uneven
    const newPlayers = players ?? [
      { seed: 1, name: 'bob1' },
      { seed: 2, name: 'bob2' },
      { seed: 3, name: 'bob3' },
      { seed: 4, name: 'bob4' },
      { seed: 5, name: 'bob5' },
      { seed: 6, name: 'bob6' },
      { seed: 7, name: 'bob7' },
      { seed: 8, name: 'bob8' },
      { seed: 9, name: 'bob9' },
      { seed: 10, name: 'bob10' },
      { seed: 11, name: 'bob11' },
      { seed: 12, name: 'bob12' },
      { seed: 13, name: 'bob13' },
      { seed: 14, name: 'bob14' },
      { seed: 15, name: 'bob15' },
      { seed: 16, name: 'bob16' },
    ];

    // Arrange the players so the highest seeds face the lowest seeds
    setSortedPlayers(sortBySeeds(newPlayers))
  }, [players])

  useEffect(() => {
    const stageCount = Math.log2(sortedPlayers.length)
  
    // Create the stage/column names
    const stageNames = []
    for(let i = 0; i < stageCount - 2; i++) {
      stageNames.push(`Stage ${i+1}`)
    }
    stageNames.push('Semi-Finals')
    stageNames.push('Finals')
    setStageNames(stageNames)
  
    // Creates an array of stages, each stage has an array of matches, and each match is an array of two players
    const matchesByStage = []
    // For stage 1, just put every two players in an array, and put those arrays into an array
    const stage1 = []
    for(let i = 0; i < sortedPlayers.length; i+=2) {
      stage1.push([sortedPlayers[i], sortedPlayers[i+1]])
    }
    matchesByStage.push(stage1)
  
    // For the rest of the stages, make the appropriate amount of empty matches
    for(let i = 1; i < stageCount; i++) {
      let stage = []
      for(let j = 0; j < Math.floor(sortedPlayers.length / (i*2)); j+=2) {
        stage.push([{ name: '' }, { name: '' }])
      }
      matchesByStage.push(stage);
    }
    setStages(matchesByStage)
  }, [sortedPlayers])

  return (
    <div className='m-2 m-1000'>
      {/* Column Headers */}
      <div className={`grid ${gridCols[stages.length]} grid-rows-1`}>
        {stageNames.map((name, i) => <div className='bg-slate-500 text-white m-px p-1' key={`h${i}`}>{name}</div>)}
      </div>
      {/* Bracket */}
      <div className={`grid ${gappedGridCols[stages.length]} ${gridRows[sortedPlayers.length]}`}>
        {/* Render Matches */}
        {
          stages.map((matches, stageIndex) => matches.map((match, matchIndex) => (
            /* 
             * These col-start and row-start calculations put each stage in a new column, and position
             * the Matches so they're centered relative to the matches they're connected to. The fact that
             * css grids count from one make this sort of complicated.
             * Note that every match column has two thin columns next to it (for the SquareForks), so there are 2x+1 grid columns, where x
             * is the number of stages, and each Match takes up two rows, so there's 2y grid rows, where y is the maximum number of matches in a stage
             * 
             *
             * If stage one has 8 matches (16 players):
             * For stage 1: it should start in col-2 and row-1, adding a match to every 2nd row
             * For stage 2, it should start in col 4 and row 2, adding a match to every 4th row.
             * For stage 3, it should start in col 6 and row 4, adding a match to every 8th row.
             * For stage 4, it should start in col 8 and row 8, adding a match to every 16th row.
             *
             * So the offset for col-start is 2 (it starts in 2)
             * The scalar for col-start is stageIndex*2 (For the column labeled 'Stage 1' stageIndex will be 0, so 2+stageIndex*2 is 2)

             * row start is the hard part, so im gonna make a table:
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
            <div className={`col-start-${2+stageIndex*2} col-span-1 m-4 row-start-${2**stageIndex + 2**(stageIndex+1)*(matchIndex)} row-span-2`} key={`dm${stageIndex}-${matchIndex}`}>
              <Match players={[match[0], match[1]]} key={`m${stageIndex}-${matchIndex}`}/>
            </div>
          )))
        }
        {/* Render SquareForks */}
        {
          stages.map((matches, stageIndex) => {
            if(stageIndex === 0) return ''; //This is going to render the forks to the left of the matches, the first column doesn't need that
            return matches.map((match, matchIndex) => (
              /*
               * This should be fairly similar to the last algorithm
               *
               * It was, I threw +1s and -1s at it until it worked.
               */
               <div className={`col-start-${1+stageIndex*2} col-span-1 row-start-${2**(stageIndex-1)+1 + 2**(stageIndex+1)*(matchIndex) } row-span-${2**(stageIndex)}`} key={`df${stageIndex}-${matchIndex}`}>
                <SquareFork key={`f${stageIndex}-${matchIndex}`}/>
              </div>
            ))
          })
        }
      </div>
    </div>
  )
}

// These consts ensure tailwind won't purge the css classes
const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
}

const gappedGridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-gap-2',
  3: 'grid-cols-gap-3',
  4: 'grid-cols-gap-4',
  5: 'grid-cols-gap-5',
}

const gridRows = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
  7: 'grid-rows-7',
  8: 'grid-rows-8',
  9: 'grid-rows-9',
  10: 'grid-rows-10',
  11: 'grid-rows-11',
  12: 'grid-rows-12',
  13: 'grid-rows-13',
  14: 'grid-rows-14',
  15: 'grid-rows-15',
  16: 'grid-rows-16',
}

// eslint-disable-next-line no-unused-vars
const rowStart = {
  1: 'row-start-1',
  2: 'row-start-2',
  3: 'row-start-3',
  4: 'row-start-4',
  5: 'row-start-5',
  6: 'row-start-6',
  7: 'row-start-7',
  8: 'row-start-8',
  9: 'row-start-9',
  10: 'row-start-10',
  11: 'row-start-11',
  12: 'row-start-12',
  13: 'row-start-13',
  14: 'row-start-14',
  15: 'row-start-15',
  16: 'row-start-16',
}

// eslint-disable-next-line no-unused-vars
const colStart = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
  13: 'col-start-13',
  14: 'col-start-14',
  15: 'col-start-15',
  16: 'col-start-16',
}

// eslint-disable-next-line no-unused-vars
const rowSpan = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  7: 'row-span-7',
  8: 'row-span-8',
  9: 'row-span-9',
  10: 'row-span-10',
  11: 'row-span-11',
  12: 'row-span-12'
}
