import React from 'react'

import styles from './Match.module.css'

export default function Match({ players }) {
  const [player1, player2] = players
  return (
    <div className={styles.match}>
      <div className={styles.player1Seed}>{player1?.seed ?? '?'}</div>
      <div className={styles.player1Name}>{player1?.name ?? '???'}</div>

      <div className={styles.player2Seed}>{player2?.seed ?? '?'}</div>
      <div className={styles.player2Name}>{player2?.name ?? '???'}</div>
    </div>
  )
}
