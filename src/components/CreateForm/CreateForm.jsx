import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import ColoredButton from '../BasicElements/ColoredButton'

export default function CreateForm({ setTournData }) {
  const [tourneName, setTourneName] = useState('')
  const [players, setPlayers] = useState('')
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    setTournData({
      name: tourneName,
      players: players.split('\n')
    })
    history.push('/tourne')
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-center items-center bg-slate-500 rounded-lg p-4 px-8'>
      <h2>Create a New Tournament</h2>
      <label className='m-2'>
        Tournament Name:
        <br />
        <input value={tourneName} onChange={({target}) => setTourneName(target.value)} className='w-72 bg-slate-700 rounded-md p-2 m-1' />
      </label>
      <label className='m-2'>
        Players
        <br />
        (put each player on a new line)
        <br />
        <textarea value={players} rows='10' onChange={({target}) => setPlayers(target.value)} className='w-72 bg-slate-700 rounded-md p-2 m-1' />
      </label>
      <ColoredButton color='blue'>Create</ColoredButton>
    </form>
  )
}
