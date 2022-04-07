import React, { useEffect, useState } from 'react'
import Match from '../Match/Match.jsx'
import SquareFork from '../SquareFork/SquareFork.jsx'
import sortBySeeds from '../../utils/sortBySeeds.js'

import styles from './Bracket.module.css'
import { BracketHeaders } from './BracketHeaders/BracketHeaders.jsx'
import { generateBracketStyles, generateForkContainerStyles, generateMatchContainerStyles } from './gridGeneration.js'

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

  if(stages.length === 0 || sortedPlayers === 0) {
    return <h2>Loading...</h2>
  }

  return (
    <div className={styles.bracket}>
      
      <BracketHeaders stageNames={stageNames} />

      {/* Set up the CSS grid */}
      <div style={generateBracketStyles(stages.length, sortedPlayers.length)}>

        {/* Render Matches */}
        {
          stages.map((matches, stageIndex) => matches.map((match, matchIndex) => (
            <div
              className={styles.matchContainer}
              style={generateMatchContainerStyles(stageIndex, matchIndex)}
              key={`matchContainer${stageIndex}-${matchIndex}`}
            >
              <Match players={[match[0], match[1]]} key={`match${stageIndex}-${matchIndex}`}/>
            </div>
          )))
        }
        {/* Render SquareForks */}
        {
          stages.map((matches, stageIndex) => {
            // This is going to render the forks to the left of the matches,
            // the first column won't have any, so we skip it.
            if(stageIndex === 0) return ''; 
            
            return matches.map((match, matchIndex) => (
              <div
                style={generateForkContainerStyles(stageIndex, matchIndex)}
                key={`forkContainer${stageIndex}-${matchIndex}`}
              >
                <SquareFork key={`fork${stageIndex}-${matchIndex}`}/>
              </div>
            ))
          })
        }
      </div>
    </div>
  )
}
