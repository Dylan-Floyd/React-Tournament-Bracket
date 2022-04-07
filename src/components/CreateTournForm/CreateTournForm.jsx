import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import ColoredButton from '../ColoredButton/ColoredButton'
import styles from './CreateTournForm.module.css'

export default function CreateTournForm({ setTournData }) {
  const [tourneName, setTourneName] = useState('')
  const [players, setPlayers] = useState('')
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    setTournData({
      name: tourneName,
      players: players.split('\n')
    })
    history.push('/tournament')
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <h2>Create a New Tournament</h2>
      <label>
        Tournament Name:
        <br />
        <input value={tourneName} onChange={({target}) => setTourneName(target.value)} />
      </label>
      <label>
        Players
        <br />
        (put each player on a new line)
        <br />
        <textarea value={players} rows='10' onChange={({target}) => setPlayers(target.value)} />
      </label>
      <ColoredButton color='blue'>Create</ColoredButton>
    </form>
  )
}
