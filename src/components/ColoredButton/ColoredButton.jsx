import React from 'react'
import styles from './ColoredButton.module.css'


export default function ColoredButton({ color, clickHandler, children }) {

  /*
  const className=`bg-${color}-400 border-${color}-600 border-b-2 p-2 m-1 rounded hover:bg-color-${color}-400 active:bg-${color}-400 active:translate-y-px active:border-b-0 transition-all active:mt-6px`
  */
 
  return (
    <button className={styles.coloredButton} onClick={clickHandler}>
      {children}
    </button>
  )
}
