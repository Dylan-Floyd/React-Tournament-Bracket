import styles from './BracketHeaders.module.css'

export function BracketHeaders({ stageNames }) {
  const dynamicStyle = {
    gridTemplateColumns: `repeat(${stageNames.length}, 1fr)`
  }
  return (
    <div className={styles.headers} style={dynamicStyle}>
      {stageNames.map((name, i) => (
        <div className={styles.header} key={`h${i}`}>{name}</div>
      ))}
    </div>
  )
}