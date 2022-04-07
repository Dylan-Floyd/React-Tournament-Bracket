import React from 'react'
import styles from './SquareFork.module.css'

/*
 * Renders something that looks like this:
 *  -----|
 *       |
 *       |-----
 *       |
 *  -----|
 */
export default function SquareFork() {
  return (
    <div className={styles.squareFork}>
      {/* Left two horizontal lines And vertical line */}
      <div className={styles.leftPart} />
      {/* Right horizontal line */}
      <div className={styles.rightPart} />
    </div>
  )
}
